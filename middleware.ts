import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./src/i18n/routing";

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  console.log("🚀 ~ token:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Localization Middleware
const localizationMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Apply auth to /app routes
  if (pathname.startsWith("/app")) {
    return authMiddleware(req);
  }

  // Apply localization to other routes
  return localizationMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
