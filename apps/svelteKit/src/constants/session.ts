export const secret = process.env.JWT_SECRET || 'secret'
export const sessionDurationTime = 300 * 1000

export const key = new TextEncoder().encode(secret);
export const sessionCookieName = 'TODOS_SESSION'
