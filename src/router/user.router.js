const KoaRouter = require("@koa/router")
const userController = require("../controller/user.controller")
const { verifyUser, handlePassword } = require("../middleware/user.middleware")

const userRouter = new KoaRouter({ prefix: '/users' })

userRouter.post('/', verifyUser, handlePassword, userController.create)

// demo
const fs = require('fs')
const jwt = require("jsonwebtoken")
const secretkey = 'aaasssdddd'
const privateKey = fs.readFileSync("./src/keys/private_key.pem")
const publicKey = fs.readFileSync("./src/keys/public_key.pem")
userRouter.get('/login', (ctx, next) => {
  const payload = { id: '1110', name: 'js' }

  const token = jwt.sign(payload, privateKey, {
    expiresIn: 60 * 60,
    algorithm: 'RS256'
  })

  ctx.body = {
    code: 0,
    token,
    message: '登陆成功'
  }
})

userRouter.get('/list', (ctx, next) => {
  const authorization = ctx.headers.authorization
  const token = authorization.replace("Bearer ", "")
  console.log(token)


  try {
    const result = jwt.verify(token, publicKey, {
      algorithms: ['RS256']
    })

    ctx.body = {
      code: 0,
      data: [
        {
          name: 111
        }
      ],
      message: '认证成功'
    }
  } catch {
    ctx.body = {
      code: -1003,
      message: "错啦"
    }
  }
})

//demo

module.exports = {
  userRouter
}