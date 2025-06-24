import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getUserLocale } from "@/i18n";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getUserLocale(); // 或者从 cookie/user setting 获取
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
