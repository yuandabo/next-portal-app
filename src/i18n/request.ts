// import { getRequestConfig } from "next-intl/server";
// import { cookies } from "next/headers";

// export default getRequestConfig(async () => {
//   const cookieStore = cookies();
//   const locale = (await cookieStore).get("NEXT_LOCALE")?.value || "en"; // 默认语言为 en
//   return {
//     locale,
//     messages: (await import(`../../messages/${locale}.json`)).default,
//   };
// });

import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
