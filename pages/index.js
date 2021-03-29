import Main from '@component/main/Main';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function MainPage({lang}) {
  return <Main metaLang={lang} />;
}

export const getServerSideProps = async ({ locale }) => {
  return{
    props : {
      lang:locale,
      ...await serverSideTranslations(locale, ["common"])
    },
  }
};