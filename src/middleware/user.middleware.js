const userService = require("../service/user.service")
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_ALREADY_EXITS } = require("../config/error")
const md5password = require("../utils/md5-password")

async function verifyUser(ctx, next) {
  // 判断信息是否合法
  const { name, password } = ctx.request.body
  if(!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }
  // 判断name是否存在
  const users = await userService.finduserByName(name)
  if(users.length) {
    return ctx.app.emit('error', NAME_ALREADY_EXITS, ctx)
  }
  await next()
}

async function handlePassword(ctx, next) {
  const { password } = ctx.request.body

  ctx.request.body.password = md5password(password)
  await next()
}


module.exports = {
  verifyUser,
  handlePassword
}