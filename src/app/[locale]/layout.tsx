// import { NextIntlClientProvider } from "next-intl";
// import { ReactNode } from "react";
// import { notFound } from "next/navigation";
// import { getUserLocale } from "@/i18n";

// export default async function RootLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const locale = await getUserLocale(); // 或者从 cookie/user setting 获取
//   let messages;
//   try {
//     messages = (await import(`../../messages/${locale}.json`)).default;
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error) {
//     notFound();
//   }

//   return (
//     <html lang={locale}>
//       <body>
//         <NextIntlClientProvider messages={messages} locale={locale}>
//           {children}
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { SessionProvider } from "next-auth/react";
import "../globals.css";
// 为所有页面生成静态渲染
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <head>
        <title>My Next Portal Web</title>
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <meta name="google" content="notranslate" key="notranslate" />
        <meta
          name="description"
          key="desc"
          content="Next: ssr/ssg, i18n, jest/cypress,cd/cd,api路由,动态导入,hooks,context,redux/zustand,tailwind.restful,服务器组件Next: ssr/ssg, i18n, jest/cypress,cd/cd,api路由,动态导入,hooks,context,redux/zustand,tailwind.restful,服务器组件"
        />
        <meta property="og:title" content="My Next Portal Web" />
        <meta
          property="og:description"
          content="Next: ssr/ssg, i18n, jest/cypress,cd/cd,api路由,动态导入,hooks,context,redux/zustand,tailwind.restful,服务器组件Next: ssr/ssg, i18n, jest/cypress,cd/cd,api路由,动态导入,hooks,context,redux/zustand,tailwind.restful,服务器组件"
        />
        <meta
          property="og:image"
          content="https://example.com/images/cool-page.jpg"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </head>
      <body>
        <SessionProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
