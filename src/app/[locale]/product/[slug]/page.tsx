// src/app/[locale]/product/[slug]/page.tsx
import { notFound } from "next/navigation";
// import { ProductDetailClient } from "@/components/ProductDetailClient";
import Image from "next/image";
// import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
export const revalidate = 60; // 每 60 秒更新一次静态页
export async function generateStaticParams() {
  return [
    {
      slug: "1",
    },
  ];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/product/${slug}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) notFound();

  const product = await res.json();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
            <Separator />
            <p className="text-xl text-blue-600 font-semibold">
              ¥{product.price}
            </p>
            <p
              className={product.stock > 0 ? "text-green-500" : "text-red-500"}
            >
              {product.stock > 0 ? `库存：${product.stock} 件` : "缺货"}
            </p>
            <Button disabled={product.stock === 0}>加入购物车</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
