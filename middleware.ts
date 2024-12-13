import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const path = req.nextUrl.pathname

  if (path.startsWith('/builder')) {
    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  }

  return NextResponse.next()
}

export const config = { 
  matcher: ['/builder/:path*'] 
}