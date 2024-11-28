import { redirect } from "@sveltejs/kit";

import SessionService from "$services/sessionService";

import { sessionCookieName } from "$constants/session";

export const load = async ({ cookies }) => {
    const sessionCookie = cookies.get(sessionCookieName);

    if (sessionCookie) {
        try {
            await SessionService.updateSession(sessionCookie, cookies);
        } catch (error) {
            await SessionService.destroySession(cookies);
            redirect(302, "/login");
        }
    } else {
        redirect(302, "/login");
    }
};
