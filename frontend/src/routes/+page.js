export const prerender = true
export const load = async ({ data }) => {
  //let response = await fetch(url)
  //let result = await response.json()
  //let ipsum = await fetch("https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1")
  //let json = await ipsum.json()
  //let lines = []
  //for(let i of json){
  //  for(let j of i.split(".")){
  //    lines.push(j)
  //  }
  //}
  let response = await fetch("http://api.pushshift.io/reddit/submission/search?html_decode=true&author=peekybastards&size=1000&score=1")
  let lines = await response.json()
  lines = lines.data
  console.log(lines)
  //let lines = json.data.map(e => {
  //  return e.body
  //})
  return {
    url: "someurl",
    lines
    //props: {
    //  url: "someurl"
    //}
    //contents: result
  }
}

