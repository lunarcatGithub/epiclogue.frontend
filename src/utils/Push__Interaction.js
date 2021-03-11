import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

// 컴포넌트 import
import { LangPush } from '@language/Lang.Common';
import { LanguageContext, AlertContext } from '@store/App_Store';
import { ProgressSmall } from '@utils/LoadingProgress';

export const InteractTab = () => {
  const { langState } = useContext(LanguageContext);
  const { alertState, alertPatch } = useContext(AlertContext);
  const { kind, bool } = alertState;

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const {
    errorPush,
    uploadedPush,
    sharePush,
    tryAgainPush,
    notServicePush,
    uploadNoImage,
    inputTitle,
    twoWords,
    uploadError,
    uploadedUpdatePush,
    authFail,
    introUpdatePush,
    nickUpdatePush,
    idUpdatePush,
    passwordUpdatePush,
    feedbackThanks,
    reportReceive,
    pwSend,
    pwChange,
    nowUpload,
  } = LangPush;
  const _errorPush = errorPush[selectedLanguage] || errorPush[defaultLanguage],
    _uploadedPush = uploadedPush[selectedLanguage] || uploadedPush[defaultLanguage],
    _uploadedUpdatePush = uploadedUpdatePush[selectedLanguage] || uploadedUpdatePush[defaultLanguage],
    _sharePush = sharePush[selectedLanguage] || sharePush[defaultLanguage],
    _tryAgainPush = tryAgainPush[selectedLanguage] || tryAgainPush[defaultLanguage],
    _notServicePush = notServicePush[selectedLanguage] || notServicePush[defaultLanguage],
    _uploadNoImage = uploadNoImage[selectedLanguage] || uploadNoImage[defaultLanguage],
    _inputTitle = inputTitle[selectedLanguage] || inputTitle[defaultLanguage],
    _twoWords = twoWords[selectedLanguage] || twoWords[defaultLanguage],
    _uploadError = uploadError[selectedLanguage] || inputTitle[defaultLanguage],
    _authFail = authFail[selectedLanguage] || authFail[defaultLanguage],
    _introUpdatePush = introUpdatePush[selectedLanguage] || introUpdatePush[defaultLanguage],
    _passwordUpdatePush = passwordUpdatePush[selectedLanguage] || passwordUpdatePush[defaultLanguage],
    _feedbackThanks = feedbackThanks[selectedLanguage] || passwordUpdatePush[defaultLanguage],
    _reportReceive = reportReceive[selectedLanguage] || reportReceive[defaultLanguage],
    _pwSend = pwSend[selectedLanguage] || pwSend[defaultLanguage],
    _pwChange = pwChange[selectedLanguage] || pwChange[defaultLanguage],
    _nowUpload = nowUpload[selectedLanguage] || nowUpload[defaultLanguage];

  const [alert, setAlert] = useState();
  const [bottom, setBottom] = useState();
  const [color, setColor] = useState();

  const errorHandler = () => {
    switch (kind) {
      // 아직 기능이 완료 되지 않음
      case 'NOT_SERVICE':
        setAlert(_notServicePush);
        setColor(`#ECA62C`);
        break;
      // 공유 버튼 클릭시 링크 복사 완료
      case 'SHARE':
        setAlert(_sharePush);
        setColor(`rgba(3,109,108,1)`);
        break;
      // 몬가.. 몬가 실패했음
      case 'FAIL':
        setAlert(_errorPush);
        setColor(`rgba(247, 112, 143, 1)`);
        break;
      // 투고가 완료되었음
      case 'UPLOADED':
        setAlert(_uploadedPush);
        setColor(`#ECA62C`);
        break;
      // 투고 수정이 완료되었음
      case 'UPLOADED_UPDATE':
        setAlert(_uploadedUpdatePush);
        setColor(`#ECA62C`);
        break;
      // 작품 이미지가 빠져있음
      case 'UPLOADED_IMAGE':
        setAlert(_uploadNoImage);
        setColor(`#ECA62C`);
        break;
      // 작품 제목이 빠져있음
      case 'UPLOADED_TITLE':
        setAlert(_inputTitle);
        setColor(`rgba(247, 112, 143, 1)`);
        break;
      // 2자 이상 작성할 것
      case 'FEEDBACK_TWO':
        setAlert(_twoWords);
        setColor(`rgba(247, 112, 143, 1)`);
        break;

      // 몬가의 이유로 투고가 실패했음
      case 'UPLOADED_FAIL':
        setAlert(_uploadError);
        setColor(`rgba(247, 112, 143, 1)`);
        break;

      // 아직 인증이 되지 않았음
      case 'AUTH_FAIL':
        setAlert(_authFail);
        setColor(`rgba(247, 112, 143, 1)`);
        break;
      // 프로필 변경이 완료되었음
      case 'PROFILE_UPDATE':
        setAlert(_introUpdatePush);
        setColor(`#ECA62C`);
        break;
      // 패스워드 변경이 완료되었음
      case 'PASSWORD_UPDATE':
        setAlert(_passwordUpdatePush);
        setColor(`#ECA62C`);
        break;
      // 피드백 감사함
      case 'FEEDBACK_THANKS':
        setAlert(`🧧${_feedbackThanks}🥰`);
        setColor(`#ECA62C`);
        break;
      // 신고 접수
      case 'REPORT_SUBMIT':
        setAlert(`${_reportReceive} 👮`);
        setColor(`#ECA62C`);
        break;
      // 로딩바
      case 'LOADING_PUSH':
        setAlert(_nowUpload);
        setColor(`#ECA62C`);
        break;
      // PW 인증메일 발송
      case 'SUCCESS_PWSEND':
        setAlert(_pwSend);
        setColor(`#ECA62C`);
        break;
      // PW 인증 변경 성공
      case 'SUCCESS_PWCHANGE':
        setAlert(`${_pwChange}🖐️`);
        setColor(`#ECA62C`);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    let timeout = null;
    if (kind !== 'LOADING_PUSH') {
      timeout = setTimeout(() => {
        bool && alertPatch({ type: kind, payload: false });
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [bool, kind]);

  useEffect(() => {
    errorHandler();
  }, [errorHandler]);
  return (
    <>
      {kind !== 'LOADING_PUSH' ? (
        <PushBox bool={bool} color={color}>
          {/* 푸쉬바 내부 콘텐츠 */}
          <PushBoxInner>
            <Contents>{alert}</Contents>
            {/* // 푸쉬바 내부 콘텐츠 끝 */}
          </PushBoxInner>
        </PushBox>
      ) : (
        <Modal bool={bool}>
          <PushLayout bool={bool} color={color}>
            <ProgressSmall disabled={true} />
            <TextBox>
              <InformText>{_nowUpload}</InformText>
            </TextBox>
          </PushLayout>
        </Modal>
      )}
    </>
  );
};

// 레이아웃 부분

const PushBox = styled.div`
  position: fixed;
  left: 50%;
  bottom: ${(props) => (props.bool ? `40px` : '-60px')};
  opacity: ${(props) => (props.bool ? `1` : '0')};
  transition: all 0.5s cubic-bezier(0, 0, 0.3, 1.5);
  transform: translateX(-50%);
  display: flex;
  width: auto;
  padding: 0 18px;
  background: ${(props) => props.color};
  margin-bottom: 3px;
  border-radius: 25px;
  box-shadow: ${(props) => props.theme.boxshadow.popup2};
  z-index: 9999999999;
  @media (max-width: 900px) {
    bottom: ${(props) => (props.bool ? `70px` : '-60px')};
  }
`;

const PushBoxInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
`;

// 내부 콘텐츠

const Contents = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.whiteColor};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  white-space: nowrap;
  user-select: none;
`;

// 로딩 진행바 디자인
const Modal = styled.div`
  display: ${(props) => (props.bool ? 'flex' : 'none')};
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) => props.theme.color.blackOpacity};
  z-index: 99999999999;
  user-select: none;
  @media (max-width: 900px) {
    align-items: center;
  }
`;
const PushLayout = styled.article`
  opacity: ${(props) => (props.bool ? 1 : 0)};
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 160px;
  padding: 8px 4px;
  height: auto;
  max-height: 48px;
  transition: all 0.5s ease-in-out;
  background: ${(props) => props.color};
  border-radius: 20px;
  box-shadow: ${(props) => props.theme.boxshadow.popup2};

  @media (max-width: 900px) {
    margin-top: 0;
  }
`;

const TextBox = styled.div`
  margin-right: 14px;
`;
const InformText = styled.span`
  font-size: ${(props) => props.theme.fontSize.font16};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.whiteColor};
  white-space: nowrap;
`;
