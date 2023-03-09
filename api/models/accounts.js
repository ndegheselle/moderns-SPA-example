import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const accountsRepository = {
    getAll: async function() {
        const user = await prisma.accounts.findUnique({
            where: { id: id },
        });
        return {id: user.id, username: user.username};
    },
    getById: async function(id) {
        const user = await prisma.users.findFirst({
            where: { username: username },
        });

        if (!user) return null;
        if (!bcrypt.compare(password, user.password)) return null;

        return {id: user.id, username: user.username};
    }
};