import db from "@database/prisma";
import { createSession, generateSessionToken, validateSessionToken } from "@fullstack-todos/auth";

import { setSessionTokenCookie } from "@/services/sessionCookie";

import { sessionDurationTime } from "@/constants/session";

class SessionService {
    async getSession(token: string) {
        return await validateSessionToken({
            token,
        });
    }

    async createSession(user: db.User) {
        const token = generateSessionToken();

        await createSession({
            userId: user.id,
            token,
        });

        const expireDate = new Date(Date.now() + sessionDurationTime);
        await setSessionTokenCookie(token, expireDate);
    }
}

const SessionServiceInstance = new SessionService();

export default SessionServiceInstance;
