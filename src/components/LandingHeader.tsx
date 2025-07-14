// src/components/LandingHeader.tsx
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  const t = useTranslations();

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm">
      <Link href="/" className="text-xl font-bold">
        🛍️ NextShop
      </Link>
      <nav className="space-x-2 flex items-center">
        <Link href="/blog">
          <Button variant="outline">{t("nav.blog")}</Button>
        </Link>
        <LocaleSwitcher />
        <Link href="/cart">
          <Button variant="outline">{t("nav.cart")}</Button>
        </Link>
        <Link href="/login">
          <Button>{t("nav.login")}</Button>
        </Link>
      </nav>
    </header>
  );
}
