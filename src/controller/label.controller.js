const labelService = require("../service/label.service")

class LabelController {
  async create(ctx, next) {
    
    // get the name of the label
    const { name } = ctx.request.body

    const result = await labelService.create(name)

    ctx.body = {
      code: 0,
      message: 'success in creating a label',
      data: result
    }

  }
  async list(ctx, next) {

    const result = await labelService.list()

    ctx.body = {
      code: 0,
      message: 'success in searching the label list',
      data: result
    }
    
  }

}

module.exports = new LabelController()