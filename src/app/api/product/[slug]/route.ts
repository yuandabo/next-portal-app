// src/app/api/product/[slug]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> } // 使用 Promise 包装参数
) {
  const { slug } = await params;

  const mockProduct = {
    id: slug,
    slug,
    name: `商品 ${slug}`,
    description: `这是 ${slug} 的详细介绍`,
    image: `https://placehold.co/500x500?text=${slug}`,
    price: 199,
    stock: Math.floor(Math.random() * 10), // 随机库存
  };

  return NextResponse.json(mockProduct, {
    headers: { "Cache-Control": "no-store" },
  });
}
