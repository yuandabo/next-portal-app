// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/cart", "/checkout"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 检查路径是否是受保护的
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(`/${request.nextUrl.locale}${route}`)
  );

  const hasAuthToken = Boolean(request.cookies.get("auth_token")?.value);

  if (isProtected && !hasAuthToken) {
    const loginUrl = new URL(`/${request.nextUrl.locale}/login`, request.url);
    loginUrl.searchParams.set("redirect", pathname); // 保存原始跳转路径
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"], // 排除 API、静态资源
};
