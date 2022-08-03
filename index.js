const express = require("express")
const app = express()
const http = require("http")
const fs = require("fs")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const { logger } = require("./logger")
const wss = require("socket.io")
//let's create synchronous file IO. would add async later ;P

const readFile = (fpath) => {
  try{
    return fs.readFileSync(fpath)
  }
  catch(e){
    return false
  }

}
app.use(logger)
const server = http.createServer(app)
const io = wss(server, { cors: { origin: "*"} }) 

function dmanCommands(socket){
  socket.on("download", (message) => {
    //download util here
  })

  socket.on("pause", (message) => {})

  socket.on("list", (message) => {
    //return all download details
  })
}

function editorCommands(socket){
  console.log("new connection received")
  socket.on("set", (message) => {
    let contents = message.value
    console.log(message.value)
    if(socket.fpath !== undefined && message.value){
      let fname = path.basename(socket.fpath)
      let fpath = path.dirname(socket.fpath)
      if(fs.lstatSync(fpath).isDirectory()){
        console.log(socket.fpath, contents.length)
        fs.writeFileSync(socket.fpath, contents)
        socket.emit("success", { msg: "written contents to file"})
      }
      else socket.emit("error", { msg: "invalid fpath"})
    }
  })
  socket.on("setfpath", (message) => {
    console.log("recvd setfpath signal")
    socket.fpath = message.fpath
    socket.emit("success", `set fpath to ${message.fpath}`)
  })
  socket.on("autocomplete", (message) => {
    let { fpath } = message
    let basePath
    if(fpath[fpath.length - 1] !== "/")
      basePath = path.dirname(fpath)
    else
      basePath = fpath
    let contents = fs.readdirSync(basePath)
    contents = contents.map(e => path.join(basePath, e))
    let results = contents.filter(e => e.startsWith(fpath))
    socket.emit("autocomplete", { results })
  })

  socket.on("get", (message) => {
    try{
      console.log("recvd get signal")
      let fpath = socket.fpath
      if(socket.fpath === undefined || fs.existsSync(socket.fpath)){
        let contents = fs.readFileSync(socket.fpath).toString()
        socket.emit("contents", contents)
      }
    }
    catch(e){
      console.log(e)
      socket.emit("error", { err: e, message: "failed to read from file"})
    }
  })
  socket.on("mkdir", (message) => {
    let { fpath } = message
    fs.writeFileSync(fpath, "")
    socket.emit("madedir", { fpath })
  })
}


io.on("connection", (socket) => {
  //editor commands
  editorCommands(socket)
})

app.get("/ping", (req, res) => {
  res.json({ sucess: true, error: false, message: "everything works!"})
})




server.listen(3000, () => console.log("server running at 3000"))

