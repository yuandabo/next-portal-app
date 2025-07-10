// src/app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("Authorization");

  if (!auth || !auth.startsWith("Bearer")) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  // 模拟订单列表
  const orders = [
    {
      id: "order_1001",
      createdAt: new Date().toISOString(),
      total: 348,
      items: [
        { name: "T恤", quantity: 2 },
        { name: "牛仔裤", quantity: 1 },
      ],
    },
    {
      id: "order_1002",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      total: 199,
      items: [{ name: "耳机", quantity: 1 }],
    },
  ];

  return NextResponse.json(orders, {
    headers: { "Cache-Control": "no-store" },
  });
}
