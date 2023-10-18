import prisma from "@/utils/prismaClient"
import { query } from '@/lib/query';

export async function GET(request: Request) {

  try {
    const querySql: string = "SELECT * FROM specification";
    const values: any = [];
    const result = await query(querySql, values);

    return Response.json(result)
  } catch (error) {
    Response.json({ error: 'error' })
  }
}

export async function POST(request: Request) {
  const res = await request.json();

  try {
    const querySql: string = `INSERT INTO specification (format) VALUES (?)`;
    const values: string[] = [res.format];
    const result = await query(querySql, values);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error })
  }

}