const app = require("../app")
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_ALREADY_EXITS, NAME_IS_NOT_EXISTS, PASSWORD_IS_ERROR, UNAUTHORIZATION, OPERATION_IS_NOT_ALLOWED } = require("../config/error")

app.on('error', (err, ctx) => {
  let code = 0
  let message = ''

  switch(err) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = '用户名或者密码不能为空~'
      break
    case NAME_ALREADY_EXITS:
      code = -1002
      message = '用户名已经存在'
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      message = '用户名不存在'
      break
    case PASSWORD_IS_ERROR:
      code = -1004
      message = '密码错误'
      break
    case UNAUTHORIZATION:
      code = -1005
      message = '无效的token'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -2001
      message = '没有操作该资源的权限'
      break
  }

  ctx.body = {
    code,
    message
  }
})