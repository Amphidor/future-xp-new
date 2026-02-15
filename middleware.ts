import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that do not require login (login is a popup on home)
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/forgotpassword",
  "/newpassword",
  "/term-and-condition",
  "/privacy-policy",
  "/otpverify",
  "/frontend",
];

// Routes that require auth token
const PROTECTED_PREFIXES = ["/user", "/admin", "/dashboard"];

function isPublic(pathname: string): boolean {
  if (pathname === "/") return true;
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  if (isProtected(pathname)) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      // Redirect to home so user can open login popup
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
