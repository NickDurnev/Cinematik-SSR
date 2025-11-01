import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  console.log("🚀 ~ token:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Apply auth to /app routes
  if (pathname.startsWith("/app")) {
    return authMiddleware(req);
  }
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
