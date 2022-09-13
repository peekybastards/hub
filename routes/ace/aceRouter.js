const path = require("path")
const fs = require("fs")
const express = require("express")
const joi = require("joi")
const aceRouter = express.Router()

const fileReadSchema = joi.object({
  fpath: joi.string(),
})

const fileWriteSchema = joi.object({
  fpath: joi.string(),
  writeControl: joi.bool(),
  contents: joi.string()
})

const fileListSchema = joi.object({
  fpath: joi.string()
})

async function _contents(parsed){
  try{
    if(fs.exists(parsed.fpath)){
      let stream = fs.createReadStream(parsed.fpath)
      return { success: true, error: false, stream: stream }
    }
    else{
      return { success: false, error: false, message: "fpath doesnt exist"}
    }
  }
  catch(e){
    return { success: false, error: e, message: "something unexpected happened"}
  }
}

async function _write(parsed){
  try{
    if(fs.existsSync(parsed.fpath) || parsed.writeControl ){
      await fs.promises.writeFile(parsed.fpath, parsed.contents)
      return { success: true, error: false, message: `wrote contents to ${parsed.fpath}`}
    }
    else{
      return { success: true, error: false, message: "write control detected or fpath doesnt exist!"}
    }
  }
  catch(e){
    return { success: false, error: e, message: "something unexpected happened"}
  }
}


aceRouter.get("/contents", async (req, res) => {
  try{
    let payload = {fpath: req.body.fpath }
    let parsed = await fileReadSchema.validateAsync(payload)
    let result = await _contents(parsed)
    if(result.success){
      return result.stream.pipe(res)
    }
    else{
      return res.json(result)
    }
  }
  catch(e){
    return res.json({success: false, error: e, message: "something unexpected happened"})
  }
})

aceRouter.get("/write", async(req, res) => {
  try{
    let payload = { fpath: req.body.fpath, contents: req.body.contents, writeControl: req.body.writeControl }
    let parsed = await fileWriteSchema.validateAsync(payload)
    let result = await _write(parsed)
    return res.json(result)
  }
  catch(e){
    return res.json({ success: false, error: e, message: "something unexpected happened"})
  }
})

async function _list(parsed){
  try{
    if(fs.existsSync(parsed)){
      //fpath exists
      let dpath = await fs.promises.lstat(parsed.fpath)
      if(dpath.isDirectory()){
        let contents = await fs.promises.listdir(parsed.fpath)
        contents = contents.map(e => path.join(parsed.fpath, e))
        return { success: true, error: false, contents }
      }
      else{
        return { success: true, error: false, message: "fpath is not a directory"}
      }
    }
  }
  catch(e){
    return res.json({ success: false, error: e, message: "something unexpected happened"})
  }
}


aceRouter.get("/list", async(req, res) => {
  try{
    let payload = { fpath: req.body.fpath }
    let parsed = await fileListSchema.validateAsync(payload)
    let result = await _list(parsed)
    return res.json(result)
  }
  catch(e){
    return res.json({ success: false, error: e, message: "something unexpected happened", results: []})
  }
})

function aceHelper(socket){
  //might change to async later
  socket.on("ace:list", async (data) => {
    let parsed = await fileListSchema.validateAsync(data)
    let result = await _list(parsed)
    socket.emit("ace:list", result)
  })
  socket.on("ace:write", async (data) => {
    let parsed = await fileWriteSchema.validateAsync(data)
    let result = await _write(parsed)
    socket.emit("ace:list", result)
  })
  socket.on("ace:contents", async (data) => {
    let parsed = await fileListSchema.validateAsync(data)
    let result = await _contents(parsed)
    socket.emit("ace:contents", result)
  })
}


module.exports = {
  aceRouter,
  aceHelper
}
