import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "./lib/auth";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  // Check if the user is trying to access protected routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      // If the access token is invalid, try to refresh it
      return NextResponse.redirect(new URL("/api/auth/refresh", request.url));
    }
  }

  return NextResponse.next();
}
