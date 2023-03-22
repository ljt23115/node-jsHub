const fs = require('fs')

// 默认情况下，相对目录和node程序的启动目录有关系。当然你用绝对路径也可以
const PRIVATE_KEY = fs.readFileSync("./src/config/keys/private_key.pem")
const PUBLIC_KEY = fs.readFileSync("./src/config/keys/public_key.pem")

module.exports = {
  PRIVATE_KEY, PUBLIC_KEY
}