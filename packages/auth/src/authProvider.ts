import {encodeBase32LowerCaseNoPadding, encodeHexLowerCase} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

import type { User, Session } from '@prisma/client'
import type {ICreateSession, IInvalidateSession, IValidateSessionToken} from './interfaces'

export const generateSessionToken = (): string => {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);

    return encodeBase32LowerCaseNoPadding(bytes);
}

export const createSession = async ({
    userId,
    token,
    prismaClient
}: ICreateSession): Promise<Session> => {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: Session = {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }

    await prismaClient.session.create({
        data: session
    })
    return session;
}

export const validateSessionToken = async ({
    token,
    prismaClient
}: IValidateSessionToken): Promise<SessionValidationResult> => {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const result = await prismaClient.session.findUnique({
        where: {
            id: sessionId
        },
        include: {
            User: true
        }
    });

    if (result === null) {
        return { session: null, user: null };
    }

    const { User: user, ...session } = result;
    if (Date.now() >= session.expiresAt.getTime()) {
        await prismaClient.session.delete({ where: { id: sessionId } });
        return { user: null, session: null };
    }

    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await prismaClient.session.update({
            where: {
                id: session.id
            },
            data: {
                expiresAt: session.expiresAt
            }
        })
    }

    return { user, session }
}

export const invalidateSession = async ({
    sessionId,
    prismaClient
}: IInvalidateSession): Promise<void> => {
    await prismaClient.session.delete({
        where: {
            id: sessionId
        }
    })
}

export type SessionValidationResult =
    | { session: Session, user: User }
    | { session: null, user: null }
