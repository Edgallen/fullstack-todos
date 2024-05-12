'use server'

import {revalidatePath} from "next/cache";
import prisma from "@/lib/prisma";
import {Status} from "@prisma/client";

import UserService from "@/services/userService";

import {ITodoFormState, TodoFormSchema} from "@/api/todos/definitions";

export const getTodos = async (status: string | null) => {
    const user = await UserService.getUserFromSessionToken()

    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: user.id,
                ...(status ? {status: status as Status} : {})
            },
            orderBy: [
                {
                    status: 'desc'
                },
                {
                    createdAt: 'desc'
                }
            ]
        })

        return { data: todos }
    } catch (error) {
        console.log(error, '- error')
    }
}

export const createTodo = async (_: ITodoFormState, formData: FormData) => {
    const userData = await UserService.getUserFromSessionToken()

    const validFields = TodoFormSchema.safeParse({
        text: formData.get('text'),
    })

    if (!validFields.success) {
        return {
            errors: validFields.error.flatten().fieldErrors,
        }
    }

    const { text } = validFields.data

    try {
        await prisma.todo.create({
           data: {
               userId: userData.id,
               status: 'NEW',
               text
           }
        })
    } catch (error) {
        console.log(error, '- error')
    }

    revalidatePath('/')

    return {}
}

export const updateTodoStatus = async (id: number, status: Status) => {
    await UserService.getUserFromSessionToken()

    try {
        await prisma.todo.update({
            data: {
              status
            },
            where: {
                id
            }
        })
    } catch (error) {
        console.log(error, '- error')
    }

    revalidatePath('/')
}

export const deleteTodo = async (id: number) => {
    await UserService.getUserFromSessionToken()

    try {
        await prisma.todo.delete({
            where: {
                id
            }
        })
    } catch (error) {
        console.log(error, '- error')
    }

    revalidatePath('/')
}
