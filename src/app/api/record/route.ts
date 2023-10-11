import prisma from "@/utils/prismaClient"
import { query } from '@/lib/query';

export async function POST(request: Request) {

  try {
   
    const querySql: string = "INSERT INTO test (aa, bb) VALUES (?,?)";
    const values: any = ['aa', 'bb'] ;
    const result = await query(querySql, values);
    return Response.json(result)
  } catch (error) {
    return Response.json({error: 'error'})
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

