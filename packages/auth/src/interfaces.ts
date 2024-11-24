import type {Prisma, PrismaClient} from "@prisma/client";
import type {DefaultArgs} from "@prisma/client/runtime/library";

export type TPrismaClient = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

interface IPrismaService {
    prismaClient: TPrismaClient
}

export interface ICreateSession extends IPrismaService{
    token: string;
    userId: number;
}

export interface IValidateSessionToken extends IPrismaService {
    token: string
}

export interface IInvalidateSession extends IPrismaService {
    sessionId: string;
}
