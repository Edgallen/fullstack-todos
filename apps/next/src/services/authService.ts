import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt'

import SessionService from "@/services/sessionService";

class AuthService {
    async registration(username: string, password: string) {
        const pendingUser = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (pendingUser) {
            return {
                errors: {
                    username: ['Username already exists'],
                    password: [],
                    confirm: []
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

        await SessionService.createSession(user)

        return { errors: {}, user }
    }

    async logIn(username: string, password: string) {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (!user) {
            return {
                errors: {
                    username: ['Wrong username or password'],
                    password: []
                }
            }
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password);

        if (!isPasswordEquals) {
            return {
                errors: {
                    username: ['Wrong username or password'],
                    password: []
                }
            }
        }

        await SessionService.createSession(user)

        return { errors: {}, user}
    }

    async logout() {
        await SessionService.destroySession()
    }
}

const AuthServiceInstance = new AuthService()

export default AuthServiceInstance;
