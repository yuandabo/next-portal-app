// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
// import { getUserLocale, locales } from "@/lib/i18n";
// import chainMiddleware from "next-intl/middleware";
// import withI18n from "next-intl/middleware";
// import withAuth from "next-auth/middleware";
// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("next-auth.session-token")?.value;
//   const { pathname } = req.nextUrl;
//   // ① 国际化：重定向到 /{locale}/...
//   const locale = getUserLocale() ?? "en";
//   const maybeLocale = pathname.split("/")[1] as (typeof locales)[number];
//   if (!locales.includes(maybeLocale)) {
//     return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
//   }
// ② 鉴权：保护 /checkout 与 /orders
//   if (pathname.startsWith(`/checkout`) && !token) {
//     return NextResponse.redirect(new URL(`/login`, req.url));
//   }
//   return NextResponse.next();
// }

// export function middleware(request: NextRequest) {
//   const locale = request.cookies.get("NEXT_LOCALE")?.value || "en";
//   const response = NextResponse.next();
//   response.headers.set("x-locale", locale); // 传递到组件
//   return response;
// }

// middleware.ts
export const config = {
  matcher: ["/((?!_next|favicon.ico|api/auth).*)"], // 包含所有非静态路径
};

// export default chainMiddleware([withI18n, withAuth]); // i18n 首位
