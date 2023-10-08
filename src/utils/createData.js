import prisma from "./prismaClient";

export const create = async (table, data) => {
    try {
        const spec = await prisma[table].create({
            data: data
        });
        return spec;
    } catch (error) {
        console.log(error);
    }
}
