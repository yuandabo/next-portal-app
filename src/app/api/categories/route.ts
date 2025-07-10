// src/app/api/category/[slug]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const mockData = {
    clothes: {
      slug,
      name: "服装类",
      products: [
        {
          id: "1",
          name: "T恤",
          price: 99,
          image: "https://placehold.co/300x300?text=T恤",
        },
        {
          id: "2",
          name: "牛仔裤",
          price: 149,
          image: "https://placehold.co/300x300?text=牛仔裤",
        },
      ],
    },
    electronics: {
      slug,
      name: "电子产品",
      products: [
        {
          id: "3",
          name: "耳机",
          price: 299,
          image: "https://placehold.co/300x300?text=耳机",
        },
        {
          id: "4",
          name: "手机",
          price: 1999,
          image: "https://placehold.co/300x300?text=手机",
        },
      ],
    },
  };

  const category = mockData[slug as keyof typeof mockData];

  if (!category)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(category, {
    headers: { "Cache-Control": "no-store" }, // 不缓存 API，ISR 由 page 控制
  });
}
