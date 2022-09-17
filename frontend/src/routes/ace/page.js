export const prerender = true
export const load = async ({ url }) => {
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
  let fpath = url.searchParams.get("fpath") || "/home/iamfiasco/deardiary/today.md"
  let uri = "http://localhost:3000/api/ace/contents"
  let response = await fetch(
    uri,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: "post",
      body: JSON.stringify({ fpath }),
    }
  )
  let data = await response.json()
  //let lines = json.data.map(e => {
  //  return e.body
  //})
  return {
    fpath,
    data
  }
}

