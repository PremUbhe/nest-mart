import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/admin/:path*', '/login', '/register', '/'],
};

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    if (
        token &&
        (url.pathname.startsWith('/login') || url.pathname.startsWith('/register') || url.pathname === '/')
    ) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    if(token?.type !== "master" && url.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    if (!token && url.pathname.startsWith('/admin') || url.pathname == '/cart') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}