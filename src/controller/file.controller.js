const fileService = require("../service/file.service")
const userService = require("../service/user.service")
const { SERVER_HOST, SERVER_PORT } = require("../config/server")

class FileController {
  async create(ctx, next) {

    const { filename, mimetype, size } = ctx.request. file
    const { id } = ctx.user

    // 将图片信息和id结合起来进行存储
    const result = await fileService.create(filename, mimetype, size, id)

    // 将头像信息保存到user表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
    const result2 = await userService.updateUserAvatar(avatarUrl, id)

    ctx.body = {
      code: 0,
      message: '头像上传成功',
      avatarUrl
    }
  }
}

module.exports = new FileController()