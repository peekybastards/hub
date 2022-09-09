const express = require("express")
const morgan = require("morgan")
const { aceRouter } = require("./routes/ace/aceRouter")
const app = express()

app.set("etag", false)

app.use(morgan(":remote-addr :method :url :status :res[content-length] :res[content-type] :response-time ms"))
app.use(express.json())
app.use("/api/ace", aceRouter)

app.get("/dev/ping", (req, res) => {
  return res.json({ success: true, error: false, message: "pong"})
})

app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ success: false, error: false, message: "this route doesnt exist!"})
})

app.listen(3000, () => {
  console.log("app running at port 3000")
})
