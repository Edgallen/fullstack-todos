import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {JWTPayload, jwtVerify, SignJWT} from "jose";

import {User} from "@prisma/client";

import {key, sessionCookieName, sessionDurationTime} from "@/constants/session";

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

    async getSession(cookie: string) {
        return await this.decrypt(cookie)
    }

    async createSession(user: User) {
        const expires = new Date(Date.now() + sessionDurationTime);
        const session = await this.encrypt({ user, expires });

        cookies().set(sessionCookieName, session, { expires, httpOnly: true });
    }

    async updateSession(cookie: string) {
        const parsed = await this.decrypt(cookie);
        parsed.expires = new Date(Date.now() + sessionDurationTime);

        const res = NextResponse.next();

        res.cookies.set({
            name: sessionCookieName,
            value: await this.encrypt(parsed),
            httpOnly: true,
            expires: parsed.expires as Date,
        });

        return res;
    }

    async destroySession() {
        cookies().set(sessionCookieName, "", { expires: new Date(0) });
    }

    async destroyInvalidSession(request: NextRequest) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete(sessionCookieName)

        return response
    }
}

const SessionServiceInstance = new SessionService();

export default SessionServiceInstance;
