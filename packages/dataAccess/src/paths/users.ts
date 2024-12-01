import prisma from "@/client";

export const getSingleUser = (username: string) => (
    prisma.user.findUnique({
        where: {
            username
        }
    })
);

export const createUser = (username: string, password: string) => (
    prisma.user.create({
        data: {
            username,
            password
        }
    })
);
