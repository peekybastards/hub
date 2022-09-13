const axios = require("axios")

async function* redditor(username){
  let schema = `http://api.pushshift.io/reddit/comment/search?html_decode=true&author=${username}&size=1000&score=1`
  let last = undefined
  while(true){
    let result = undefined
    if(last === undefined)
      result = await axios.get(schema).catch(e => console.log(`some error received ${e} url ${url}`))
    else
      result = await axios.get(schema + `&before=${last.created_utc}`)
    if(result === undefined){
      break
    }
    for(let comment of result.data.data){
      yield comment
    }
    if(result.data.data.length === 0)
      break
    else{
      let n = result.data.data.length
      last = result.data.data[n - 1]
    }
  }
}

async function main(){
  for await (const comment of redditor("peekybastards")){
    console.log(comment.body, comment.created_utc)
  }
}

main()
