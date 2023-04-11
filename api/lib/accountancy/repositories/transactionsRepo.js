import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
    // TODO : should add a system that show what transactions will be imported first
    creates: async function (accountId, dateMin, dateMax, transactionsList) {

        const transacNumberByDate = {};
        // Reverse loop to keep orderNumber logical (oldest to newest)
        for (let i = transactionsList.length - 1; i >= 0; i--) {
            let transaction = transactionsList[i];

            const dateString = transaction.date.toDateString();
            transacNumberByDate[dateString] = (transacNumberByDate[dateString] + 1) || 0;

            transaction.orderNumber = transacNumberByDate[dateString];
            transaction.accountId = accountId;
        }

        transactionsList.sort((a, b) => b.date - a.date || b.orderNumber - a.orderNumber);

        let lastTransaction = await prisma.transaction.findFirst({
            where: {
                accountId: accountId,
                date: { gte: dateMin }
            },
            orderBy: [
                { date: 'desc' },
                { orderNumber: 'desc' }
            ],
        });

        // XXX : is it possible that a bank add transaction in the past ?
        // If transactions are too old we don't import it
        if (transactionsList[0].date <= lastTransaction?.date) return { count: 0 };

        // Don't import the transactions that are already present
        if (lastTransaction) {
            lastTransaction.orderNumber += 1;
            let indexSameDayLastTransaction = null;
            for (let i = transactionsList.length - 1; i >= 0; i--) {

                // Search last imported
                if (transactionsList[i].date.getTime() == lastTransaction.date.getTime() &&
                    transactionsList[i].description == lastTransaction.description &&
                    transactionsList[i].value == lastTransaction.value) {

                    transactionsList = transactionsList.slice(0, i);
                    break;
                }

                if (transactionsList[i].date.getTime() == lastTransaction.date.getTime())
                {
                    // Keep same day as last index so that we can resolve specific cases
                    if (!indexSameDayLastTransaction) indexSameDayLastTransaction = i+1;

                    transactionsList[i].orderNumber += lastTransaction.orderNumber;
                }

                // Safe guard / optimisation since bank can change transactions names between two imports
                if (transactionsList[i].date > lastTransaction.date) {
                    transactionsList = transactionsList.slice(0, indexSameDayLastTransaction || i);
                    break;
                }
            }
        }
        
        return await prisma.transaction.createMany({
            data: transactionsList
        });
    },
    getByAccountId: async function (accountId) {
        return await prisma.transaction.findMany({
            where: { accountId: accountId },
            orderBy: [
                { date: 'desc' },
                { orderNumber: 'desc' }
            ]
        });
    },
    updateAll: async function (transactions) {
        const updatedTransactions = [];
        for (let transaction of transactions) {
            let updatedTransaction = await prisma.transaction.update({
                where: {
                    id: transaction.id,
                },
                data: {
                    categoryId: transaction.categoryId
                },
            });
            updatedTransactions.push(updatedTransaction);
        }

        return updatedTransactions;
    }
};