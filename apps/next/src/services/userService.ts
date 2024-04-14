import {cookies} from "next/headers";
import {Prisma} from "@prisma/client";
import {redirect} from "next/navigation";

import SessionService from "@/services/sessionService";

import {sessionCookieName} from "@/constants/session";

class UserService {
    async getUserFromSessionToken () {
        const cookieStore = cookies()
        const sessionCookie = cookieStore.get(sessionCookieName)?.value || ''

        try {
            const session = await SessionService.getSession(sessionCookie)

            return session.user as Prisma.UserGetPayload<{
                include: {
                    todos: false
                }
            }>
        } catch {
            redirect('/login')
        }
    }
}

const UserServiceInstance = new UserService();

export default UserServiceInstance;
