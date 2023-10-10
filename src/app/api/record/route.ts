import prisma from "@/utils/prismaClient"

export async function POST(request: Request) {
    const data = await request.json()
    console.log(data);
    const queryData = await prisma.record.create({
      data: data
    })

    return Response.json({ ok: data })
  }