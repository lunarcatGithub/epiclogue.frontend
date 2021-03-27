import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

// 컴포넌트 import
import { SignUpComplete } from './SignUp__Complete';
import { langSignUp, signUpError } from '@language/Lang.Login';
import { ProgressSmall } from '@utils/LoadingProgress';

// Hooks&&reducer import
import { LanguageContext } from '@store/App_Store';
import { useModal } from '@hooks/useModal';
import useForm from '@hooks/useForm';

export const SignUp = (props) => {
  const { setChangePage, backToLogin } = props;
  const router = useRouter();
  const { langState } = useContext(LanguageContext);

  const [checked, setChecked] = useState(false);
  const [isShowing, toggle] = useModal();

  const [valiEmail, setValiEmail] = useState('');
  const [valiPw, setValiPw] = useState('');
  const [valiRePw, setValiRePw] = useState('');
  const [valiNick, setValiNick] = useState('');

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { signUpTitle, signUpEmail, signUpPw, signUpPwConfirm, signUpNick, signUpDesc, agreeButton, signUpButton } = langSignUp;

  const { emailError, noEmail, dupliEmail, pwError, rePwError, nickError } = signUpError;

  const _signUpTitle = signUpTitle[selectedLanguage] || signUpTitle[defaultLanguage],
    _signUpEmail = signUpEmail[selectedLanguage] || signUpEmail[defaultLanguage],
    _signUpPw = signUpPw[selectedLanguage] || signUpPw[defaultLanguage],
    _signUpPwConfirm = signUpPwConfirm[selectedLanguage] || signUpPwConfirm[defaultLanguage],
    _signUpNick = signUpNick[selectedLanguage] || signUpNick[defaultLanguage],
    _signUpDesc = signUpDesc[selectedLanguage] || signUpDesc[defaultLanguage],
    _agreeButton = agreeButton[selectedLanguage] || agreeButton[defaultLanguage],
    _signUpButton = signUpButton[selectedLanguage] || signUpButton[defaultLanguage],
    _emailError = emailError[selectedLanguage] || emailError[defaultLanguage],
    _noEmail = noEmail[selectedLanguage] || noEmail[defaultLanguage],
    _dupliEmail = dupliEmail[selectedLanguage] || dupliEmail[defaultLanguage],
    _pwError = pwError[selectedLanguage] || pwError[defaultLanguage],
    _rePwError = rePwError[selectedLanguage] || rePwError[defaultLanguage],
    _nickError = nickError[selectedLanguage] || nickError[defaultLanguage];

  const [values, handleChange, handleSubmit, disabled, resData, errors] = useForm({
    initialValues: { type: 'signUp', email: '', userPw: '', userPwRe: '', userNick: '', userLang: defaultLanguage },
  });

  const handleCheckbox = (e) => {
    setChecked(e.target.checked);
  };

  const validateHandler = () => {
    if (errors) {
      // 이메일
      if (errors.email === 'errorNoneEmail') {
        setValiEmail(_noEmail);
      } else if (errors.email === 'errorEmail') {
        setValiEmail(_emailError);
      } else if (errors.email === 'duplicate') {
        setValiEmail(_dupliEmail);
      }

      // 비밀번호
      if (errors.userPw === 'errorPW') {
        setValiPw(_pwError);
      } else if (errors.userPwRe === 'errorRePW') {
        setValiRePw(_rePwError);
      }
      // 닉네임
      if (errors.userNick === 'errorNick') {
        setValiNick(_nickError);
      }
    }
  };

  useEffect(() => {
    if (resData) {
      if (resData.result === 'ok') {
        toggle();
      }
    }
  }, [resData]);

  useEffect(() => {
    validateHandler();
  }, [errors]);

  return (
    <SignUpBox>
      <SignUpBoxInner>
        <HeaderWrap>
          <BackIconAnchor onClick={() => (backToLogin ? router.back() : setChangePage(false))}>
            {/* <BackIcon src={require('../../img/arrow-left.png')} /> */}
            <PureBackIcon />
          </BackIconAnchor>
          <SignUpTitle>{_signUpTitle}</SignUpTitle>
        </HeaderWrap>
        <form action="" method="post" onSubmit={handleSubmit} noValidate>
          {/* 이메일 입력란 */}
          <SignUpEmailInput name="email" onChange={handleChange} placeholder={_signUpEmail} />
          <PlaceHolderBox>
            <PlaceHolderTxt>{errors?.email && valiEmail}</PlaceHolderTxt>
          </PlaceHolderBox>

          {/* 비밀번호 입력란 */}
          <SignUpPwInput name="userPw" onChange={handleChange} placeholder={_signUpPw} />
          <PlaceHolderBox>
            <PlaceHolderTxt>{errors?.userPw && valiPw}</PlaceHolderTxt>
          </PlaceHolderBox>

          {/* 비밀번호 확인란 */}
          <ReSignUpPwInput name="userPwRe" onChange={handleChange} placeholder={_signUpPwConfirm} />
          <PlaceHolderBox>
            <PlaceHolderTxt>{errors?.userPwRe && valiRePw}</PlaceHolderTxt>
          </PlaceHolderBox>

          {/* 닉네임 입력란 */}
          <UserNickInput name="userNick" onChange={handleChange} placeholder={_signUpNick} maxLength={30} />
          <PlaceHolderBox>
            <PlaceHolderTxt>{errors?.userNick && valiNick}</PlaceHolderTxt>
          </PlaceHolderBox>
          <SignUpAgreeCheck>{_signUpDesc}</SignUpAgreeCheck>
          <BtnWrap>
            <AgreeCheckBox id="sign-agree" checked={checked} onChange={handleCheckbox} />
            <AgreeCheckLabel agree={checked}>{_agreeButton}</AgreeCheckLabel>
            <SignUpBtn agree={checked} disabled={disabled}>
              {disabled ? <ProgressSmall /> : _signUpButton}
            </SignUpBtn>
          </BtnWrap>
        </form>
      </SignUpBoxInner>
      {isShowing ? <SignUpComplete email={values.email} backToLogin={() => setChangePage(false)} /> : ''}
    </SignUpBox>
  );
};

// 공통

const TextCommon1 = css`
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
`;
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

//회원가입 레이아웃
const SignUpBox = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  max-width: 480px;
  height: auto;
  background: ${(props) => props.theme.color.whiteColor};
  opacity: 0.95;
  @media (max-width: 900px) {
    padding-top: 20px;
    width: 100%;
    height: 100%;
  }
`;
const SignUpBoxInner = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
  padding: 20px;

  @media (max-width: 900px) {
    padding: 0 20px;
    justify-content: initial;
  }
`;
//회원가입 제목 타이틀
const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
`;
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
  width: 14px;
  height: 14px;
  border-top: 4px solid ${(props) => props.theme.color.darkGray};
  border-right: 4px solid ${(props) => props.theme.color.darkGray};
  -webkit-transform: rotate(225deg);
  transform: rotate(225deg);
  margin-left: 6px;
`;

const SignUpTitle = styled.h1`
  margin: 22px 6px;
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font700};
`;

const SignUpEmailInput = styled.input.attrs({
  type: 'text',
})`
  width: 100%;
  height: 46px;
  padding-left: 12px;
  margin-bottom: 8px;
  ${TextCommon1};
  border: 2px solid ${(props) => props.theme.color.hoverColor};
  border-radius: 8px;
  transition: all 0.2s ease;
  &::placeholder {
    color: ${(props) => props.theme.color.softBlackColor};
    font-size: ${(props) => props.theme.fontSize.font14};
    font-weight: ${(props) => props.theme.fontWeight.font300};
  }
  &:focus {
    border-color: ${(props) => props.theme.color.softOrangeColor};
  }
`;
const SignUpPwInput = styled(SignUpEmailInput).attrs({
  type: 'password',
})``;
const ReSignUpPwInput = styled(SignUpEmailInput).attrs({
  type: 'password',
})``;
const UserNickInput = styled(SignUpEmailInput).attrs({
  type: 'text',
})`
  margin-bottom: 12px;
`;

// 경고 플레이스 홀더
// --> 상단 로그인에서 태그 확인할 것
// 이용약관

const AgreeCheckBtn = styled.span`
  text-align: center;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  border-bottom: 1px solid ${(props) => props.theme.color.pinkColor};
  color: ${(props) => props.theme.color.pinkColor};
  margin: 2px 0;
  cursor: pointer;
`;

// 가입 동의 및 확인 버튼

const SignUpAgreeCheck = styled.span`
  display: flex;
  align-items: center;
  padding-left: 8px;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font14};
`;
const SignAgreeAnchor = styled.button`
  font-weight: ${(props) => props.theme.fontWeight.font700};
  border-bottom: 1px solid ${(props) => props.theme.color.pinkColor};
  color: ${(props) => props.theme.color.pinkColor};
  margin-bottom: 4px;
  cursor: pointer;
`;
const BtnWrap = styled.div`
  width: 100%;
  height: auto;
  margin: 26px 0;
`;
// 동의하기 체크박스 버튼

const AgreeCheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
`;
const AgreeCheckLabel = styled.label.attrs({
  htmlFor: 'sign-agree',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 38px;
  border-radius: 25px;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${(props) => props.theme.color.pinkColor};
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => (props.agree ? props.theme.color.whiteColor : props.theme.color.pinkColor)};
  background: ${(props) => (props.agree ? props.theme.color.pinkColor : props.theme.color.whiteColor)};
`;

// 회원가입 완료 버튼
const SignUpBtn = styled.button.attrs((props) => ({
  type: props.agree ? 'submit' : 'button',
}))`
  width: 100%;
  height: 38px;
  border-radius: 25px;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  margin-top: 8px;
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.whiteColor};
  background: ${(props) => props.theme.color.orangeColor};
  opacity: ${(props) => (props.agree ? 1 : 0.5)};
  transition: opacity 0.5s 0.2s ease-in-out;
  pointer-events: ${(props) => (props.agree ? 0 : 'none')};

  cursor: pointer;
`;
