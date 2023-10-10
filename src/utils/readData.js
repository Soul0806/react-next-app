import prisma from "./prismaClient";

export const queryData = async (table) => {
    try {
        const queryOutput = await prisma[table].findMany();
        return queryOutput;
    } catch (error) {
        console.log(error);
    }
}

export const table = {
    SPECIFICATION: 'Specification',
    RECORD: 'Record',
}