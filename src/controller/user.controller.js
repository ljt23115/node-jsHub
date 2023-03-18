const userService = require("../service/user.service")

class UserController {
  async create(ctx, next) {
    // 获取用户传来的信息
    const user = ctx.request.body

    // 将用户信息存储到数据库中
    const result = await userService.create(user)

    // 查看存储结果，告知前端创建成功
    ctx.body = {
      message: '创建用户成功',
      data: result
    }
    await next()
  }
  
}

module.exports = new UserController()