import React, {useContext, useEffect} from 'react';
import styled from 'styled-components';
import { useTranslation } from "next-i18next";
// import { useRouter } from 'next/router';

//component
import Contents from '@component/content/Contents';
import { Meta } from '@utils/MetaTags';

// Hooks&&reducer import
import { useUrlMove } from '@hooks/useUrlMove';
import { AppDataContext } from '@store/App_Store';

const Main = ({ metaLang }) => {
  // const router = useRouter();
  const { loginOn, setUnAuth } = useContext(AppDataContext);
  const [goURL] = useUrlMove();
  const { t } = useTranslation("common");

// useEffect(() => {
//   router.events.on('routeChangeComplete', console.log('test'));

// }, [])
  // Meta 전용
  const metaData = {
    title: t('metaMainTitle'),
    contentsTitle:t('metaContentTitle'),
    description: t('metaMainDesc'),
    image: ['https://www.epiclogue.com/static/Logo.svg'],
    canonical: ``,
    lang:metaLang
  };

  return (
    <>
      <Meta meta={metaData} />
      <Layout>
        <Contents type="MAIN" />
        {/*업로드 버튼*/}
        <UploadButton onClick={() => {
          if(!loginOn){
          setUnAuth(true);
          return;
        } else {
          goURL({ pathname: '/upload', query:{_type:'upload'} })
        }
          
          }}>
          <UploadSvg />
        </UploadButton>
      </Layout>
    </>
  );
};

//레이아웃
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;
`;

//  이미지 업로드 버튼
const UploadButton = styled.span`
  position: fixed;
  display: block;
  cursor: pointer;
  bottom: 5em;
  right: 5.5em;
  user-select: none;
  width: 70px;
  height: 70px;
  background: #fff;
  border-radius: 50%;
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  @media (max-width: 900px) {
    display: none;
  }
`;
const UploadSvg = styled.svg`
  background: url('/static/edit-On.svg') no-repeat center center / contain;
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 39px;
  height: 35.5px;
  @media (max-width: 900px) {
    width: 30px;
    height: 26px;
  }
`;

export default Main;
