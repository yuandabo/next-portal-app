"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";

const phoneRegex = /^1[3-9]\d{9}$/;

export function CheckoutForm() {
  const t = useTranslations("checkout");
  const [submitted, setSubmitted] = useState(false);

  const FormSchema = z.object({
    name: z.string().min(1, t("errors.nameRequired")),
    address: z.string().min(1, t("errors.addressRequired")),
    phone: z.string().regex(phoneRegex, t("errors.phoneInvalid")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("表单提交成功:", data);
    setSubmitted(true);
  };

  if (submitted) {
    return <p className="text-green-600 text-center mt-10">{t("success")}</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto mt-10"
    >
      <div>
        <Label>{t("name")}</Label>
        <Input {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label>{t("address")}</Label>
        <Input {...register("address")} />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      <div>
        <Label>{t("phone")}</Label>
        <Input {...register("phone")} />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        {t("submit")}
      </Button>
    </form>
  );
}
