const fs = require('fs')
const fileService = require("../service/file.service")
const userService = require("../service/user.service")
const { UPLOAD_PATH } = require("../config/path")

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
  async showAvatar(ctx, next) {

    const { userId } = ctx.params

    const avatarInfo = await fileService.queryAvatarWithUserId(userId)
    
    // 读取头像文件
    const { filename, mimetype } = avatarInfo
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new UserController()