// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and public routes as needed
const protectedRoutes = ['/dashboard', '/admin'];
const publicRoutes = ['/login', '/signup', '/'];

// Middleware runs on every request matching config.matcher below
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log('pathname', pathname);
  // Allow public routes without auth
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for auth token cookie - example: "token"
  const token = req.cookies.get('token')?.value;
  // If accessing protected route and no token, redirect to login
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    // Optionally: validate token here (e.g. JWT verification) on server side; else redirect

  }

  // Else allow navigation
  return NextResponse.next();
}

// Specify paths for middleware to apply
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/signup', '/'],
};
