// src/app/api/cart/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const auth = request.headers.get("Authorization");

  if (!auth || !auth.startsWith("Bearer")) {
    return new NextResponse("未授权", { status: 401 });
  }

  const mockCart = [
    { id: "p1", name: "商品 A", price: 100, quantity: 2 },
    { id: "p2", name: "商品 B", price: 150, quantity: 1 },
  ];

  return NextResponse.json(mockCart, {
    headers: { "Cache-Control": "no-store" },
  });
}
