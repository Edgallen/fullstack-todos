'use server'

import {redirect} from "next/navigation";

import {getSingleUser} from "@/dataAccess/users";

import UserService from "@/services/authService";

import {testUserCredentials} from "@/api/auth/constants";

import {AuthFormSchema, RegisterAuthFormSchema, IAuthFormState, IRegisterAuthErrors} from "@/api/auth/definitions";

export const logIn = async (_: IAuthFormState, formData: FormData) => {
    const validFields = AuthFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    })

    if (!validFields.success) {
        return {
            errors: validFields.error.flatten().fieldErrors,
        }
    }

    const { username, password } = validFields.data

    try {
        const user = await UserService.logIn(username, password)

        if (Boolean(Object.keys(user.errors).length)) {
            return {
                errors: user.errors,
            }
        }
    } catch (error) {
        console.log(error)
    }

    redirect('/')
}

export const SignInAsTestUser = async () => {
    try {
        const testUser = await getSingleUser(testUserCredentials.username)

        testUser
            ? await UserService.logIn(testUserCredentials.username, testUserCredentials.password)
            : await UserService.registration(testUserCredentials.username, testUserCredentials.password)
    } catch (error) {
        console.log(error)
    }

    redirect('/')
}

export const register = async (_: IAuthFormState<IRegisterAuthErrors>, formData: FormData) => {
    const validFields = RegisterAuthFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
        confirm: formData.get('confirm')
    })

    if (!validFields.success) {
        return {
            errors: validFields.error.flatten().fieldErrors,
        }
    }

    const { username, password } = validFields.data

    try {
        const user = await UserService.registration(username, password)

        if (Boolean(Object.keys(user.errors).length)) {
            return {
                errors: user.errors,
            }
        }
    } catch (error) {
        console.log(error)
    }

    redirect('/')
}

export const logOut = async () => {
    try {
        await UserService.logout()
    } catch (error) {
        console.log(error)
    }
}
