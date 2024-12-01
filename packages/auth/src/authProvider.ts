import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import db from "@database/prisma";

import {
    createSession as dbCreateSession,
    deleteSession,
    getSessionWithUsers,
    updateSession
} from "@database/data-access";

import type { ICreateSession, IInvalidateSession, IValidateSessionToken } from "./interfaces";

export const generateSessionToken = (): string => {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);

    return encodeBase32LowerCaseNoPadding(bytes);
};

export const createSession = async ({
    userId,
    token
}: ICreateSession): Promise<db.Session> => {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: db.Session = {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    };

    await dbCreateSession(session);
    return session;
};

export const validateSessionToken = async ({
    token,
}: IValidateSessionToken): Promise<SessionValidationResult> => {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const result = await getSessionWithUsers(sessionId);

    if (result === null) {
        return { session: null, user: null };
    }

    const { User: user, ...session } = result;
    if (Date.now() >= session.expiresAt.getTime()) {
        await deleteSession(sessionId);
        return { user: null, session: null };
    }

    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await updateSession(session.is, session.expiresA);
    }

    return { user, session };
};

export const invalidateSession = async ({
    sessionId,
}: IInvalidateSession): Promise<void> => {
    await deleteSession(sessionId);
};

export type SessionValidationResult =
    | { session: db.Session, user: db.User }
    | { session: null, user: null }
