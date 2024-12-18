import db from "@database/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import SessionService from "@/services/sessionService";

import { sessionCookieName } from "@/constants/session";

class UserService {
    async getUserFromSessionToken () {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get(sessionCookieName)?.value || "";

        try {
            const {
                session,
                user
            } = await SessionService.getSession(sessionCookie);

            if (!session || !user) {
                redirect("/login");
            }

            return user as db.Prisma.UserGetPayload<{
                include: {
                    todos: false
                }
            }>;
        } catch {
            redirect("/login");
        }
    }
}

const UserServiceInstance = new UserService();

export default UserServiceInstance;
