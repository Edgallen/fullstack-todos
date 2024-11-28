import UserService from "$services/userService";

import { throwZodFormError } from "$lib/errorHandling";

import { createTodo, deleteTodo, updateTodo } from "$dataAccess/todos";

import { DeleteTodoSchema, TodoFormSchema, UpdateTodoSchema } from "$interfaces/todos";
import { Status } from "@prisma/client";

export const load = async ({ parent, cookies }) => {
    await parent();
    const userData = await UserService.getUserFromSessionToken(cookies);

    return {
        userData
    };
};

export const actions = {
    addTodo: async ({ request, cookies }) => {
        const userData = await UserService.getUserFromSessionToken(cookies);

        const formData = await request.formData();
        const formDataFields = {
            text: formData.get("text"),
        };

        const validFields = TodoFormSchema.safeParse(formDataFields);

        if (!validFields.success) {
            return throwZodFormError({
                status: 422,
                zodError: validFields.error,
                formDataFields
            });
        }

        const { text } = validFields.data;

        try {
            if (userData) {
                await createTodo(userData.id, text);
            }
        } catch (error) {
            console.log(error);
        }
    },

    updateTodo: async ({ request, cookies }) => {
        const formData = await request.formData();
        const formDataFields = {
            id: formData.get("id"),
            status: formData.get("status"),
        };

        const validFields = UpdateTodoSchema.safeParse(formDataFields);

        if (!validFields.success) {
            return throwZodFormError({
                status: 422,
                zodError: validFields.error
            });
        }

        const { id, status } = validFields.data;

        try {
            await updateTodo(id, status as Status);
        } catch (error) {
            console.log(error);
        }
    },

    deleteTodo: async ({ request, cookies }) => {
        const formData = await request.formData();
        const formDataFields = {
            id: formData.get("id"),
        };

        const validFields = DeleteTodoSchema.safeParse(formDataFields);

        if (!validFields.success) {
            return throwZodFormError({
                status: 422,
                zodError: validFields.error
            });
        }

        const { id } = validFields.data;

        try {
            await deleteTodo(id);
        } catch (error) {
            console.log(error);
        }
    },

    logOut: async ({ cookies }) => {
        try {
            await UserService.logout(cookies);
        } catch (error) {
            console.log(error);
        }
    }
};
