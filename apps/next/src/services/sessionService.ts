import { createSession, generateSessionToken, validateSessionToken } from "@fullstack-todos/auth";

import { User } from "@prisma/client";

import prisma from "@/lib/prisma";

import { setSessionTokenCookie } from "@/services/sessionCookie";

import { sessionDurationTime } from "@/constants/session";

class SessionService {
    async getSession(token: string) {
        return await validateSessionToken({
            token,
            prismaClient: prisma
        });
    }

    async createSession(user: User) {
        const token = generateSessionToken();

        await createSession({
            userId: user.id,
            token,
            prismaClient: prisma
        });

        const expireDate = new Date(Date.now() + sessionDurationTime);
        setSessionTokenCookie(token, expireDate);
    }
}

const SessionServiceInstance = new SessionService();

export default SessionServiceInstance;
