import React, { useState, useEffect, useContext } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { useRouter } from 'next/router';
import { GoogleLogin } from 'react-google-login';

// import FBLogin from 'react-facebook-login'
import KakaoLogin from 'react-kakao-login';

// 컴포넌트 import
import { LoginInfoPopup } from './Login_Info_Popup';
// import '../../../styles/App.css';

// hooks&&reducer
import Modal from '@utils/Modal';
import { useUrlMove } from '@hooks/useUrlMove';
import { LangLogin, socialLogin } from '@language/Lang.Login';
import { ProgressSmall } from '@utils/LoadingProgress';
import { LanguageContext, AppDataContext } from '@store/App_Store';
import { useModal } from '@hooks/useModal';
import useAxiosFetch from '@hooks/useAxiosFetch';
import useForm from '@hooks/useForm';
import { useCookie } from '@hooks/useCookie';

export const SignIn = (props) => {
  const { setChangePage } = props;
  const router = useRouter();
  const { main } = router.query;
  const { langState } = useContext(LanguageContext);
  const { setLoginOn } = useContext(AppDataContext);
  const [errorTitle, setErrorTitle] = useState();
  const [goURL] = useUrlMove();
  const [_isShowing, _toggle] = useModal();

  //cookie
  const [, cookieHandle] = useCookie();
  const [cookieValue, getCookie] = useCookie();
  const [testValue, getTestCookie] = useCookie();

  // 로그인 에러
  // fetch
  const [snsLoginListLoding, snsLoginListApi, snsLoginListError, snsLoginFetch] = useAxiosFetch();

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { idPlaceHolder, pwPlaceHolder, loginButton, signUpButton, snsLoginDesc, loginFailHolder, leaveUser, lostPassword, backLogin } = LangLogin;
  const { googleAccount, facebookAccount, kakaoAccount, loginErr } = socialLogin;
  const _idPlaceHolder = idPlaceHolder[selectedLanguage] || idPlaceHolder[defaultLanguage],
    _pwPlaceHolder = pwPlaceHolder[selectedLanguage] || pwPlaceHolder[defaultLanguage],
    _loginButton = loginButton[selectedLanguage] || loginButton[defaultLanguage],
    _signUpButton = signUpButton[selectedLanguage] || signUpButton[defaultLanguage],
    _snsLoginDesc = snsLoginDesc[selectedLanguage] || snsLoginDesc[defaultLanguage],
    _loginFailHolder = loginFailHolder[selectedLanguage] || loginFailHolder[defaultLanguage],
    _googleAccount = googleAccount[selectedLanguage] || googleAccount[defaultLanguage],
    _facebookAccount = facebookAccount[selectedLanguage] || facebookAccount[defaultLanguage],
    _kakaoAccount = kakaoAccount[selectedLanguage] || kakaoAccount[defaultLanguage],
    _loginErr = loginErr[selectedLanguage] || loginErr[defaultLanguage],
    _leaveUser = leaveUser[selectedLanguage] || leaveUser[defaultLanguage],
    _lostPassword = lostPassword[selectedLanguage] || lostPassword[defaultLanguage],
    _backLogin = backLogin[selectedLanguage] || backLogin[defaultLanguage];

  // sns 로그인 통신
  const responseSuccess = (res, type) => {
    snsLoginFetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/snsLogin`, 'post', {
      snsData: res,
      snsType: type,
      userLang: defaultLanguage,
    });
  };

  const responseFail = (err) => {
    if (!err) return;
    if (err.error === 'idpiframe_initialization_failed') return;
    alert(_loginErr);
  };

  // 로그인
  const [values, handleChange, handleSubmit, disabled, resData, errors] = useForm({
    initialValues: { type: 'signIn', email: '', userPw: '' },
  });

  const errorHandle = () => {
    if (Object.keys(errors).length === 0) return;
    if (errors === 'incorrect') {
      setErrorTitle(_loginFailHolder);
    } else if (errors === 'leave') {
      setErrorTitle(_leaveUser);
    } else {
      alert('login error');
    }
  };

  useEffect(() => {
    const mergyData = resData || snsLoginListApi;
    if (mergyData?.result === 'ok') {
      getTestCookie('CREATE', 'test', 'ss', 1);
      getCookie('GET', 'access_token')
      setLoginOn(true);
      localStorage.setItem('loginOn', true);
      localStorage.setItem('userNick', mergyData?.nick);
      localStorage.setItem('userid', mergyData?.screenId);
      goURL({ pathname: '/' });
    } else {
      getCookie('GET', 'access_token')
      if(cookieValue){
        goURL({ pathname: '/' });
      } else return;
    }
  }, [resData, snsLoginListApi, cookieValue, testValue]);

  useEffect(() => {
    errors && errorHandle();
  }, [errors]);

  return (
    <>
      <LoginBox>
        <LoginInner>
          <LoginHeader styling={main}>
            {main ? (
              <>
                <BackIconAnchor onClick={() => router.back()}>
                  <PureBackIcon />
                </BackIconAnchor>
                <SubTitle>{_backLogin}</SubTitle>
              </>
            ) : (
              <>
                <LoginLogo />
                <LoginTitle>{'Welcome to EpicLogue'}</LoginTitle>
              </>
            )}
          </LoginHeader>
          <FormInner>
            {/* 로그인 찾기 */}
            <LostLogin onClick={_toggle}>{_lostPassword}</LostLogin>

            <form action="" method="post" onSubmit={handleSubmit}>
              <UserEmailInput name="email" onChange={handleChange} placeholder={_idPlaceHolder} />
              <UserPwInput name="userPw" onChange={handleChange} placeholder={_pwPlaceHolder} />
              <PlaceHolderBox>
                <PlaceHolderTxt>{errorTitle}</PlaceHolderTxt>
              </PlaceHolderBox>
              <LoginButton login={values.userPw.length} userPw={values.userPw} email={values.email} disabled={disabled}>
                {disabled ? <ProgressSmall disabled={disabled} /> : _loginButton}
              </LoginButton>
            </form>
          </FormInner>
          <SignUpEtcBtn>
            <SignUpButton onClick={() => setChangePage(true)}>{_signUpButton}</SignUpButton>
            <Dummy />
            <SubTitle>SNS Login</SubTitle>

            <LogingWrap>
              <GoogleButton name="google" clientId={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} onSuccess={(res) => responseSuccess(res, 'google')} onFailure={responseFail} />
              <GoogleStyle>{_googleAccount}</GoogleStyle>
            </LogingWrap>
            {/* <LogingWrap>
            <FBLogin
              appId={process.env.REACT_APP_FACEBOOK_API_KEY}
              autoLoad={false}
              fields="name, first_name, last_name, email"
              callback={res => responseSuccess(res, 'facebook')}
              cssClass={'facebook'}
              
            /> 

            </LogingWrap> */}
            {/* <LogingWrap>
            <KakaoLog
              token={process.env.REACT_APP_KAKAO_API_KEY}
              onSuccess={res => responseSuccess(res, 'kakao')}
              onFailure={responseFail}
              getProfile={true}
            />
            <KakaoStyle>{_kakaoAccount}</KakaoStyle>
            </LogingWrap> */}
            <AgreeCheck>{_snsLoginDesc}</AgreeCheck>
          </SignUpEtcBtn>
        </LoginInner>
      </LoginBox>
      {_isShowing && (
        <Modal visible={Boolean(_isShowing)} closable={true} maskClosable={true} onClose={() => _toggle(false)}>
          <LoginInfoPopup handleModal={_toggle} />
        </Modal>
      )}
    </>
  );
};

/* 로그인 애니메이션 */

const BtnAnimation = keyframes`
  0% {
    opacity:0.3;
  }
  100%{
    opacity:1;
  }`;

/* 로그인 레이아웃 */

// 공통
const TextCommon = css`
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
`;

//로그인 레이아웃
const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 480px;
  height: auto;
  background: ${(props) => props.theme.color.whiteColor};
  opacity: 0.95;
  @media (max-width: 900px) {
    max-width: 100%;
    height: auto;
    border-radius: 0;
  }
`;
const LoginInner = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  width: 360px;
  height: 100%;
  padding: 20px;
  @media (max-width: 900px) {
    justify-content: initial;
  }
`;
const FormInner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  width: 100%;
`;

//로그인 제목 타이틀
const LoginHeader = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: ${(props) => (props.styling ? 'flex-start' : 'center')};
  width: 100%;
  margin: 0.2em 0;
`;
const LoginTitle = styled.h1`
  margin-right: 10px;
  color: ${(props) => props.theme.color.placeHolderColor};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  font-size: ${(props) => props.theme.fontSize.font18};
  user-select: none;
`;
const LoginLogo = styled.svg`
  background: url('/static/Logo.svg') no-repeat center center / contain;
  width: 48px;
  height: 48px;
  margin-right: 8px;
  user-select: none;
`;

const UserEmailInput = styled.input.attrs({
  type: 'email',
})`
  width: 100%;
  height: 46px;
  padding-left: 8px;
  margin-bottom: 6px;
  ${TextCommon};
  border: 2px solid ${(props) => props.theme.color.hoverColor};
  border-radius: 8px;
  transition: all 0.2s ease;
  &::placeholder {
    color: ${(props) => props.theme.color.softBlackColor};
    font-size: ${(props) => props.theme.fontSize.font14};
    font-weight: ${(props) => props.theme.fontWeight.font700};
  }
  &:focus {
    border-color: ${(props) => props.theme.color.softOrangeColor};
  }
`;
const UserPwInput = styled(UserEmailInput).attrs({
  type: 'password',
})`
  margin-bottom: 8px;
`;

// 뒤로가기
const BackIconAnchor = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 18px 8px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
`;
const PureBackIcon = styled.span`
  display: flex;
  width: 0.9em;
  height: 0.9em;
  border-top: 3px solid ${(props) => props.theme.color.darkGray};
  border-right: 3px solid ${(props) => props.theme.color.darkGray};
  -webkit-transform: rotate(225deg);
  transform: rotate(225deg);
  margin-left: 0.3em;
`;
// 로그인 찾기
const LostLogin = styled.button.attrs({ type: 'button' })`
  position: absolute;
  bottom: 32px;
  right: 6px;
  font-size: ${(props) => props.theme.fontSize.font13};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  padding-bottom: 2px;
  margin-bottom: 18px;
  cursor: pointer;
  color: ${(props) => props.theme.color.orangeColor};
  border-bottom: 2px solid ${(props) => props.theme.color.softOrangeColor};
  user-select: none;
`;

// 로그인 버튼

const LostLoginWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LoginButton = styled.button.attrs((props) => ({
  type: props.login > 7 && props.userPw !== '' && props.email !== '' ? 'submit' : 'button',
}))`
  width: 100%;
  height: 38px;
  border-radius: 25px;
  margin-top: 34px;
  opacity: 0.3;
  background: ${(props) => props.theme.color.skyColor};
  animation: ${(props) => (props.login > 7 && props.userPw !== '' && props.email !== '' ? BtnAnimation : '')} 0.3s ease forwards;
  pointer-events: ${(props) => (props.login > 7 && props.userPw !== '' && props.email !== '' ? 0 : 'none')};
  cursor: ${(props) => (props.login > 7 && props.userPw !== '' && !props.disabled ? 'pointer' : 'none')};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.whiteColor};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  user-select: none;
`;
// 로그인 공통 CSS
const LoginBtn = css`
  display: flex !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 25px !important;
  opacity: 0 !important;
  cursor: pointer;
  z-index: 999;
`;

//  구글 로그인
const GoogleStyle = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.darkGray};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  background: ${(props) => props.theme.color.whiteColor};
  box-shadow: ${(props) => props.theme.boxshadow.popup};
  border-radius: 25px;
  cursor: pointer;
  &::before {
    content: '';
    display: inline-block;
    background: url('/static/google-icon.svg') no-repeat center center / contain;
    width: 1.4em;
    height: 1.4em;
    margin-right: 0.5em;
  }
`;
const GoogleButton = styled(GoogleLogin)`
  ${LoginBtn};
`;
// 페이스북 로그인
//App.css에서 작업
// 카카오 로그인
const KakaoLog = styled(KakaoLogin)`
  ${LoginBtn};
`;
const KakaoStyle = styled(GoogleStyle)`
  font-size: ${(props) => props.theme.fontSize.font15};
  color: #3b1e1e;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  background: #ffe812;
  &::before {
    background: url('/static/kakao-icon.svg') no-repeat center center / contain;
    width: 1.4em;
    height: 1.4em;
    margin-right: 0.5em;
  }
`;

// 경고 플레이스 홀더
const PlaceHolderBox = styled.div`
  display: flex;
  width: 100%;
  margin-left: 3px;
  margin-bottom: 10px;
  transition: all 0.2s ease;
`;
const PlaceHolderTxt = styled.div`
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.pinkColor};
  font-size: ${(props) => props.theme.fontSize.font13};
`;

// 회원가입 버튼 부문
const SignUpEtcBtn = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  @media (max-width: 900px) {
    max-width: 408px;
    align-items: center;
  }
`;

const SignUpButton = styled.button.attrs({
  type: 'button',
})`
  width: 100%;
  height: 38px;
  border-radius: 25px;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.whiteColor};
  margin-top: 6px;
  background: ${(props) => props.theme.color.orangeColor};
  cursor: pointer;
  user-select: none;
`;
// API 로그인 부문
const Dummy = styled.div`
  width: 100%;
  border-radius: 30px;
  margin: 16px 0;
  border-bottom: 3px solid ${(props) => props.theme.color.hoverColor};
`;
const SubTitle = styled.span`
  text-align: center;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.blackOpacity};
  font-size: ${(props) => props.theme.fontSize.font15};
`;

const GoogleLog = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 8px 0;
  cursor: pointer;
`;

const LogingWrap = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 38px;
  margin: 1em 0;
`;

const AgreeCheck = styled.span`
  text-align: center;
  font-weight: ${(props) => props.theme.fontWeight.font500};
  line-height: 20px;
  margin: 10px 0;
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font14};
`;
