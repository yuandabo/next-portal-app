import LangSwitch from "@/components/LangSwitch";
import { useTranslations } from "next-intl";

export default function Home({
  messages,
}: {
  messages: Record<string, string>;
}) {
  const t = useTranslations("Home");
  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <LangSwitch />
      {JSON.stringify(messages)}
    </div>
  );
}
