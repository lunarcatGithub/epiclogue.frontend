import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { LanguageContext, AlertContext } from '@store/App_Store';
import { LangCommon, LangFeedbackMain } from '@language/Lang.Common';
import DevelopNote from './DevelopNote';
import { ProgressSmall } from '@utils/LoadingProgress';

import emailjs from 'emailjs-com';

export default function AdminFeedback({ toggleIsOpen }) {
  const { alertPatch } = useContext(AlertContext);

  const { langState } = useContext(LanguageContext);
  const [tabChoose, setTabChoose] = useState('feedback');
  const [textLimit, setTextLimit] = useState('');
  const [alert, setAlert] = useState(false);
  const [openFb, setOpenFb] = useState(false);
  const [userInfo, setUserInfo] = useState({ userId: localStorage.getItem('userId'), userNick: localStorage.getItem('userid') });
  const [loading, setLoading] = useState(false);
  const titleHandler = (e) => {
    let { value } = e.target;
    setTextLimit(value);
  };

  const sendEmailForm = (e) => {
    e.preventDefault();
    setLoading(true);
    if (textLimit.length < 29 && textLimit.length > 1) {
      emailjs.sendForm(process.env.EMAILJS_FIRST, process.env.EMAILJS_SECOND, e.target, process.env.EMAILJS_THIRD).then(
        (result) => {
          setOpenFb(false);
          setTextLimit('');
          alertPatch({ type: 'FEEDBACK_THANKS', payload: true });
          setLoading(false);
        },
        (error) => {}
      );
    } else {
      setAlert(true);
      setLoading(false);
    }
  };

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { fbBtn, fbTitle, dpTitle, fbSub, dpTab, fbForm, fbTitlePH, alertPh, fbDescriptPH, sendBtn } = LangFeedbackMain;
  const { closeBtn } = LangCommon;
  const _fbBtn = fbBtn[selectedLanguage] || fbBtn[defaultLanguage],
    _dpTab = dpTab[selectedLanguage] || dpTab[defaultLanguage],
    _fbTitle = fbTitle[selectedLanguage] || fbTitle[defaultLanguage],
    _dpTitle = dpTitle[selectedLanguage] || dpTitle[defaultLanguage],
    _fbSub = fbSub[selectedLanguage] || fbSub[defaultLanguage],
    _fbForm = fbForm[selectedLanguage] || fbForm[defaultLanguage],
    _fbTitlePH = fbTitlePH[selectedLanguage] || fbTitlePH[defaultLanguage],
    _alertPh = alertPh[selectedLanguage] || alertPh[defaultLanguage],
    _fbDescriptPH = fbDescriptPH[selectedLanguage] || fbDescriptPH[defaultLanguage],
    _sendBtn = sendBtn[selectedLanguage] || sendBtn[defaultLanguage],
    _closeBtn = closeBtn[selectedLanguage] || closeBtn[defaultLanguage];

  return (
    <PopupLayout>
      <PopupInner>
        <PopupTabTitle>
          <PopupTitleBox>
            <PopupTitle>{tabChoose === 'feedback' ? _fbTitle : _dpTitle}</PopupTitle>
          </PopupTitleBox>
        </PopupTabTitle>
        <TabBtnWrap>
          <TabBtn onClick={() => setTabChoose('feedback')} tabChoose={tabChoose}>
            {_fbBtn}
          </TabBtn>
          <TabBtnDpNote onClick={() => setTabChoose('dpNote')} tabChoose={tabChoose}>
            {_dpTab}
          </TabBtnDpNote>
        </TabBtnWrap>
        {tabChoose === 'feedback' ? (
          <>
            <PopupTab>
              <TabTitle>{_fbSub}</TabTitle>
            </PopupTab>
            <PopupTab>
              <TabTitleSub onClick={() => window.open('https://twitter.com/epiclogue_lunar', '_blank')}>Twitter</TabTitleSub>
            </PopupTab>
            <PopupTab onClick={() => setOpenFb(true)}>
              <TitleLabel>{_fbForm}</TitleLabel>
              {openFb && (
                <SendEmailForm onSubmit={sendEmailForm}>
                  <SendTitle name="title" id="emailTitle" value={textLimit} onChange={titleHandler} placeholder={_fbTitlePH} />
                  {alert && (
                    <AlertHolderWrap>
                      <AlertHolder>{_alertPh}</AlertHolder>
                    </AlertHolderWrap>
                  )}
                  <SendEamilInput maxLength="1000" name="message" placeholder={_fbDescriptPH} />
                  <UserInfoSend name="user" defaultValue={(userInfo.userId, userInfo.userNick)} />
                  <SendBtnLayout>
                    <SendBtn styling={loading ? loading : undefined}>{loading ? <ProgressSmall disabled={loading} /> : _sendBtn}</SendBtn>
                  </SendBtnLayout>
                </SendEmailForm>
              )}
            </PopupTab>
          </>
        ) : (
          <DevelopNote />
        )}
        <PopupCloseBox>
          <PopupClose onClick={() => toggleIsOpen()}>{_closeBtn}</PopupClose>
        </PopupCloseBox>
      </PopupInner>
    </PopupLayout>
  );
}

// 공통
const PopupLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.color.popupColor};
  z-index: 999999999;
  @media (max-width: 900px) {
    top: 54px;
  }
`;
const PopupTitleBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 26px;
`;

const PopupTabTitle = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  position: relative;
  padding-left: 8px;
  width: 100%;
  height: 100%;
  min-height: 48px;
  margin-bottom: 3px;
  background: ${(props) => props.theme.color.whiteColor};
`;
const PopupTitle = styled.span`
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font700};
`;

//모달 레이아웃
const PopupInner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  overflow: hidden;
  min-width: 360px;
  width: 480px;
  /* height: 100%; */
  max-height: 500px;
  border-radius: 12px;
  background: ${(props) => props.theme.color.backgroundColor};
  box-shadow: ${(props) => props.theme.boxshadow.popup};

  @media (max-width: 600px) {
    width: 360px;
  }
`;

// 팝업 탭
const PopupTab = styled(PopupTabTitle)`
  padding: 7px 12px;
  width: 100%;
  height: auto;
  margin-bottom: 3px;
  padding: 8px;
  background: ${(props) => props.theme.color.whiteColor};
`;

const TabTitle = styled.span`
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  line-height: 20px;
  padding: 0px 18px;
`;
const TabTitleSub = styled(TabTitle)`
  cursor: pointer;
`;

// 탭

const TabBtnWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  background: ${(props) => props.theme.color.whiteColor};
  flex-direction: row;
  margin-bottom: 3px;
  cursor: pointer;
`;
const TabBtn = styled.button`
  width: 100%;
  height: 100%;
  padding: 8px 0;
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => (props.tabChoose === 'feedback' ? props.theme.color.orangeColor : props.theme.color.blackColor)};
  border-bottom: 2px solid ${(props) => (props.tabChoose === 'feedback' ? props.theme.color.orangeColor : 'none')};
`;
const TabBtnDpNote = styled.button`
  width: 100%;
  height: 100%;
  padding: 8px 0;
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => (props.tabChoose === 'dpNote' ? props.theme.color.orangeColor : props.theme.color.blackColor)};
  border-bottom: 2px solid ${(props) => (props.tabChoose === 'dpNote' ? props.theme.color.orangeColor : 'none')};
`;
// 이메일 발송 부분
const TitleLabel = styled.label.attrs({ htmlFor: 'emailTitle' })`
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  line-height: 20px;
  padding: 0px 18px;
  cursor: pointer;
`;
const SendEmailForm = styled.form`
  padding: 12px;
`;
const SendTitle = styled.input.attrs({
  type: 'text',
})`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #2222;
  padding: 8px 12px;
  &:focus {
    background: ${(props) => props.theme.color.semiOrangeColor};
  }
  &::placeholder {
    color: ${(props) => props.theme.color.softBlackColor};
  }
`;
const UserInfoSend = styled.input`
  display: none;
`;
const SendEamilInput = styled.textarea.attrs({})`
  margin: 8px 0;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #2222;
  padding: 8px 12px;
  &:focus {
    background: ${(props) => props.theme.color.semiOrangeColor};
  }
  &::placeholder {
    color: ${(props) => props.theme.color.softBlackColor};
  }
`;

const SendBtnLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const SendBtn = styled.button`
  padding: 8px 16px;
  border: 12px;
  background: #444;
  color: ${(props) => props.theme.color.whiteColor};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  font-size: ${(props) => props.theme.fontSize.font15};

  border-radius: 8px;
  cursor: pointer;
  pointer-events: ${(props) => (props.styling ? 'none' : 'initail')};
`;
const AlertHolderWrap = styled.div`
  margin: 4px 0;
`;

const AlertHolder = styled.span`
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.pinkColor};
  font-size: ${(props) => props.theme.fontSize.font13};
  padding-left: 8px;
`;

// 닫기 버튼
const PopupCloseBox = styled.div`
  width: 100%;
`;

const PopupClose = styled.button.attrs({ type: 'submit' })`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 6px 0;
  margin-bottom: 3px;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.softBlackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
`;
