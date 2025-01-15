import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (path === '/sign-up' && token) {
      return NextResponse.redirect(new URL('/my-resume', req.url));
    }

    const protectedRoutes = ['/dashboard', '/builder', '/my-resume'];
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

    if (isProtectedRoute && !token) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    if (path === '/sign-in' && token) {
      return NextResponse.redirect(new URL('/my-resume', req.url));
    }

  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/builder/:path*',
    '/my-resume/:path*',
    '/sign-in',
    '/sign-up',
  ],
};
