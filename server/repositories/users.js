import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const usersRepository = {
    getByUsernamePassword: async function(username, password) {
        const user = await prisma.users.findFirst({ where: {username}});
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return await prisma.users.findUnique({where: {id: user.id}});
        };
        return null;
    }
};