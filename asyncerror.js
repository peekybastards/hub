const fs = require("fs")
const path = require("path")

async function crawl(fpath){
  if(fs.existsSync(fpath)){
    let stats = await fs.promises.lstat(fpath)//.catch(e => console.log(`some error occured ${e}`))
    if(stats.isFile()){
      let contents = await fs.promises.readFile(fpath)
      return { success: true, error: false, contents: contents, fpath }
    }
    else{
      return { success: false, error: false, message: "fpath is not a file", fpath}
    }
  }
  else{
    return { success: false, error: false, message: "fpath is not a valid directory", fpath}
  }
}


async function main(fpath){
  try{
    let results = await crawl(fpath)
    console.log(results)
  }
  catch(e){
    console.log(e)
  }
}


main("/home/iamfiasco/.hyper.js")


main("/home/iamfiasco/alks")
