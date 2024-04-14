import {NextRequest} from 'next/server'

import SessionService from "@/services/sessionService";

import {sessionCookieName} from "@/constants/session";

const publicRoutes = ['/login', '/register']

export const middleware = async (request: NextRequest) => {
    const sessionCookie = request.cookies.get(sessionCookieName)?.value;
    const pathname = request.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(pathname);

    if (sessionCookie) {
        try {
            await SessionService.updateSession(sessionCookie)

            if (isPublicRoute) {
                return Response.redirect(new URL('/', request.url))
            }
        } catch (error) {
            return SessionService.destroyInvalidSession(request)
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
