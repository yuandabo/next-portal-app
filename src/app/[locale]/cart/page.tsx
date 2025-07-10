// src/app/[locale]/cart/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CartClientPage } from "@/components/CartClientPage";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/login?redirect=/cart");

  // 模拟根据 token 获取用户购物车
  const cartRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await cartRes.json();

  return <CartClientPage fallbackData={data} />;
}
