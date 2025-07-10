// src/app/[locale]/login/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (!username) return;

    // 假设 token 为 user-token，也可以调用 API 获取
    Cookies.set("auth_token", "user-token", { expires: 7 });

    // 跳回来源路径
    const redirectTo = searchParams.get("redirect") || "/";
    router.push(redirectTo);
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded space-y-4">
      <h1 className="text-xl font-bold">登录</h1>
      <input
        type="text"
        className="border px-3 py-2 w-full"
        placeholder="请输入用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 text-white py-2 rounded"
        onClick={handleLogin}
      >
        登录
      </button>
    </div>
  );
}
