"use client";

import useSWR from "swr";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function CartClientPage({ fallbackData }: { fallbackData: CartItem[] }) {
  const { data: cartItems, isLoading } = useSWR("/api/cart", fetcher, {
    fallbackData,
  });

  if (isLoading) return <p className="p-4">加载中...</p>;

  const total = cartItems.reduce(
    (sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">购物车</h1>
      {cartItems.length === 0 ? (
        <p>购物车为空</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className="border p-3 rounded flex justify-between"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">数量：{item.quantity}</p>
              </div>
              <div>¥ {item.price * item.quantity}</div>
            </div>
          ))}
          <div className="text-right font-bold text-lg">总计：¥ {total}</div>
          <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            去结算
          </button>
        </div>
      )}
    </div>
  );
}
