import prisma from "@/client";

import type { Session } from "@database/prisma";

export const createSession = (session: Session) => prisma.session.create({
    data: session
});

export const getSessionWithUsers = (sessionId: string) => prisma.session.findUnique({
    where: {
        id: sessionId
    },
    include: {
        User: true
    }
});

export const updateSession = (sessionId: string, expiresIn: string) => prisma.session.update({
    where: {
        id: sessionId
    },
    data: {
        expiresAt: expiresIn
    }
});

export const deleteSession = (sessionId: string) => prisma.session.delete({
    where: { id: sessionId }
});
