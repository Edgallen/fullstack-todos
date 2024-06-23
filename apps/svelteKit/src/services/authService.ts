import type {Cookies} from "@sveltejs/kit";
import bcrypt from "bcrypt";

import {generateFormError} from "$lib/errorHandling";

import SessionService from "$services/sessionService";

import {createUser, getSingleUser} from "$dataAccess/users";

class AuthService {
    async registration(username: string, password: string, cookies: Cookies) {
        const pendingUser = await getSingleUser(username)

        if (pendingUser) {
            return generateFormError({
                username: ['Username already exists']
            })
        }

        const hashPassword = await bcrypt.hash(password, 3)

        const user = await createUser(username, hashPassword)

        await SessionService.createSession(user, cookies)

        return { errors: {}, user }
    }

    async logIn(username: string, password: string, cookies: Cookies) {
        const user = await getSingleUser(username);

        if (!user) {
            return generateFormError({
                username: ['Wrong username or password']
            })
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password);

        if (!isPasswordEquals) {
            return generateFormError({
                username: ['Wrong username or password']
            })
        }

        await SessionService.createSession(user, cookies)

        return { errors: {}, user}
    }
}

const UserServiceInstance = new AuthService();

export default UserServiceInstance;
