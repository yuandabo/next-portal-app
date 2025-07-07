// src/app/api/category/[slug]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string; locale: string }> }
) {
  const { slug } = await context.params;

  const mockCategory = {
    slug,
    name: `Mock 类目 ${slug}`,
    description: "示例类目描述",
    products: Array.from({ length: 6 }).map((_, i) => ({
      id: `${slug}-${i}`,
      name: `商品 ${i + 1}`,
      slug: `${slug}-product-${i + 1}`,
      image: `https://placehold.co/300x300?text=${slug}+${i + 1}`,
      price: 100 + i * 10,
    })),
  };

  return NextResponse.json(mockCategory);
}
