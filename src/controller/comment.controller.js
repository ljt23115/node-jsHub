const commentService = require("../service/comment.service")


class CommentController {
  async create(ctx, next) {
    // 获取body中的参数
    const { content, momentId } = ctx.request.body
    const { id } = ctx.user

    // control database
    const result = await commentService.create(content, momentId, id)

    ctx.body = {
      code: 0,
      message: "success in commenting",
      data: result
    }
    await next()
  }
  async reply(ctx, next) {
    // get data from request
    const { content, momentId, commentId } = ctx.request.body
    const { id } = ctx.user

    // control database
    const result = await commentService.reply(content, momentId, commentId, id)

    ctx.body = {
      code: 0,
      message: "success in replying",
      data: result
    }
    await next()
  }
  async remove(ctx, next) {
    // get data from request
    const { momentId, commentId } = ctx.request.body
    const { id } = ctx.user

    // control database
    const result = await commentService.remove(momentId, commentId, id)

    ctx.body = {
      code: 0,
      message: "success in deleting",
      data: result
    }
    await next()
  }

}

module.exports = new CommentController()