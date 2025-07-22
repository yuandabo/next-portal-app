// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/cart", "/checkout"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname.split("/")[1] || "en"; // 提取 locale

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(`/${locale}${route}`)
  );

  const hasAuthToken = Boolean(request.cookies.get("auth_token")?.value);

  if (isProtected && !hasAuthToken) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("redirect", pathname); // 原路径
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
