import { auth } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

console.log('👋Middleware loaded');

const publicRoutes = ['/login', '/register'];

export default auth(req => {
    const { pathname } = req.nextUrl;

    const isPublicRoute = publicRoutes.includes(pathname);

    if (!isPublicRoute && !req.auth) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    if (isPublicRoute && req.auth) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
