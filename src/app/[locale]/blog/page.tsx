// src/app/[locale]/blog/page.tsx
import { redirect } from "next/navigation";

export default function BlogRootPage() {
  redirect("/blog/1"); // 自动跳转默认 slug
}
