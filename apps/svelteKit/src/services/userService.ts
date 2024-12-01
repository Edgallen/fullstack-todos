import SessionService from "$services/sessionService";
import db from "@database/prisma";

import { sessionCookieName } from "$constants/session";

import type { Cookies } from "@sveltejs/kit";

class UserService {
    async getUserFromSessionToken (cookies: Cookies) {
        const sessionCookie = cookies.get(sessionCookieName) || "";

        try {
            const session = await SessionService.getSession(sessionCookie);

            return session.user as db.Prisma.UserGetPayload<{
                include: {
                    todos: false
                }
            }>;
        } catch (error) {
            console.log(error);
        }
    }

    async logout(cookies: Cookies) {
        await SessionService.destroySession(cookies);
    }
}

const UserServiceInstance = new UserService();

export default UserServiceInstance;
