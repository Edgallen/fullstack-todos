import {fail} from "@sveltejs/kit";

import UserService from "$services/userService";

import {createTodo, deleteTodo, updateTodo} from "$dataAccess/todos";

import {DeleteTodoSchema, TodoFormSchema, UpdateTodoSchema} from "$interfaces/todos";
import {Status} from "@prisma/client";

export const actions = {
    addTodo: async ({ request, cookies }) => {
        const userData = await UserService.getUserFromSessionToken(cookies)

        const formData = await request.formData();
        const formDataFields = {
            text: formData.get('text'),
        }

        const validFields = TodoFormSchema.safeParse(formDataFields)

        if (!validFields.success) {
            const errors = validFields.error.flatten().fieldErrors
            return fail(422, {
                ...formDataFields,
                errors
            });
        }

        const { text } = validFields.data

        try {
            if (userData) {
                await createTodo(userData.id, text)
            }
        } catch (error) {
            console.log(error)
        }
    },

    updateTodo: async ({ request, cookies }) => {
        const formData = await request.formData();
        const formDataFields = {
            id: formData.get('id'),
            status: formData.get('status'),
        }

        const validFields = UpdateTodoSchema.safeParse(formDataFields)

        if (!validFields.success) {
            const errors = validFields.error.flatten().fieldErrors
            return fail(422, {
                errors
            });
        }

        const { id, status } = validFields.data

        try {
            await updateTodo(id, status as Status)
        } catch (error) {
            console.log(error)
        }
    },

    deleteTodo: async ({ request, cookies }) => {
        const formData = await request.formData();
        const formDataFields = {
            id: formData.get('id'),
        }

        const validFields = DeleteTodoSchema.safeParse(formDataFields)

        if (!validFields.success) {
            const errors = validFields.error.flatten().fieldErrors
            return fail(422, {
                errors
            });
        }

        const { id } = validFields.data

        try {
            await deleteTodo(id)
        } catch (error) {
            console.log(error)
        }
    }
}
