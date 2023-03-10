import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const transactionsRepo = {
    creates: async function(accountId, transactionsList) {
    }
};