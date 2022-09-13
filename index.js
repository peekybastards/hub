const express = require("express")
const morgan = require("morgan")
const redis = require("redis")
const http = require("http")
const cors = require("cors")

const { aceRouter, aceHelper } = require("./routes/ace/aceRouter")
const { musuRouter, musuHelper } = require("./routes/musu/musuRouter")
const app = express()
const server = http.createServer(app)


app.use(cors())
app.use(morgan(":remote-addr :method :url :status :res[content-length] :res[content-type] :response-time ms"))
const io = require("socket.io")(server, {
  cors: {
    origin: "*"
  }
})

io.on("connection", (socket) => {
  console.log("websocket connected")
  socket.on("clientMSG", console.log)
  socket.on("disconnect", () => {
    console.log("websocket disconnected")
  })
})

const redisClient = redis.createClient({ db: 9 })
redisClient.connect().then(() => console.log("connected to redis instance"))
//redisClient.select(9).then(() => console.log(`switched to db 9 redis`))

app.set("etag", false)


app.use(express.json())
app.use((req, res, next) => {
  req.redis = redisClient
  next()
})



app.use("/api/ace", aceRouter)
app.use("/api/musu", musuRouter)

app.get("/dev/ping", (req, res) => {
  return res.json({ success: true, error: false, message: "pong"})
})

app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ success: false, error: false, message: "this route doesnt exist!"})
})

server.listen(3000, () => {
  console.log("app running at port 3000")
})
