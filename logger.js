const morgan = require("morgan")
const fs = require("fs")

module.exports = {
  logger: morgan(":method | :url | :remote-addr | :remote-user | :status | :res[content-length] | :user-agent | :response-time ms", { 
                        stream: fs.createWriteStream("./access.log", { flags: "a"})
                })
}


