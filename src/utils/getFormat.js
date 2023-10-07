import prisma from "./prismaClient";

export const queryData = async () => {
    try {
        const queryOutput = await prisma.specification.findMany();
        return queryOutput;
    } catch (error) {
        console.log(error);
    }
}
