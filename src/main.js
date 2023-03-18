// 用来启动app的

// 导入app
const app = require("./app/index")
// 导入env常量
const { SERVER_PORT } = require('./config/server')
// 导入err处理
require("./utils/handle-error")

// 启动app
app.listen(SERVER_PORT, () => {
  console.log('jsHub的服务器启动成功')
}) 