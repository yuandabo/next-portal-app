"use client";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
// import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authenticate } from "@/lib/actions";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <Card className="max-w-sm mx-auto mt-20">
      <CardContent className="space-y-4 p-6">
        <form action={formAction}>
          <Input name="username" placeholder="用户名" />
          <Button className="w-full" type="submit" disabled={isPending}>
            登录
          </Button>
          <input type="hidden" name="redirectTo" value={callbackUrl} />
        </form>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
