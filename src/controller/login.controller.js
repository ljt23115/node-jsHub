// const userService = require("../service/user.service")
const { PRIVATE_KEY, PUBLIC_KEY } = require('../config/screct')
const jwt = require("jsonwebtoken")
const { UNAUTHORIZATION } = require('../config/error')

class LoginController {
  async sign(ctx, next) {
    const user = ctx.user
    const { id, name } = user  
    const payload = { id, name }

    const token = jwt.sign(payload, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: 'RS256'
    })
  
    ctx.body = {
      code: 0,
      data: {
        id,
        name,
        message: '登陆成功',
        token
      }

    }
    await next()
  }

}

module.exports = new LoginController()