const KoaRouter = require("@koa/router")
const commentController = require("../controller/comment.controller")
const { verifyAuth } = require("../middleware/login.middleware")
const { verifyMomentPermission } = require("../middleware/permission.middleware")

const commentRouter = new KoaRouter({ prefix: '/comment' })

commentRouter.post('/', verifyAuth, commentController.create)
commentRouter.post('/reply', verifyAuth, commentController.reply)
commentRouter.delete('/', verifyAuth, verifyMomentPermission ,commentController.remove)


module.exports = commentRouter