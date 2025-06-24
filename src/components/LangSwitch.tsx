// src/app/components/LanguageSwitcher.tsx
"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setCookie } from "cookies-next";

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      setCookie("NEXT_LOCALE", nextLocale);
      router.refresh(); // 刷新页面以应用新语言
    });
  };

  return (
    <label>
      <span className="sr-only">Change language</span>
      <select defaultValue="en" onChange={onSelectChange} disabled={isPending}>
        <option value="en">English</option>
        <option value="zh">zh</option>
      </select>
    </label>
  );
}
