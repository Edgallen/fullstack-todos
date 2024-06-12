import {type JWTPayload, jwtVerify, SignJWT} from "jose";
import type {Cookies} from "@sveltejs/kit";

import {key, sessionCookieName, sessionDurationTime} from "$constants/session";

import type {User} from "@prisma/client";

class SessionService {
    private async encrypt(payload: JWTPayload) {
        return await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("5 min from now")
            .sign(key);
    }

    private async decrypt(input: string): Promise<JWTPayload> {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });

        return payload;
    }

    async createSession(user: User, cookies: Cookies) {
        const expires = new Date(Date.now() + sessionDurationTime);
        const session = await this.encrypt({ user, expires });

        cookies.set(sessionCookieName, session, {
            expires: expires,
            httpOnly: true,
            path: '/'
        });
    }

    async updateSession(cookieValue: string, cookies: Cookies) {
        const parsed = await this.decrypt(cookieValue);
        parsed.expires = new Date(Date.now() + sessionDurationTime);

        const sessionCookieValue =  await this.encrypt(parsed)

        cookies.set(sessionCookieName, sessionCookieValue, {
            httpOnly: true,
            path: '',
            expires: parsed.expires as Date,
        });
    }

    async destroySession(cookies: Cookies) {
        cookies.delete(sessionCookieName, {
            path: '/'
        });
    }
}

const SessionServiceInstance = new SessionService();

export default SessionServiceInstance;

