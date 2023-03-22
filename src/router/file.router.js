const KoaRouter = require("@koa/router")
const multer = require('@koa/multer')
const { verifyAuth } = require("../middleware/login.middleware")
const fileController = require("../controller/file.controller")
const { UPLOAD_PATH } = require("../config/path")
const { handleAvatar } = require("../middleware/file.middleware")

const fileRouter = new KoaRouter({ prefix: '/file' })

const uploadAvatar = multer({
  dest: UPLOAD_PATH
})

fileRouter.post('/avatar', verifyAuth, handleAvatar, fileController.create)


module.exports = fileRouter