const nedb = require("nedb")

class Store{
  constructor(opts){
    if(this.opts.fpath === undefined) this.fpath = "./data.db"
    else this.fpath = this.opts.fpath
    this.store = new nedb({
      filename: this.fpath
    })
  }
  set(payload){
    return new Promise((resolve, reject) => {
      db.insert(payload, (err, doc) => {
        if(err) return reject(err)
        else return resolve(doc)
      })
    })
  }
  get(payload){
    return new Promise((resolve, reject) => {
      db.find(payload, function(err, docs){
        if(err !== undefined)return resolve(docs)
        else return reject(err)
      })
    })
  }
  remove(payload){
    return new Promise((resolve, reject) => {
      db.remove(payload, (err, numDels) => {
        if(err) return reject(err)
        else return resolve(numDels)
      })
    })
  }
}

module.exports = {
  Store
}
