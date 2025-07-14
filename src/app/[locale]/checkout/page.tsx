// src/app/[locale]/checkout/page.tsx
import { CheckoutForm } from "@/components/CheckoutForm";
import { useTranslations } from "next-intl";

export default function CheckoutPage() {
  const t = useTranslations("checkout");

  return (
    <main className="px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">{t("title")}</h1>
      <CheckoutForm />
    </main>
  );
}
