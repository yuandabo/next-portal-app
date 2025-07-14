// src/app/[locale]/login/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="max-w-sm mx-auto mt-20">
      <CardContent className="space-y-4 p-6">
        <Input
          placeholder="用户名"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button className="w-full" onClick={handleLogin}>
          登录
        </Button>
      </CardContent>
    </Card>
  );
}
