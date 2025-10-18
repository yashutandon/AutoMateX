import { PrismaClient } from '@/generated/prisma';

const glogbalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
    glogbalForPrisma.prisma ||
    new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
    });

if (process.env.NODE_ENV !== 'production') {
    glogbalForPrisma.prisma = prisma;
}

export default prisma;