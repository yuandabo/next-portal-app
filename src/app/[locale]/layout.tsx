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
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
