import React, { useEffect, useContext, useState } from 'react';
import styled, { css } from 'styled-components';

// 컴포넌트 import
import { ReplyListContext } from './Viewer';
import { LangCommon } from '@language/Lang.Common';
import { langMymoreMenu, langUsermoreMenu } from '@language/Lang.Viewer';
import Modal from '@utils/Modal';
import ConfirmPopup from '@utils/ConfirmPopup';
import ReportsPopup from './ReportsPopup';

// Hooks&&reducer import
import { useUrlMove } from '@hooks/useUrlMove';
import { useModal } from '@hooks/useModal';
import useAxiosFetch from '@hooks/useAxiosFetch';
import { LanguageContext } from '@store/App_Store';

const MorePopup = (props) => {
  const { langState } = useContext(LanguageContext);
  const { _id, conFirmType, type, handleModal_Menu, onUpdate, fbtype, fbUid} = props;
  const { boardUid, setReplyList, setRenderList, setFbReList, fbReList, ReFbUid } = useContext(ReplyListContext);

  const [accessConfirm, setAccessConfirm] = useState(false);
  // fetch
  const [, removeBoardApi, , removeBoardFetch] = useAxiosFetch();
  const [, removeFbFbApi, , removeFbFetch] = useAxiosFetch();
  const [, removeReFbFbApi, , removeReFbFetch] = useAxiosFetch();

  // 언어변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { closeBtn } = LangCommon;
  const { myOptions, modifyContent, deleteContent } = langMymoreMenu;
  const { userOptions, sendDm, reportUser, muteUser, moreContents } = langUsermoreMenu;

  const _closeBtn = closeBtn[selectedLanguage] || closeBtn[defaultLanguage],
    _myOptions = myOptions[selectedLanguage] || myOptions[defaultLanguage],
    _modifyContent = modifyContent[selectedLanguage] || modifyContent[defaultLanguage],
    _deleteContent = deleteContent[selectedLanguage] || deleteContent[defaultLanguage],
    _userOptions = userOptions[selectedLanguage] || userOptions[defaultLanguage],
    _reportUser = reportUser[selectedLanguage] || reportUser[defaultLanguage];

  const [goURL] = useUrlMove();
  const [state_Confirm, toggle_Modal_Confirm] = useModal();
  const [handleReport, setHandleReport] = useModal();
  
  // const type = props.conFirmType;

  const deleteFb = () => {
    removeFbFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}/feedback/${_id}`, 'delete', null, null, null);
  };

  const deleteFbRe = () => {
    removeReFbFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}/feedback/${_id}/reply/${ReFbUid}`, 'delete', null, null, null);
  };

  const removeBoardHandler = () => {
    removeBoardFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}`, 'delete', null, null, null);
  };
  useEffect(() => {
    // * 삭제 확인 이후 로직 실행
    if (accessConfirm) {
      if (fbtype === 'Fb' || fbtype === 'popupFb') {
        deleteFb();
      } else if (type === 'myMore') {
        removeBoardHandler();
      } else {
        deleteFbRe();
      }
    }
  }, [accessConfirm]);

  useEffect(() => {
    if (!removeBoardApi) return;
    goURL({ pathname: '/' });
    handleModal_Menu();
  }, [removeBoardApi]);

  useEffect(() => {
    if (!removeFbFbApi) return;
    setRenderList(removeFbFbApi?.data);
    setReplyList(removeFbFbApi?.data);
    handleModal_Menu();
  }, [removeFbFbApi]);

  useEffect(() => {
    if (!removeReFbFbApi) return;
    setFbReList(fbReList.filter((item) => item._id !== ReFbUid));
  }, [removeReFbFbApi]);

  return (
    <>
      <MyPopupInner>
        <MyTitleBox>{type === 'myMore' || type === 'myFbMore' ? _myOptions : _userOptions}</MyTitleBox>
        <MyTabBox>
        {
          type === 'myMore' || type === 'myFbMore' ? 
          <>
            {type !== 'myFbMore' && <MyTab
                onClick={() => {
                  onUpdate();
                  // setFeedBackModify(true)
                  handleModal_Menu();
                }}
              >
                {_modifyContent}
              </MyTab>}
              <MyTab 
                onClick={() => {
                toggle_Modal_Confirm();
                }}>{_deleteContent}
                </MyTab>
              </>
            : 
              <MyTab onClick={() => setHandleReport()}>{_reportUser}</MyTab>
        }
        </MyTabBox>
        <PopupClose onClick={() => handleModal_Menu()}>{_closeBtn}</PopupClose>
      </MyPopupInner>
      {state_Confirm && (
        <Modal visible={state_Confirm} closable={true} maskClosable={true} onClose={() => toggle_Modal_Confirm(false)}>
          <ConfirmPopup handleModal={() => toggle_Modal_Confirm(false)} setAccessConfirm={setAccessConfirm} type={conFirmType} />
        </Modal>
      )}
      {handleReport && (
        <Modal visible={handleReport} closable={true} maskClosable={true} onClose={() => setHandleReport(false)}>
          <ReportsPopup closeModal={() => setHandleReport(false)} />
        </Modal>
      )}
    </>
  );
};

//공통

const PositionCenter = css`
  position: fixed;
  z-index: 100000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// 레이아웃
const PopupLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.color.popupColor};
  z-index: 99999;
  @media (max-width: 900px) {
    top: 54px;
  }
`;
const MyPopupInner = styled.div`
  ${PositionCenter};
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

const PopupClose = styled.button.attrs({ type: 'submit' })`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3em 0;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.softBlackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  /* background: ${(props) => props.theme.color.whiteColor}; */
`;

//유저 헤더 탭
const MyTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding-left: 26px; */
  width: 100%;
  height: 42px;
  margin-bottom: 3px;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.blackColor};
  background: ${(props) => props.theme.color.whiteColor};
`;
const MyTabBox = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`;
const MyTab = styled.button.attrs({
  type: 'submit',
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

export default MorePopup;
