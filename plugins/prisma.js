import { PrismaClient } from '@prisma/client';

export default({ app }, inject) => {
    inject('prisma', new PrismaClient());
}