// src/app/[locale]/orders/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Order = {
  id: string;
  createdAt: string;
  total: number;
  items: { name: string; quantity: number }[];
};

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) redirect("/login?redirect=/orders");

  // 模拟 SSR 请求用户订单数据
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("获取订单失败");
  }

  const orders: Order[] = await res.json();

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">我的订单</h1>
      {orders.length === 0 ? (
        <p>暂无订单</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border rounded p-4 space-y-2">
              <div className="text-sm text-gray-500">
                订单号：{order.id}｜下单时间：
                {new Date(order.createdAt).toLocaleString()}
              </div>
              <ul className="pl-4 list-disc text-sm text-gray-700">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
              <div className="text-right font-bold text-blue-600">
                总计 ¥{order.total}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
