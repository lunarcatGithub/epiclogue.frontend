import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

// 컴포넌트 import
import ServicePolicy from './Policy__Service_Terms';
import PrivacyPolicy from './Policy__Privacy';
import Community from './Policy__Community';
import Advertising from './Policy__Advertising';
import Copyright from './Policy__Copyright';
import { PolicyMain, PolicyFooter } from '@language/Policy/Lang.PolicyMain';

// hooks&&reducer
import { LanguageContext } from '@store/App_Store';
import { useUrlMove } from '@hooks/useUrlMove';

const EpicloguePolicy = () => {
  const [goURL] = useUrlMove();
  const router = useRouter();
  const { tab } = router.query;

  const { langState } = useContext(LanguageContext);
  const [sideHeader, setSideHeader] = useState();
  const [sideColor, setSideColor] = useState();

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { poliService, poliPrivate, poliCommunity, poliAdvertising, poliCopyright, serviceTerm, privacyPoli, CopyrightPoli } = PolicyMain;
  const { manageNote, developNote, howToUse, copyReport } = PolicyFooter;

  // 상단 탭
  const _poliService = poliService[selectedLanguage] || poliService[defaultLanguage],
    _poliPrivate = poliPrivate[selectedLanguage] || poliPrivate[defaultLanguage],
    _poliCommunity = poliCommunity[selectedLanguage] || poliCommunity[defaultLanguage],
    _poliAdvertising = poliAdvertising[selectedLanguage] || poliAdvertising[defaultLanguage],
    _poliCopyright = poliCopyright[selectedLanguage] || poliCopyright[defaultLanguage],
    _serviceTerm = serviceTerm[selectedLanguage] || serviceTerm[defaultLanguage],
    _privacyPoli = privacyPoli[selectedLanguage] || privacyPoli[defaultLanguage],
    _CopyrightPoli = CopyrightPoli[selectedLanguage] || CopyrightPoli[defaultLanguage],
    // 푸터
    _manageNote = manageNote[selectedLanguage] || manageNote[defaultLanguage],
    _developNote = developNote[selectedLanguage] || developNote[defaultLanguage],
    _howToUse = howToUse[selectedLanguage] || howToUse[defaultLanguage],
    _copyReport = copyReport[selectedLanguage] || copyReport[defaultLanguage];

  const list = [
    { id: 1, title: 'service', component: <ServicePolicy /> },
    { id: 2, title: 'private', component: <PrivacyPolicy /> },
    { id: 3, title: 'community', component: <Community /> },
    { id: 4, title: 'advertising', component: <Advertising /> },
    { id: 5, title: 'copyright', component: <Copyright /> },
  ];

  const linkArr = [
    { id: 1, title: _poliService, link: '/policy/service', query: 'service', color: '#F3BD60' },
    { id: 2, title: _poliPrivate, link: '/policy/private', query: 'private', color: `rgba(247, 112, 143, 1)` },
    { id: 3, title: _poliCommunity, link: '/policy/community', query: 'community', color: `#358786` },
    { id: 4, title: _poliAdvertising, link: '/policy/advertising', query: 'advertising', color: `#986444` },
    { id: 5, title: _poliCopyright, link: '/policy/copyright', query: 'copyright', color: `rgba(73, 173, 239, 1)` },
  ];

  useEffect(() => {
    switch (tab) {
      case 'service':
        setSideHeader(_serviceTerm);
        setSideColor('#222');
        break;
      case 'private':
        setSideHeader(_privacyPoli);
        setSideColor('#222');
        break;
      case 'community':
        setSideHeader(_poliCommunity);
        setSideColor('#222');
        break;
      case 'advertising':
        setSideHeader(_poliAdvertising);
        setSideColor('#222');
        break;
      case 'copyright':
        setSideHeader(_CopyrightPoli);
        setSideColor('#222');
        break;
      default:
    }
  }, [tab]);

  return (
    <PolicyLayout>
      <HeaderWrap>
        {/* 상단 헤더 */}
        <TabWrap>
          {linkArr.map(({ id, title, link, query, color }) => (
            <NavItem key={id} onClick={() => goURL({ pathname: link, as: link, query })}>
              <ServiceTab styling={tab === query && color}>{title}</ServiceTab>
            </NavItem>
          ))}
        </TabWrap>
        {/* // 상단 헤더 끝 */}
      </HeaderWrap>
      {/* 사이드 헤더 */}
      <SideHeader>
        <SideHeaderTxt>EpicLogue {sideHeader}</SideHeaderTxt>
        <EpicImg />
      </SideHeader>
      {/* // 사이드 헤더 끝 */}

      <PolicyInner>
        {list.map(({ id, title, component }) => title === tab && <ComponentWrap key={id}>{component}</ComponentWrap>)}
        {/* // 본문 영역 끝 */}
        <FooterLayout>
          {/*  footer 시작 */}
          <FooterInner>
            <FooterTxtWrap>
              <FooterTxtInner>
                <FooterTitle>Visit</FooterTitle>
                <FooterTxt>경남 창원시 창원대학로 20-1 동백관(3호관) 4층 416호</FooterTxt>
              </FooterTxtInner>
              <FooterTxtInner>
                <FooterTitle>Contact us</FooterTitle>
                <FooterTxt> support@epiclogue.com</FooterTxt>
                <FooterTxtLink onClick={() => window.open('https://twitter.com/epiclogue_lunar', '_blank')}> 문의하기 </FooterTxtLink>
              </FooterTxtInner>
            </FooterTxtWrap>
            <FooterTxtWrap>
              <FooterTxtInner>
                <FooterTitle>News</FooterTitle>
                <FooterTxtLink>{_manageNote}</FooterTxtLink>
                <FooterTxtLink>{_developNote}</FooterTxtLink>
              </FooterTxtInner>
            </FooterTxtWrap>
            <FooterTxtWrap>
              <FooterTxtInner>
                <FooterTitle>Follow</FooterTitle>
                <FooterTxtLink>instagram</FooterTxtLink>
                <FooterTxtLink onClick={() => window.open('https://twitter.com/epiclogue_lunar', '_blank')}>twitter</FooterTxtLink>
                <FooterTxtLink>facebook</FooterTxtLink>
              </FooterTxtInner>
            </FooterTxtWrap>
            <FooterTxtWrap>
              <FooterTxtInner>
                <FooterTitle>Legal</FooterTitle>
                <FooterTxtLink>{_howToUse}</FooterTxtLink>
                {/* <FooterTxtLink>정책정보</FooterTxtLink> */}
                {/* <FooterTxtLink>자주 묻는 질문</FooterTxtLink> */}
                <Link href={'/report'}>
                  <LinkStyle>
                    <FooterTxtLink>{_copyReport}</FooterTxtLink>
                  </LinkStyle>
                </Link>
              </FooterTxtInner>
            </FooterTxtWrap>
          </FooterInner>
          {/* // footer 끝 */}
        </FooterLayout>
        <CopyrightLayout>
          <CopyrightInner>
            <FooterTxt>Copyright 2020 Lunarcat. All Rights Reserved.</FooterTxt>
          </CopyrightInner>
        </CopyrightLayout>
      </PolicyInner>
    </PolicyLayout>
  );
};

/* 스타일링 시작 */
// 공통
const LinkStyle = styled.a`
  display: flex;
  width: 100%;
  justify-content: center;
`;
// 레이아웃
const PolicyLayout = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const PolicyInner = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
// 헤더

const HeaderWrap = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background: ${(props) => props.theme.color.whiteColor};
  z-index: 9999999;
  @media (max-width: 900px) {
    height: 52px;
  }
`;
// 헤더 - 로고
const LogoBtn = styled.button`
  display: flex;
  margin-left: 10px;
  padding: 10px 10px;
  cursor: pointer;
  @media (max-width: 900px) {
    display: none;
  }
`;
const HeaderLogo = styled.img`
  display: block;
  width: 38px;
  height: 38px;
`;
// 헤더 - 탭
const TabWrap = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  /* margin-right:20px; */
  overflow-x: auto;
  overflow-y: hidden;
`;
const ServiceTab = styled.button`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.styling && props.theme.fontWeight.font700};
  color: ${(props) => (props.styling ? props.styling : props.theme.color.softBlackColor)};

  white-space: nowrap;
  cursor: pointer;
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font14};
    font-weight: ${(props) => props.theme.fontWeight.font500};
    padding-top: 1.5em;
    padding-bottom: 1em;
    padding-left: 0;
  }
`;

const NavItem = styled.span`
  display: flex;
  margin: 0 12px;
`;

// 사이드 헤더
const SideHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding: 4em 0;
  margin-top: 2em;
  margin-bottom: 6px;
  background: ${(props) => props.theme.color.whiteColor};
  overflow: hidden;
  @media (max-width: 900px) {
  }
`;

const SideHeaderTxt = styled.span`
  position: relative;
  font-size: 2em;
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.darkGray};
  margin-left: 80px;
  &:after {
    position: absolute;
    top: 5px;
    left: -16px;
    display: block;
    content: '';
    width: 9px;
    height: 28px;
    background: ${(props) => props.theme.color.orangeColor};
  }
  @media (max-width: 900px) {
    margin-left: 28px;
    font-size: 1.4em;
    &:after {
      top: 0;
    }
  }
`;
const EpicImg = styled.svg`
  position: absolute;
  background: url('/static/test.svg') no-repeat center center / contain;
  right: 0;
  bottom: 0;
  width: 190px;
  height: 128px;
  margin-right: 180px;
  @media (max-width: 900px) {
    display: block;
    width: 160px;
    height: 100px;
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;
  }
`;

// 하단 footer
const FooterLayout = styled.section`
  width: 100%;
  height: auto;
  background: ${(props) => props.theme.color.darkGray};
  margin-top: 6px;
  border-bottom: 2px solid ${(props) => props.theme.color.softGrayColor};
`;
const FooterInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    align-items: baseline;
    padding: 0px;
  }
`;
const FooterTxtWrap = styled.div`
  max-width: 180px;
  padding: 14px 0;
  @media (max-width: 900px) {
    padding: 0px;
    width: 180px;
    margin-top: 20px;
  }
`;
const FooterTxtInner = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;
  @media (max-width: 900px) {
    margin-bottom: 6px;
    padding: 8px;
  }
`;

const FooterTitle = styled.button`
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.whiteColor};
  margin-bottom: 12px;
`;

const FooterTxt = styled.button`
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.whiteColor};
  margin-bottom: 7px;
`;
const FooterTxtLink = styled(FooterTxt)`
  cursor: pointer;
`;
// copyright 영역
const CopyrightLayout = styled.section`
  width: 100%;
  height: auto;
  background: ${(props) => props.theme.color.darkGray};
`;
const CopyrightInner = styled(FooterInner)`
  justify-content: flex-start;
  margin-left: 30px;
`;
const ComponentWrap = styled.div``;
export default EpicloguePolicy;
