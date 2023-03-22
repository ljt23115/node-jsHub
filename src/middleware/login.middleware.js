const jwt = require('jsonwebtoken')
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_NOT_EXISTS, PASSWORD_IS_ERROR,UNAUTHORIZATION } = require("../config/error")
const userService = require("../service/user.service")
const md5password = require("../utils/md5-password")
const { PUBLIC_KEY } = require('../config/screct')


const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 判断用户名和密码是否为空
  if( !name || !password ) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // 判断用户是否在数据库存在
  const users = await userService.finduserByName(name)
  const user = users[0]
  if(!user) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
  }

  // 查询数据库中的账号和密码是否一致
  if(user.password !== md5password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_ERROR, ctx)
  }

  ctx.user = user


  // 办法令牌
  await next()
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if(!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  const token = authorization.replace("Bearer ", "")


  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch(error) {
    console.log(error)
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }

}

module.exports = {
  verifyLogin,
  verifyAuth
}