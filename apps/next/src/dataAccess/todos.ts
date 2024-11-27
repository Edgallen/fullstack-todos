import prisma from "@/lib/prisma";

import { Status } from "@prisma/client";

export const getTodos = (userId: number, status?: Status | null) => (
    prisma.todo.findMany({
        where: {
            userId,
            ...(status ? { status } : {})
        },
        orderBy: [
            {
                status: "desc"
            },
            {
                createdAt: "desc"
            }
        ]
    })
);

export const createTodo = (userId: number, text: string) => (
    prisma.todo.create({
        data: {
            userId,
            status: "NEW",
            text
        }
    })
);

export const updateTodo = (id: number, status: Status) => (
    prisma.todo.update({
        data: {
            status
        },
        where: {
            id
        }
    })
);

export const deleteTodo = (id: number) => (
    prisma.todo.delete({
        where: {
            id
        }
    })
);
