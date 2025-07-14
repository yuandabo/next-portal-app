"use client";
type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
};

type Category = {
  slug: string;
  name: string;
  products: Product[];
};

import { useRouter } from "next/navigation";
import useSWR from "swr";

export function CategoryClientPage({
  fallbackData,
}: {
  fallbackData: Category;
}) {
  const router = useRouter();
  const { data } = useSWR(
    `/api/category/${fallbackData.slug}`,
    (url) => fetch(url).then((res) => res.json()),
    { fallbackData, refreshInterval: 30000 }
  );

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.products.map((p: Product) => (
          <div
            key={p.id}
            className="border p-3 rounded cursor-point"
            onClick={() => router.push(`/product/123`)}
          >
            <img
              src={p.image}
              alt={p.name}
              className="aspect-square w-full object-cover"
            />
            <h2 className="mt-2 text-sm">{p.name}</h2>
            <p className="text-xs text-gray-500">¥{p.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
