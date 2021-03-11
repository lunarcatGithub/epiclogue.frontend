import React, { useContext } from 'react';
import styled from 'styled-components';

// 컴포넌트 import
import ReportsPopup from './ReportsPopup';
import { langUsermoreMenu } from '@language/Lang.Viewer';
import { LangCommon } from '@language/Lang.Common';
import Modal from '@utils/Modal';

// Hooks&&reducer import
import { LanguageContext } from '@store/App_Store';
import { useModal } from '@hooks/useModal';

const UserPopup = (props) => {
  const { langState } = useContext(LanguageContext);

  const { handleModal_Menu } = props;

  const [handleReport, setHandleReport] = useModal();

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;

  const { userOptions, sendDm, reportUser, muteUser, moreContents } = langUsermoreMenu;
  const { closeBtn } = LangCommon;

  const _userOptions = userOptions[selectedLanguage] || userOptions[defaultLanguage],
    _sendDm = sendDm[selectedLanguage] || sendDm[defaultLanguage],
    _reportUser = reportUser[selectedLanguage] || reportUser[defaultLanguage],
    _muteUser = muteUser[selectedLanguage] || muteUser[defaultLanguage],
    _closeBtn = closeBtn[selectedLanguage] || closeBtn[defaultLanguage],
    _moreContents = moreContents[selectedLanguage] || closeBtn[defaultLanguage];

  return (
    <>
      {handleReport && (
        <Modal visible={handleReport} closable={true} maskClosable={true} onClose={() => setHandleReport(false)}>
          <ReportsPopup closeModal={() => setHandleReport(false)} />
        </Modal>
      )}

      <UserPopupInner>
        <UserTitleBox>{_userOptions}</UserTitleBox>
        <UserTabBox>
          {/* <UserTab>{_moreContents}</UserTab> */}
          {/* <UserTab>{_sendDm}</UserTab> */}
          <UserTab onClick={() => setHandleReport()}>{_reportUser}</UserTab>
          {/* <UserTab>{_muteUser}</UserTab> */}
        </UserTabBox>
        <PopupClose onClick={() => handleModal_Menu()}>{_closeBtn}</PopupClose>
      </UserPopupInner>
    </>
  );
};

//공통

// 레이아웃
const UserPopupInner = styled.div`
  position: fixed;
  z-index: 100000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  overflow: hidden;
  width: 340px;
  height: auto;
  border-radius: 12px;
  background: ${(props) => props.theme.color.backgroundColor};
  box-shadow: ${(props) => props.theme.boxshadow.popup};
`;

//버튼

const PopupClose = styled.button.attrs({ type: 'button' })`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  font-weight: 700;
  color: ${(props) => props.theme.color.softBlackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  background: ${(props) => props.theme.color.whiteColor};
`;
//유저 헤더 탭
const UserTitleBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 26px;
  width: 100%;
  height: 42px;
  margin-bottom: 3px;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.blackColor};
  background: ${(props) => props.theme.color.whiteColor};
`;

const UserTabBox = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`;
const UserTab = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  padding-left: 22px;
  width: 100%;
  height: 38px;
  font-weight: ${(props) => props.theme.fontWeight.font300};
  margin-bottom: 3px;
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
  background: ${(props) => props.theme.color.whiteColor};
`;

export default UserPopup;
