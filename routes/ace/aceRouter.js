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

aceRouter.get("/contents", async (req, res) => {
  try{
    let payload = {fpath: req.body.fpath }
    let parsed = await fileReadSchema.validateAsync(payload)
    if(fs.existsSync(parsed.fpath)){
      let stream = fs.createReadStream(parsed.fpath)
      return stream.pipe(res)
    }
    else{
      return res.json({ success: false, error: false, message: "no file exists with the given fpath"})
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
    if(fs.existsSync(parsed.fpath) || parsed.writeControl){
      await fs.promises.writeFile(parsed.fpath, parsed.contents)
      return res.json({ sucess: true, error: false, message: "wrote contents to file"})
    }
    else return res.json({ success: true, error: false, message: "cannot commit changes; writeControl detected"})
  }
  catch(e){
    return res.json({ success: false, error: e, message: "something unexpected happened"})
  }
})

aceRouter.get("/list", async(req, res) => {
  try{
    let payload = { fpath: req.body.fpath }
    let parsed = await fileListSchema.validateAsync(payload)
    if(fs.existsSync(parsed.fpath)){
      let stats = await fs.promises.lstat(parsed.fpath)
      if(stats.isDirectory()){
        let contents = await fs.promises.readdir(parsed.fpath)
        contents = contents.map(content => path.join(parsed.fpath, content))
        return res.json({ success: true, error: false, results: contents})
      }
      else{
        return res.json({ success: true, error: false, message: "fpath is not a directory", results: []})
      }
    }
  }
  catch(e){
    console.log(e)
    return res.json({ success: false, error: e, message: "something unexpected happened", results: []})
  }
})

module.exports = {
  aceRouter
}
