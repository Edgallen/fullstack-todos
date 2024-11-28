import bcrypt from "bcrypt";
import { invalidateSession } from "@fullstack-todos/auth";

import { createUser, getSingleUser } from "@/dataAccess/users";

import SessionService from "@/services/sessionService";
import { deleteSessionTokenCookie, getCurrentSession } from "@/services/sessionCookie";

import prisma from "@/lib/prisma";

class AuthService {
    async registration(username: string, password: string) {
        const pendingUser = await getSingleUser(username);

        if (pendingUser) {
            return {
                errors: {
                    username: ["Username already exists"],
                    password: [],
                    confirm: []
                }
            };
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const user = await createUser(username, hashPassword);

        await SessionService.createSession(user);

        return { errors: {}, user };
    }

    async logIn(username: string, password: string) {
        const user = await getSingleUser(username);

        if (!user) {
            return {
                errors: {
                    username: ["Wrong username or password"],
                    password: []
                }
            };
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password);

        if (!isPasswordEquals) {
            return {
                errors: {
                    username: ["Wrong username or password"],
                    password: []
                }
            };
        }

        await SessionService.createSession(user);

        return { errors: {}, user };
    }

    async logout() {
        const currentSession = await getCurrentSession();

        if (currentSession?.session) {
            await invalidateSession({
                sessionId: currentSession.session.id,
                prismaClient: prisma
            });
        }

        deleteSessionTokenCookie();
    }
}

const AuthServiceInstance = new AuthService();

export default AuthServiceInstance;
