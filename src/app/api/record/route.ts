import prisma from "@/utils/prismaClient"
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

export async function POST(request: Request) {

  const db = await Db();
  try {
    const query: string = "INSERT INTO record (spec, pay) VALUES (?)";
    const values: any = [111, 222];
    const [result] = await db.execute(query, values);
    db.end();

    return Response.json(result)
  } catch (error) {
    return Response.json({ error: 'error' })
  }

}

export async function GET(request: Request) {

  const db = await Db();
  try {
    const query: string = "SELECT * FROM specification";
    const values: any = [];
    const [result] = await db.execute(query, values);
    db.end();

    return Response.json({ ok: result })
  } catch (error) {
    Response.json({ error: 'error' })
  }
}

