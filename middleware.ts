import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;



  if (path === '/sign-in' && token) {
    return NextResponse.redirect(new URL('/builder', req.url));
  }

  const protectedRoutes = [
    '/dashboard',
    '/builder',
    '/my-resume'
  ];

  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

  if (isProtectedRoute && !token) {
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
  ],
};