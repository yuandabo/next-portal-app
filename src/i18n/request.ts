import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const locale = (await cookieStore).get("NEXT_LOCALE")?.value || "en"; // 默认语言为 en
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
