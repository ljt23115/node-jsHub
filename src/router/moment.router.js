const KoaRouter = require("@koa/router")
const { verifyAuth } = require("../middleware/login.middleware")
const { verifyMomentPermission } = require("../middleware/permission.middleware")
const momentController = require("../controller/moment.controller")
const { verifyLabelExists } = require("../middleware/label.middleware")

const momentRouter = new KoaRouter({ prefix: '/moment' })

// 创建动态
momentRouter.post('/', verifyAuth, momentController.create)
// 获得动态列表
momentRouter.get('/', momentController.list)
// 查询动态
momentRouter.get('/:momentId', momentController.detail)
// 修改动态
momentRouter.patch('/:momentId', verifyAuth, verifyMomentPermission, momentController.update)
// 删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyMomentPermission, momentController.remove)
// 添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyMomentPermission, verifyLabelExists, momentController.dynCreate)


module.exports = momentRouter