import React, { useContext } from 'react';
import styled from 'styled-components';

// Hooks&&reducer import
import { useUrlMove } from '@hooks/useUrlMove';
import { LanguageContext } from '@store/App_Store';
import { unAuthLang } from '@language/Lang.Common';

//utils
import { popupAni } from '@utils/popupAnimation';

export default function UnauthLogin(props) {
  const { setUnAuth } = props;
  const [goURL] = useUrlMove();

  const { langState } = useContext(LanguageContext);
  //μΈμ΄ λ³μ
  const { selectedLanguage, defaultLanguage } = langState;

  const { unAuthTitle, unAuthSub, unAuthLogin, unAuthSignUp } = unAuthLang;
  const _unAuthTitle = unAuthTitle[selectedLanguage] || unAuthTitle[defaultLanguage],
    _unAuthSub = unAuthSub[selectedLanguage] || unAuthSub[defaultLanguage],
    _unAuthLogin = unAuthLogin[selectedLanguage] || unAuthLogin[defaultLanguage],
    _unAuthSignUp = unAuthSignUp[selectedLanguage] || unAuthSignUp[defaultLanguage];
  return (
    <Layout>
      <LayoutInner>
        <HeaderTxt>π{_unAuthTitle}π</HeaderTxt>
        <SubTxt>{_unAuthSub}</SubTxt>
        <LoginButton
          onClick={() => {
            goURL({ pathname: '/login', as: '/login', query: { main: true } });
            setUnAuth(false);
          }}
        >
          {_unAuthLogin}
        </LoginButton>
        <SignUpButton
          onClick={() => {
            goURL({ pathname: '/login', as: '/login', query: { sign: true } });
            setUnAuth(false);
          }}
        >
          {_unAuthSignUp}
        </SignUpButton>
      </LayoutInner>
    </Layout>
  );
}

const Layout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 30em;
  width: calc(100% - 4em);
  background: ${(props) => props.theme.color.whiteColor};
  border-radius: 0.4em;
  overflow: hidden;
  animation: ${popupAni} 0.3s ease-in-out normal;

  @media (max-width: 900px) {
    width: calc(100% - 3em);
  }
`;
const LayoutInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 3em;
  @media (max-width: 900px) {
    padding: 1.5em;
  }
`;
const HeaderTxt = styled.h1`
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  margin-bottom: 1em;
  line-height: 1.2em;
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font15};
  }
`;

const SubTxt = styled.h2`
  color: ${(props) => props.theme.color.softBlackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  margin-bottom: 1.5em;
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font14};
  }
`;
const LoginButton = styled.button`
  width: 100%;
  padding: 0.6em 0;
  border: 1px solid ${(props) => props.theme.color.softBlackColor};
  border-radius: 2em;
  color: ${(props) => props.theme.color.softBlackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  margin: 0.3em 0;
  cursor: pointer;
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font14};
  }
`;
const SignUpButton = styled(LoginButton)`
  color: ${(props) => props.theme.color.whiteColor};
  border: 1px solid ${(props) => props.theme.color.orangeColor};
  background: ${(props) => props.theme.color.orangeColor};
`;
