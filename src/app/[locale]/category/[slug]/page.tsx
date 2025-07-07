"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { fetcher } from "@/lib/fetcher";
import type { Category } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
// import { Metadata } from "next";

function ProductCardSkeleton() {
  return (
    <div className="border rounded p-2 space-y-2">
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: string; slug: string }>;
// }): Promise<Metadata> {
//   const { slug } = await params;
//   return {
//     title: `${slug} | My Shop`,
//     description: `Browse ${slug} products`,
//   };
// }

// export const dynamicParams = true; // 支持动态路由
// export const revalidate = 60; // ISR: 页面每 60 秒重新生成
// export const dynamic = "force-static"; // 强制静态生成（避免默认变成动态）

// // 获取所有静态路径
// export async function generateStaticParams() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`);
//   const categories: { slug: string }[] = await res.json();

//   const locales = ["en", "zh"]; // 与 next.config.ts 中的 i18n 配置一致

//   return categories.flatMap((category) =>
//     locales.map((locale) => ({
//       locale,
//       slug: category.slug,
//     }))
//   );
// }

export default function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const { slug } = useParams<{ slug: string }>();
  const t = useTranslations("category");

  const { data, error, isLoading } = useSWR<Category>(
    `/api/category/${slug}?lang=${locale}`,
    fetcher
  );

  //   if (isLoading) return <p className="p-4">{t("loading")}</p>;
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  if (error || !data) return <p className="p-4 text-red-500">{t("error")}</p>;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
      {data.description && (
        <p className="text-gray-600 mb-6">{data.description}</p>
      )}

      {data.products.length === 0 ? (
        <p>{t("noProducts")}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.products.map((p) => (
            <Link
              key={p.id}
              href={`/${locale}/product/${p.slug}`}
              className="block border rounded hover:shadow p-2"
            >
              <Image
                src={p.image}
                alt={p.name}
                width={300}
                height={300}
                className="rounded mb-2 object-cover w-full h-auto aspect-square"
              />
              <h3 className="font-medium">{p.name}</h3>
              <p className="text-sm text-gray-500">${p.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
