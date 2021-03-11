import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import qs from 'query-string';

// 컴포넌트 import
import { LanguageContext } from '.@store/App_Store';
import { authPage } from '@language/Lang.Login';
import { useUrlMove } from '@hooks/useUrlMove';

// Hooks&&reducer import
import useAxiosFetch from '@hooks/useAxiosFetch';

export function Auth() {
  const { langState } = useContext(LanguageContext);
  const [goURL] = useUrlMove();
  const [authState, setAuthState] = useState();

  //fetch
  const [authLoding, authApi, authError, authFetch] = useAxiosFetch();

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { authTitle, authSubTitle, authFailTitle, authFailSub, contact } = authPage;
  const _authTitle = authTitle[selectedLanguage] || authTitle[defaultLanguage],
    _authSubTitle = authSubTitle[selectedLanguage] || authSubTitle[defaultLanguage],
    _authFailTitle = authFailTitle[selectedLanguage] || authFailTitle[defaultLanguage],
    _authFailSub = authFailSub[selectedLanguage] || authFailSub[defaultLanguage],
    _contact = contact[selectedLanguage] || contact[defaultLanguage];

  useEffect(() => {
    const query = qs.parse(window.location.search);
    authFetch(`${process.env.API_URL}/auth/mailAuth`, 'get', null, null, { email: query.email, token: query.token });
  }, []);

  useEffect(() => {
    if (authApi?.result === 'ok') {
      setAuthState(true);
      setTimeout(() => {
        goURL({ pathname: '/login' });
      }, 3000);
    } else {
      setAuthState(false);
      setTimeout(() => {
        goURL({ pathname: '/login' });
      }, 3000);
    }
  }, [authApi]);

  return (
    <Layout>
      <LayoutInner>
        <HeaderTitle>{authState ? _authTitle : _authFailTitle}</HeaderTitle>
        <SubHdTitleBox>
          <TeleportEoji>🌀</TeleportEoji>
          <SubHdTitle>{authState ? _authSubTitle : _authFailSub}</SubHdTitle>
          <TeleportEoji>🌀</TeleportEoji>
        </SubHdTitleBox>
        {authState && (
          <SubHdTitleBox>
            <RocketIcon>🚀</RocketIcon>
            <RocketSecond>🚀</RocketSecond>
            <RocketThird>🚀</RocketThird>
          </SubHdTitleBox>
        )}
        {!authState && (
          <SubHdTitleBox>
            <ContactBtn onClick={() => window.open('https://twitter.com/epiclogue_lunar', '_blank')}>{_contact}</ContactBtn>
          </SubHdTitleBox>
        )}
      </LayoutInner>
    </Layout>
  );
}

// 공통
const twinkle = keyframes`
from {
    visibility:hidden;
}
to {
    visibility:visible;
    }
`;

const spin = keyframes`
from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
}
to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
}
`;

// 레이아웃
const Layout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 40px;
  padding: 10px;
`;

const LayoutInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: 100%;
  padding: 50px;
  background: ${(props) => props.theme.color.whiteColor};
  border: 4px solid #2222;
  user-select: none;
`;
const HeaderTitle = styled.h1`
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font26};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font20};
    white-space: nowrap;
  }
`;

const SubHdTitleBox = styled.div`
  display: flex;
  margin-top: 16px;
`;
const SubHdTitle = styled(HeaderTitle)`
  font-size: ${(props) => props.theme.fontSize.font20};
  margin: 2px 8px;
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font16};
    white-space: nowrap;
  }
`;
const TeleportEoji = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSize.font18};

  width: 25px;
  height: 25px;
  animation: ${spin} 2s linear infinite;
`;
const RocketIcon = styled.span`
  margin: 10px 10px 0 10px;
  font-size: ${(props) => props.theme.fontSize.font26};
  animation: ${twinkle} 3s 1.5s steps(2) infinite;
`;
const RocketSecond = styled(RocketIcon)`
  animation: ${twinkle} 3s 2s steps(2) infinite;
`;
const RocketThird = styled(RocketIcon)`
  animation: ${twinkle} 3s 2.5s steps(2) infinite;
`;

const ContactBtn = styled.button`
  padding: 12px 18px;
  border-radius: 8px;
  background: ${(props) => props.theme.color.orangeColor};
  color: ${(props) => props.theme.color.whiteColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  cursor: pointer;
`;
