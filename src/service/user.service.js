const connection = require("../app/database")

class UserService {
  async create(user) {
    // 获取用户信息
    const { name, password } = user

    // 拼接statement
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`

    const [ result ] = await connection.execute(statement, [name, password])
    console.log(result)
    return result
  }
  async finduserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`
    const [ values ] = await connection.execute(statement, [name])
    return values
  }
}

module.exports = new UserService()