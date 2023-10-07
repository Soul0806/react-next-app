import prisma from "./prismaClient";

export const create = async (data) => {
    try {
        const spec = await prisma.specification.create({
            data: data
        });
        return spec;
    } catch (error) {
        console.log(error);
    }
}
