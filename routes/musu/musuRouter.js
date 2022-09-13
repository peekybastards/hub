const express = require("express")
const joi = require("joi")
const fs = require("fs")

const musuRouter = express.Router()

const songPlaySchema = joi.object({
  fpath: joi.string()
})


musuRouter.get("/play", async (req, res) => {
  try{
    let payload = { fpath: req.body.fpath }
    let parsed = await songPlaySchema.validateAsync(payload)
    if(fs.existsSync(parsed.fpath)){
      let stream = fs.createReadStream(parsed.fpath)
      stream.pipe()
    }
    else{
      return res.json({ success: true, error: false, message: "fpath doesnt exist"})
    }
  }
  catch(e){
    return res.json({ success: false, error: e, message: "something unexpected happened"})
  }
})

musuRouter.get("/meta", async(req, res) => {
  try{
    let payload = { idx: req.body.idx }
    let parsed = await songMetaSchema.validateAsync(payload)
    let meta = await req.redis.get(payload.idx)
    if(meta === null){
      throw new Error("key with idx doesnt exist is redis")
    }
    else{
      meta = JSON.parse(meta)
      return res.json({ success: true, error: false, result: meta })
    }
  }
  catch(e){
    return res.json({ success: true, error: e, message: "something unexpected happened"})
  }
})

musuRouter.get("/search", async(req, res) => {
  try{
    let payload = { term: req.body.term }
    let parsed = await songSearchSchema.validateAsync(payload)
    let keys = await req.redis.keys(`*${parsed.term}*`)
    return res.json({ success: true, error: false, results: keys})
  }
  catch(e){
    return res.json({ success: false, error: e, message: "something unexpected happened"})
  }
})

musuRouter.get("/sync", async(req, res) => {

})

module.exports = {
  musuRouter
}
