import { redirect } from "@sveltejs/kit";

import { sessionCookieName } from "$constants/session";

export const load = async ({ cookies }) => {
    const sessionCookie = cookies.get(sessionCookieName);

    if (sessionCookie) {
        redirect(302, "/");
    }
};
