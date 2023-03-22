const connection = require("../app/database")

class PermissionService {
  async checkMoment(id, user_id) {
    const statement = 'SELECT * FROM moment WHERE id = ? AND user_id = ?;'
    const [result] = await connection.execute(statement, [id, user_id])
    return !!result.length
  }
  

}

module.exports = new PermissionService()