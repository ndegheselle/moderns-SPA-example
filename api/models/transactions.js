import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const transactionsRepo = {
    creates: async function(accountId, dateMin, dateMax, transactionsList) {

        transactionsList.forEach(transaction => {
            transaction.accountId = accountId;
        });

        transactionsList.sort((a, b) => b.date - a.date);

        let actualTransactions = await prisma.transaction.findMany({
            where: {
                date: {gte: dateMin}
            },
            orderBy: [
                {
                  date: 'desc',
                }
            ],
        });
        
        // TODO : compare actual list and new to find existing

        return await prisma.transaction.createMany({
            data: transactionsList
        });
    },
    getByAccountId: async function(accountId) {
        return await prisma.transaction.findMany({
            where: { accountId: accountId }
        });
    }
};