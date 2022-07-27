require("dotenv").config()

const axios = require("axios")
const fs = require("fs")
const path = require("path")

class Downloader{
  constructor(opts){
    this.spath = process.env.SPATH
    if(opts.url === undefined){
      console.log("no url")
      return
    }
    else{
      this.url = opts.url
    }
    if(opts.fpath === undefined){
      let fname = this.url.split("/").last()
      this.fpath = path.join(this.spath, fname)
    }
    else this.fpath = opts.fpath
  }
  processResponse(){
    this.length = this.res.headers['content-length']
  }
  init(){
    return new Promise(async(resolve, reject) => {
      this.res = await axios({
        method: "get",
        url: this.url,
        responseType: "stream",
      })
      this.processResponse()
    })
  }
  download(){
    this.rstream = this.res
    this.wstream = fs.createWriteStream(this.fpath, { flags: "a" })
    this.rstream.on("data", (chunk) => {
      this.updateChunk(chunk)
    })
    this.rstream.pipe(this.wstream)
  }
}
