const axios = require("axios")
const fs = require("fs")
const path = require("path")

class Speedometer{
  constructor(opts){
    this.tick = opts.tick || 0
    this.tock = opts.tock || 0
  }
  resume(){
    if(this.timer !== undefined){
      console.log("timer is already active")
      return
    }
    else{
      this.timer = setInterval(() => this.tick++, 1000)
    }
  }
  pause(){
    if(this.timer === undefined){

    }
    else{
      console.log("no active timers to pause")
    }
  }
  update(nBytes){
    this.tock += nBytes
  }
  bps(mod){
    if(!!!mod) mod = 1
    if(this.tock === 0 || this.tick === 0) return 0
    return this.tock/(this.tick*Math.pow(1024, mod))
  }
}
class HTTX{
}

async function main(){
  let a = new Speedometer()
}
