"use client";

import useSWR from "swr";

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ProductDetailClient({
  fallbackData,
}: {
  fallbackData: Product;
}) {
  console.log("fallbackData", fallbackData);

  const { data, isLoading } = useSWR(
    `/api/product/${fallbackData.slug}`,
    fetcher,
    {
      fallbackData,
      refreshInterval: 60000, // 每 60 秒自动刷新
    }
  );

  console.log("data", data);

  if (isLoading) return <p className="p-4">加载中...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={data.image}
        alt={data.name}
        className="w-full aspect-square object-cover rounded"
      />
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p className="text-gray-600">{data.description}</p>
        <p className="text-lg font-semibold text-red-500">¥ {data.price}</p>
        <p className="text-sm text-gray-500">
          库存：{data.stock > 0 ? `${data.stock} 件` : "已售罄"}
        </p>
        <button
          className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          disabled={data.stock <= 0}
        >
          加入购物车
        </button>
      </div>
    </div>
  );
}
