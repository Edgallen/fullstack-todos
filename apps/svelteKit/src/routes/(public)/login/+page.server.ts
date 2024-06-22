import {fail, redirect} from "@sveltejs/kit";

import AuthService from "$services/authService";

import {getSingleUser} from "$dataAccess/users";

import {AuthFormSchema} from "$interfaces/auth";

const testUserCredentials = {
    username: 'test',
    password: 'test',
}

export const actions = {
    logIn: async ({ request, cookies }) => {
        const formData = await request.formData();
        const formDataFields = {
            username: formData.get('username'),
            password: formData.get('password'),
        }

        const validFields = AuthFormSchema.safeParse(formDataFields)
        if (!validFields.success) {
            const errors = validFields.error.flatten().fieldErrors

            return fail(422, {
                ...formDataFields,
                errors
            });
        }

        const { username, password } = validFields.data

        try {
            const user = await AuthService.logIn(username, password, cookies)

            if (Boolean(Object.keys(user.errors).length)) {
                return fail(422, {
                    ...formDataFields,
                    errors: user.errors
                });
            }
        } catch (error) {
            console.log(error)
        }

        redirect(302, '/');
    },

    testLogIn: async ({ cookies }) => {
        try {
            const testUser = await getSingleUser(testUserCredentials.username)

            testUser
                ? await AuthService.logIn(testUserCredentials.username, testUserCredentials.password, cookies)
                : await AuthService.registration(testUserCredentials.username, testUserCredentials.password, cookies)
        } catch (error) {
            console.log(error)
        }

        redirect(302, '/');
    }
}
