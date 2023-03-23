import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default {
    getById: async function(id) {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        return {id: user.id, username: user.username};
    },
    getByUsernamePassword: async function(username, password) {
        const user = await prisma.user.findFirst({
            where: { username: username },
        });

        if (!user) return null;
        if (!bcrypt.compare(password, user.password)) return null;

        return {id: user.id, username: user.username};
    },
    saveRefreshToken: async function(userId, token) {
        await prisma.user.update({
            where: { id: userId },
            data: { refreshToken: token }
        });
    },
    checkRefreshToken: async function(token, decoded) {
        const user = await prisma.user.findFirst({
            where: { id: decoded.user.id, refreshToken: token },
        });
        return !!user;
    }
};