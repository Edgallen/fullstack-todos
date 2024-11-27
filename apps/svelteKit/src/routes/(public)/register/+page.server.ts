import AuthService from "$services/authService";
import { redirect } from "@sveltejs/kit";

import { throwFormError, throwZodFormError } from "$lib/errorHandling";

import { RegisterAuthFormSchema } from "$interfaces/auth";

export const actions = {
    register: async ({ request, cookies }) => {
        const formData = await request.formData();
        const formDataFields = {
            username: formData.get("username"),
            password: formData.get("password"),
            confirm: formData.get("confirm")
        };

        const validFields = RegisterAuthFormSchema.safeParse(formDataFields);

        if (!validFields.success) {
            return throwZodFormError({
                status: 422,
                zodError: validFields.error,
                formDataFields
            });
        }

        const { username, password } = validFields.data;

        try {
            const user = await AuthService.registration(username, password, cookies);

            if (Object.keys(user.errors).length) {
                return throwFormError({
                    status: 422,
                    errors: user.errors,
                    formDataFields
                });
            }
        } catch (error) {
            console.log(error);
        }

        redirect(302, "/");
    }
};
