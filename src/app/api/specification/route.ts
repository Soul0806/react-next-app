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
