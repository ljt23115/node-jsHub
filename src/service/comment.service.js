const connection = require("../app/database")

class CommentService {
  async create(content, momentId, id) {
    const statement = 'INSERT INTO `comment` (content, moment_id, user_id) VALUES(?, ?, ?);'
    const [result] = await connection.execute(statement, [content, momentId, id])
    return result
  }
  async reply(content, momentId, commentId, id) {
    const statement = 'INSERT INTO `comment` (content, moment_id, comment_id, user_id) VALUES(?, ?, ?, ?);'
    const [result] = await connection.execute(statement, [content, momentId, commentId, id])
    return result
  }
  async remove(momentId, commentId, id) {
    const statement = 'DELETE FROM `comment` WHERE moment_id = ? AND user_id = ? AND id = ?;'
    const [result] = await connection.execute(statement, [momentId, id, commentId])
    return result
  }
}

module.exports = new CommentService()