'use server'

import {revalidatePath} from "next/cache";

import UserService from "@/services/userService";

import {
    getTodos as dbGetTodos,
    createTodo as dbCreateTodo,
    updateTodo as dbUpdateTodo,
    deleteTodo as dbDeleteTodo
} from '@/dataAccess/todos'

import {Status} from "@prisma/client";
import {ITodoFormState, TodoFormSchema} from "@/api/todos/definitions";

export const getTodos = async (status: string | null) => {
    const user = await UserService.getUserFromSessionToken()

    try {
        const todos = await dbGetTodos(user.id, status as Status);

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
        await dbCreateTodo(userData.id, text)
    } catch (error) {
        console.log(error, '- error')
    }

    revalidatePath('/')

    return {}
}

export const updateTodoStatus = async (id: number, status: Status) => {
    await UserService.getUserFromSessionToken()

    try {
        await dbUpdateTodo(id, status)
    } catch (error) {
        console.log(error, '- error')
    }

    revalidatePath('/')
}

export const deleteTodo = async (id: number) => {
    await UserService.getUserFromSessionToken()

    try {
        await dbDeleteTodo(id)
    } catch (error) {
        console.log(error, '- error')
    }

    revalidatePath('/')
}
