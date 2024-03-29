import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default {
    getAll: async function () {
        const result = await prisma.category.findMany();
        let noneCategory = [{name: "None", id: null}];
        return noneCategory.concat(result);
    },
    create: async function (category) {
        return await prisma.category.create({
            data: category
        });
    },
    deleteById: async function (id) {
        const updateTransactions = prisma.transaction.updateMany({
            where: {
                categoryId: id,
            },
            data: {categoryId: null}
        });
        const deleteCategory = prisma.category.delete({
            where: {
                id: id,
            },
        });

        const transac = await prisma.$transaction([updateTransactions, deleteCategory]);
    },
    update: async function (id, category) {
        return await prisma.category.update({
            where: {
                id: id,
            },
            data: {
                name: category.name,
                color: category.color,
                icon: category.icon
            },
        })
    }
};