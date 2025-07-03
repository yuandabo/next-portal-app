// import LangSwitch from "@/components/LangSwitch";
// import { useTranslations } from "next-intl";

// export default function Home({
//   messages,
// }: {
//   messages: Record<string, string>;
// }) {
//   const t = useTranslations("Home");
//   return (
//     <div>
//       <h1>{t("title")}</h1>
//       <p>{t("description")}</p>
//       <LangSwitch />
//       {JSON.stringify(messages)}
//     </div>
//   );
// }


import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
 
export default function HomePage() {
  const t = useTranslations('home');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}