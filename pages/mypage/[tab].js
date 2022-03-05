import React from 'react';
import Mypage from '@component/mypage/Mypage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function MypagePage() {
  return <Mypage />;
}

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      lang: locale,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};
