const labelService = require("../service/label.service")


const verifyLabelExists = async (ctx, next) => {

  const { labels } = ctx.request.body

  // judge whether the label have exist
  const newLabels = []
  for(const name of labels) {
    const result = await labelService.queryLabelByName(name)
    const labelObj = {
      name
    }
    if(result) {
      labelObj.id = result.id
    } else {
      const insertResult = await labelService.create(name)
      labelObj.id = insertResult.insertId
    }
    newLabels.push(labelObj)
  }
  ctx.labels = newLabels
  ctx.body = `添加成功`
  await next()

}

module.exports = {
  verifyLabelExists
}