import type {Cookies} from "@sveltejs/kit";
import bcrypt from "bcrypt";

import prisma from "$lib/prisma";

import SessionService from "$services/sessionService";

class AuthService {
    async registration(username: string, password: string, cookies: Cookies) {
        const pendingUser = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (pendingUser) {
            return {
                errors: {
                    username: ['Username already exists'],
                }
            }
        }

        const hashPassword = await bcrypt.hash(password, 3)

        const user = await prisma.user.create({
            data: {
                username,
                password: hashPassword
            }
        })

        await SessionService.createSession(user, cookies)

        return { errors: {}, user }
    }

    async logIn(username: string, password: string, cookies: Cookies) {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        // TODO: Наверное стоит переделать
        if (!user) {
            return {
                errors: {
                    username: ['Wrong username or password'],
                }
            }
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password);

        // TODO: Наверное стоит переделать
        if (!isPasswordEquals) {
            return {
                errors: {
                    username: ['Wrong username or password'],
                }
            }
        }

        await SessionService.createSession(user, cookies)

        return { errors: {}, user}
    }
}

const UserServiceInstance = new AuthService();

export default UserServiceInstance;
