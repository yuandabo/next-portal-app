// src/app/[locale]/category/[slug]/page.tsx
import { CategoryClientPage } from "@/components/CategoryClientPage";
import { notFound } from "next/navigation";

export const revalidate = 60; // 每 60 秒重新生成页面
export const dynamic = "force-static"; // 强制静态渲染（启用 ISR）

export function generateStaticParams() {
  const locales = ["zh", "en"];
  const slugs = ["clothes", "electronics", "books"];

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/category/${slug}`,
    {
      next: { revalidate: 60 }, // 配合 ISR：后端请求缓存 60s
    }
  );

  if (!res.ok) notFound();

  const data = await res.json();

  return <CategoryClientPage fallbackData={data} />;
}
