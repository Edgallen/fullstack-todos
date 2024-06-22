import prisma from "$lib/prisma";

export const getSingleUser = (username: string) => (
    prisma.user.findUnique({
        where: {
            username
        }
    })
)
