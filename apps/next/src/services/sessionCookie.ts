import { cookies } from "next/headers";
import { cache } from "react";
import { SessionValidationResult, validateSessionToken } from "@fullstack-todos/auth";

import prisma from "@/lib/prisma";

export function setSessionTokenCookie(token: string, expiresAt: Date): void {
    cookies().set("session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        path: "/"
    });
}

export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
    const token = cookies().get("session")?.value ?? null;

    if (token === null) {
        return { session: null, user: null };
    }

    return await validateSessionToken({
        token,
        prismaClient: prisma
    });
});

export function deleteSessionTokenCookie(): void {
    cookies().set("session", "", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/"
    });
}
