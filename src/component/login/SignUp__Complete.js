import React,{useContext} from 'react';
import styled from 'styled-components';

// 컴포넌트 import
import { langSignUpComplete } from '@language/Lang.Login';
import { LanguageContext } from '@store/App_Store';

export const SignUpComplete = (props) => {
  const { langState } = useContext(LanguageContext);

  const sendEmail = () => {
    let check1 = props.email.indexOf('@');
    let check2 = props.email.indexOf('.');
    let email = props.email.slice(check1 + 1, check2);
    window.location.href = `http://www.${email}.com`;
  };
  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { completeTitle, completeTxt, backHome, mailConfirmBtn } = langSignUpComplete;
  const _completeTitle = completeTitle[selectedLanguage] || completeTitle[defaultLanguage],
        _completeTxt = completeTxt[selectedLanguage] || completeTxt[defaultLanguage],
        _backHome = backHome[selectedLanguage] || backHome[defaultLanguage],
        _mailConfirmBtn = mailConfirmBtn[selectedLanguage] || mailConfirmBtn[defaultLanguage];

  return (
    <>
      <SignUpModal>
        <SignUpCompleteLayout>
          <CompleteInner>
            <SignUpCompleTitle>{_completeTitle}</SignUpCompleTitle>
            <SignUpCompleTxt>{_completeTxt}</SignUpCompleTxt>
            <CompleBtnWrap>
              <BackPageBtn onClick={props.backToLogin}>{_backHome}</BackPageBtn>
              <CompleBtn onClick={sendEmail}>{_mailConfirmBtn}</CompleBtn>
            </CompleBtnWrap>
          </CompleteInner>
        </SignUpCompleteLayout>
      </SignUpModal>
    </>
  );
};


  /* 회원가입 완료창 */


// 레이아웃
const SignUpModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${(props) => props.theme.color.blackOpacity};
`;
const SignUpCompleteLayout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 460px;
  height: auto;
  border-radius: 8px;
  z-index: 1;
  background: ${(props) => props.theme.color.whiteColor};
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  @media (max-width: 900px) {
    width: 360px;
  }
`;

const CompleteInner = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 20px;
`;
// 텍스트 작성 부분
const SignUpCompleTitle = styled.h3`
  margin: 20px 0;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font20};
`;
const SignUpCompleTxt = styled.span`
  margin: 7px 0;
  line-height: 28px;
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font18};
`;
// 메일 확인 버튼
const CompleBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 28px 8px 5px 0;
`;
const CompleBtn = styled.button.attrs({
  type: 'button',
})`
  width: auto;
  height: auto;
  padding: 10px 16px;

  border-radius: 25px;
  cursor: pointer;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.whiteColor};
  background: ${(props) => props.theme.color.orangeColor};
`;
const BackPageBtn = styled(CompleBtn)`
  margin-right: 16px;
  background: ${(props) => props.theme.color.skyColor};
`;
