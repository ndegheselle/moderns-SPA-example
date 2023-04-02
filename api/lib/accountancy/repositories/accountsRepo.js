import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
    getAll: async function () {
        return await prisma.account.findMany();
    },
    getById: async function (id) {
        return await prisma.account.findUnique({
            where: { id: id }
        });
    },
    create: async function (account) {
        return await prisma.account.create({
            data: account
        });
    },
    deleteById: async function (id) {
        const deleteTransactions = prisma.transaction.deleteMany({
            where: {
                accountId: id,
            },
        });
        const deleteAccount = prisma.account.delete({
            where: {
                id: id,
            },
        });

        const transac = await prisma.$transaction([deleteTransactions, deleteAccount]);
    },
    update: async function (accountId, account) {
        return await prisma.account.update({
            where: {
                id: accountId,
            },
            data: {
                name: account.name,
                description: account.description,
                balance: account.balance,
            },
        })
    }
};