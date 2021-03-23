import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useChange } from '@hooks/useChange';

// 컴포넌트 import
import { langSignInPopup } from '@language/Lang.Login';
import { LangCommon } from '@language/Lang.Common';
import { LanguageContext, AlertContext } from '@store/App_Store';
import { signUpError } from '@language/Lang.Login';
import useAxiosFetch from '@hooks/useAxiosFetch';

export const LoginInfoPopup = (props) => {
  const { handleModal } = props;

  const { alertState, alertPatch } = useContext(AlertContext);
  const { langState } = useContext(LanguageContext);

  const [values, handleChange] = useChange({ email: '' });
  const [errPlaceHolder, setErrPlaceHolder] = useState('');
  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { lostTitle, inputEmail, sendButton } = langSignInPopup;
  const { emailError, noEmail } = signUpError;

  const { closeBtn } = LangCommon;

  const _lostTitle = lostTitle[selectedLanguage] || lostTitle[defaultLanguage],
    _inputEmail = inputEmail[selectedLanguage] || inputEmail[defaultLanguage],
    _sendButton = sendButton[selectedLanguage] || sendButton[defaultLanguage],
    _closeBtn = closeBtn[selectedLanguage] || closeBtn[defaultLanguage],
    _emailError = emailError[selectedLanguage] || emailError[defaultLanguage],
    _noEmail = noEmail[selectedLanguage] || noEmail[defaultLanguage];
  // fetch
  const [pwLoding, pwApi, pwError, pwFetch] = useAxiosFetch();

  // 비밀번호 찾기
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email === null || values.email === '') {
      setErrPlaceHolder(_noEmail);
      return;
    }
    pwFetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/findPass`, 'post', { email: values }, null, null);
  };

  useEffect(() => {
    if (!pwApi) return;
    pwApi?.result === 'ok' && alertPatch({ type: 'SUCCESS_PWSEND', payload: true });
    handleModal(false);
  }, [pwApi]);

  return (
    <LoginInfoLayout>
      <LoginInfo onClick={() => handleModal(false)}>
        <LoginInfoInner onClick={(e) => e.stopPropagation()}>
          <LoginInfoTitle>{_lostTitle}</LoginInfoTitle>
          <LoginMailForm action="" method="post" onSubmit={handleSubmit}>
            <LoginInfoInput name="email" onChange={handleChange} placeholder={_inputEmail} />
            <PlaceHolderBox>{errPlaceHolder && <PlaceHolderTxt>{errPlaceHolder}</PlaceHolderTxt>}</PlaceHolderBox>

            <LoginInfoBtnWrap>
              <LoginInfoBtn>{_sendButton}</LoginInfoBtn>
            </LoginInfoBtnWrap>
          </LoginMailForm>
        </LoginInfoInner>
        <BottomLayout>
          <LoginInfoClose onClick={() => handleModal(false)}>{_closeBtn}</LoginInfoClose>
        </BottomLayout>
      </LoginInfo>
    </LoginInfoLayout>
  );
};

/* 비밀번호 찾기 스타일 컴포넌트 */

//레이아웃
const LoginInfoLayout = styled.div`
  display: inline-block;
  min-width: 360px;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  background: ${(props) => props.theme.color.hoverColor};
`;
const LoginInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const LoginInfoInner = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 20px;
  background: ${(props) => props.theme.color.whiteColor};
`;

const BottomLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;
`;
// 비밀번호 찾기 타이틀
const LoginInfoTitle = styled.h1`
  margin: 20px 5px 5px 5px;
  line-height: 20px;
  font-weight: ${(props) => props.theme.fontWeight.font500};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
`;
const PlaceHolderBox = styled.div`
  display: flex;
  width: 100%;
  margin-left: 3px;
  transition: all 0.2s ease;
`;
const PlaceHolderTxt = styled.div`
  margin: 0.8em 0;
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.pinkColor};
  font-size: ${(props) => props.theme.fontSize.font13};
`;

// 발송 Form 디자인
const LoginMailForm = styled.form``;

// 회원정보 Input 영역
const LoginInfoInput = styled.input.attrs({
  type: 'email',
})`
  width: 100%;
  height: 46px;
  border-radius: 6px;
  padding: 0 12px;
  margin-top: 18px;
  background: ${(props) => props.theme.color.backgroundColor};
  &::placeholder {
    font-weight: ${(props) => props.theme.fontWeight.font300};
    font-size: ${(props) => props.theme.fontSize.font15};
    color: ${(props) => props.theme.color.placeHolderColor};
  }
`;

//회원정보 전송버튼
const LoginInfoBtnWrap = styled.div`
  width: 100%;
  padding: 0 16px;
`;

const LoginInfoBtn = styled.button.attrs({ type: 'submit' })`
  width: 100%;
  height: 42px;
  border-radius: 25px;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  margin-top: 8px;
  cursor: pointer;
  background: ${(props) => props.theme.color.orangeColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.whiteColor};
`;

// 닫기 버튼
const LoginInfoClose = styled.button.attrs({ type: 'button' })`
  width: 100%;
  height: auto;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.darkGray};
  cursor: pointer;
`;
