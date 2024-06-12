import AuthService from "$services/authService";
import {redirect} from "@sveltejs/kit";

import {RegisterAuthFormSchema} from "$interfaces/auth";

export const actions = {
    register: async ({ request, cookies }) => {
        const formData = await request.formData();
        const formDataFields = {
            username: formData.get('username'),
            password: formData.get('password'),
            confirm: formData.get('confirm')
        }

        const validFields = RegisterAuthFormSchema.safeParse(formDataFields)

        if (!validFields.success) {
            return {
                ...formDataFields,
                errors: validFields.error.flatten().fieldErrors,
            }
        }

        const { username, password } = validFields.data

        try {
            const user = await AuthService.registration(username, password, cookies)

            if (Boolean(Object.keys(user.errors).length)) {
                return {
                    ...formDataFields,
                    errors: user.errors,
                }
            }
        } catch (error) {
            console.log(error)
        }

        redirect(302, '/');
    }
}
