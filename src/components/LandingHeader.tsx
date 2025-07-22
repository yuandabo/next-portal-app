// src/components/LandingHeader.tsx
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { SignOutButton } from "./SignOutButton";
import { useSession } from "next-auth/react";
export function LandingHeader() {
  const t = useTranslations();
  const pathName = usePathname();
  const { data: session, status } = useSession();
  console.log("session", session);

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
        {status === "loading" ? (
          <span>加载中...</span>
        ) : session?.user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Hello, {session.user.name}</span>
            <SignOutButton />
          </div>
        ) : (
          <Link href={`/login?redirect=${pathName}`}>
            <Button>{t("nav.login")}</Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
