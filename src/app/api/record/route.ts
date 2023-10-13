import prisma from "@/utils/prismaClient"
import { query } from '@/lib/query';

function add_quote(arr: string[]) {
  return arr.map((item: string) => {
    return `'${item}\'`;
  })
}

export async function POST(request: Request) {
  const res = await request.json();
  const column_string = Object.keys(res).join(',');
  const values_string = add_quote(Object.values(res)).join(',');

  try {
    const querySql: string = `INSERT INTO record (${column_string}) VALUES (${values_string})`;
    const values: string[] = [];
    const result = await query(querySql, values);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error })
  }

}

export async function GET(request: Request) {

  try {
    const querySql: string = "SELECT * FROM record";
    const values: any = [];
    const result = await query(querySql, values);

    return Response.json(result)
  } catch (error) {
    Response.json({ error: 'error' })
  }
}

