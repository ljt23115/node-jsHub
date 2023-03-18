const mysql = require("mysql2")

const connectionPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'jshub',
  user: 'root',
  password: 'admin',
  connectionLimit: 5
})

connectionPool.getConnection((err, connection) => {
	// 有err就失败
	if(err) {
		clg('连接失败~', err)
		return
	}
	// 获取connection，尝试和数据库建立一下连接
	connection.connect(err => {
		if(err) {
			// 失败
			console.log('和数据库交互失败', err)
		} else {
			// 连接成功，可以进行交互
			console.log('和数据库交互成功')
		}
	})
})

const connection = connectionPool.promise()

module.exports = connection