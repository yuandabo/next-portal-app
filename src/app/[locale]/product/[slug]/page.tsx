// src/app/[locale]/product/[slug]/page.tsx
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(
    `/api/product/${slug}`,
    { cache: "no-store" } // SSR 强制实时
  );

  if (!res.ok) notFound();

  const data = await res.json();

  return <ProductDetailClient fallbackData={data} />;
}
