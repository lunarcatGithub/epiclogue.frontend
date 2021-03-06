import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

//component
import Contents from '@component/content/Contents';
import { Meta } from '@utils/MetaTags';

// Hooks&&reducer import
import { useUrlMove } from '@hooks/useUrlMove';
import { AppDataContext } from '@store/App_Store';

const Main = ({ metaLang }) => {
  const { loginOn, setUnAuth } = useContext(AppDataContext);
  const [goURL] = useUrlMove();
  const { t } = useTranslation('common');

  // Meta 전용
  const metaData = {
    title: t('metaMainTitle'),
    contentsTitle: t('metaContentTitle'),
    description: t('metaMainDesc'),
    image: ['https://www.epiclogue.com/static/Logo.svg'],
    canonical: ``,
    lang: metaLang,
  };

  return (
    <>
      <Meta meta={metaData} />
      <Layout>
        <TitleLayout>
        <Title>최신 작품</Title>
        </TitleLayout>
        <Contents type="MAIN" />
        {/*업로드 버튼*/}
        <UploadButton
          onClick={() => {
            if (!loginOn) {
              setUnAuth(true);
              return;
            } else {
              goURL({ pathname: '/upload', query: { _type: 'upload' } });
            }
          }}
        >
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
`;

const TitleLayout = styled.div`
padding:0 2em;
margin-top:4em;
@media (max-width:900px){
  padding:0 1em;
margin-top:2em;
}
`;

// title
const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSize.font26};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.darkGray};

  @media (max-width:900px){
  font-size: ${(props) => props.theme.fontSize.font20};
  }
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
