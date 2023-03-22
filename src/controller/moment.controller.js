const momentService = require("../service/moment.service")

class MomentController {
  async create(ctx, next) {
    
    // 获取动态内容
    const { content } = ctx.request.body

    // 查看有谁发布
    const { id } = ctx.user

    // 将动态相关的数据保存到数据库中
    const result = await momentService.create(content, id)

    ctx.body = {
      code: 0,
      message: '创建用户动态成功~',
      data: result
    }

    await next()
  }
  async list(ctx, next) {

    const { offset, size } = ctx.query

    const result = await momentService.queryList(offset, size)

    ctx.body = {
      code: 0,
      data: result
    }

    await next()
  }
  async detail(ctx, next) {

    // 获取动态id
    const { momentId } = ctx.params

    const result = await momentService.queryById(momentId)

    ctx.body = {
      code: 0,
      data: result
    }

    await next()
  }
  async update(ctx, next) {

    // 获取动态id
    const { momentId } = ctx.params

    // 获取修改的内容
    const { content } = ctx.request.body

    const result = await momentService.update(momentId, content)

    ctx.body = {
      code: 0,
      message: "内容修改成功",
      data: result
    }

    await next()
  }
  async remove(ctx, next) {

    // 获取动态id
    const { momentId } = ctx.params

    const result = await momentService.remove(momentId)

    ctx.body = {
      code: 0,
      message: "删除成功",
      data: result
    }

    await next()
  }
  async dynCreate(ctx, next) {

    const labels = ctx.labels
    const { momentId } = ctx.params

    try {
      for(const label of labels) {
        // 判断label是否存在
        const isExist = await momentService.hasLabel(momentId, label.id)
        if(!isExist) {
          // 不存在
          const result = await momentService.addLabel(momentId, label.id)
        }
      }

      ctx.body = {
        code: 0,
        message: "动态添加标签成功"
      }

    } catch(error) {
      ctx.body = {
        code: -3001,
        message: "动态添加标签失败"
      }
      console.log(error)
    }

    const result = await momentService.dynCreate()

    ctx.body = {
      code: 0,
      message: 'success in searching the label list',
      data: result
    }
  }
}

module.exports = new MomentController()