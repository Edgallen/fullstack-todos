export interface ICreateSession {
    token: string;
    userId: number;
}

export interface IValidateSessionToken {
    token: string
}

export interface IInvalidateSession {
    sessionId: string;
}
