"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const toggleLocale = locale === "zh" ? "en" : "zh";
  const newPath = pathname.replace(/^\/(zh|en)/, `/${toggleLocale}`);

  return (
    <Button variant="ghost" size="sm" onClick={() => router.push(newPath)}>
      {t("nav.switchTo")}
    </Button>
  );
}
