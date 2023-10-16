import mysql from 'mysql2/promise'

async function Db() {
  const db = await mysql.createConnection({
    host: "localhost",	//local host为数据库主机名，localhost代表本地环境，相当于127.0.0.1
    user: "root",	//root为数据库用户名
    password: "password",	//123456为数据库密码
    database: "app"	//node为数据库名称
  })

  return db;
}

export async function query(querySql, values) {

  const db = await Db();
  const [result] = await db.execute(querySql, values);
  db.end();

  return result;
}