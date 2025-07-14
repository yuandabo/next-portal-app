// src/app/[locale]/page.tsx
import { LandingHeader } from "@/components/LandingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useTranslations } from "next-intl";
export default function HomePage() {
  const t = useTranslations();
  const categories = [
    {
      slug: "clothes",
      name: "服饰",
      image: "https://placehold.co/300x300?text=服饰",
    },
    {
      slug: "electronics",
      name: "电子产品",
      image: "https://placehold.co/300x300?text=电子",
    },
    {
      slug: "books",
      name: "图书",
      image: "https://placehold.co/300x300?text=图书",
    },
  ];

  return (
    <div>
      <LandingHeader />

      <section className="text-center py-12 px-4 bg-gradient-to-b from-gray-100 to-white">
        <h1 className="text-4xl font-bold mb-4">{t("homepage.title")}</h1>
        <p className="text-gray-600 mb-6">{t("homepage.subtitle")}</p>
        <Link href="/category/clothes">
          <Button size="lg">{t("homepage.cta")}</Button>
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">热门分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-2">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="rounded mb-2 aspect-square object-cover"
                  />
                  <h3 className="text-center font-medium">{cat.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-6 border-t">
        © 2025 NextShop 电商平台
      </footer>
    </div>
  );
}
