import db from "@database/prisma";

const globalForPrisma = global as unknown as { prisma: db.PrismaClient };

const prisma = globalForPrisma.prisma || new db.PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
