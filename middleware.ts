import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const privateRoutes = ['/cart'];
export const adminRoutes = ['/admin'];
export const registerRoutes = ['/register', '/login', '/'];

export async function middleware(request: NextRequest) {

  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const redirectTo = (path: string) => NextResponse.redirect(new URL(path, request.url));

  // Handle access to register routes
  if (registerRoutes.some((route) => pathname === route)) {
    return token ? redirectTo('/home') : NextResponse.next();
  }

  // Handle access to admin routes
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) return redirectTo('/login');
    if (token?.type !== 'master') return redirectTo('/error?message=not-authorized');
  }

  // Handle access to private routes
  if (privateRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) return redirectTo('/error?message=not-authenticated');
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}
