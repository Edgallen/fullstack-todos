import type { Cookies } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import SessionService from "$services/sessionService";

import { sessionCookieName } from "$constants/session";

class UserService {
    async getUserFromSessionToken (cookies: Cookies) {
        const sessionCookie = cookies.get(sessionCookieName) || "";

        try {
            const session = await SessionService.getSession(sessionCookie);

            return session.user as Prisma.UserGetPayload<{
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
