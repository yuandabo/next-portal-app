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
import {use} from 'react';
import {setRequestLocale,getTranslations} from 'next-intl/server';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {
  const {locale} = await params;  
  const t = await getTranslations({locale, namespace: 'home'});
 
  return {
    title: t('title')
  };
}
export default function HomePage({params}:{params:Promise<{locale:string}>}) {
  const {locale} = use(params);
  
  // Enable static rendering
  setRequestLocale(locale);
  const t = useTranslations('home');

  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}