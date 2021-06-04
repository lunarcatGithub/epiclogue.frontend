import React, { useEffect, useContext, useState } from 'react';
import styled, { css } from 'styled-components';

// 컴포넌트 import
import ConfirmPopup from '@utils/ConfirmPopup';
import ViewerLanguage from './Viewer.Language';

// Hooks&&reducer import
import { useUrlMove } from '@hooks/useUrlMove';
import { useModal } from '@hooks/useModal';
import useAxiosFetch from '@hooks/useAxiosFetch';
import { ViewerContext } from '@store/ViewerStore';

const MorePopup = (props) => {
  const { type } = props;
  const { viewerData, setUserPopup, typeMenuPopup, setTypeMenuPopup, setPopupType } = useContext(ViewerContext);

  const [accessConfirm, setAccessConfirm] = useState(false);

  // fetch 
  const [ , removeBoardApi, , removeBoardFetch ] = useAxiosFetch();
  const [ , removeFbFbApi, , removeFbFetch ] = useAxiosFetch();
  const [ , removeReFbFbApi, , removeReFbFetch ] = useAxiosFetch();

  // desc
  const [ descript, setDescript ] = useState({});
  
  // 언어변수
  const {
    _modifyContent,
    _deleteContent,
    _userOptions,
    _reportUser,
    _closeBtn,
    _myOptions,
  } = ViewerLanguage();

  const [goURL] = useUrlMove();

  // const type = props.conFirmType;

  // const deleteFb = () => {
  //   removeFbFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}/feedback/${_id}`, 'delete', null, null, null);
  // };

  // const deleteFbRe = () => {
  //   removeReFbFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}/feedback/${_id}/reply/${ReFbUid}`, 'delete', null, null, null);
  // };


  const reportOrModify = () => {
    if(type === 'MyContentPopup'){ // 수정하기
      setPopupType('ContentModify');
    } else { // 신고하기
      setPopupType('ContentReport');
    }
  };

  // confirm popup ctrl
  const confirmPopup = () => {
    setPopupType('ContentRemove');
  }

  const typeDivide = () => {

    switch (type) {
      case 'MyContentPopup':
        setDescript({
          title:_myOptions, script1:_modifyContent, script2:_deleteContent
        });
        break;
      case 'UserContentPopup':
        setDescript({
          title:_userOptions, script1:_reportUser, script2:null
        });
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    typeDivide(); 
  }, [type])

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
    // setRenderList(removeFbFbApi?.data);
    // setReplyList(removeFbFbApi?.data);
    handleModal_Menu();
  }, [removeFbFbApi]);

  useEffect(() => {
    if (!removeReFbFbApi) return;
    // setFbReList(fbReList.filter((item) => item._id !== ReFbUid));
  }, [removeReFbFbApi]);

  return (
    <>
      <MyPopupInner>
        <MyTitleBox>{ descript.title }</MyTitleBox>
        <MyTabBox>
            <MyTab onClick={()=> reportOrModify()}>{ descript.script1 }</MyTab>
          { descript.script2 && <MyTab onClick={()=> confirmPopup()}>{ descript.script2 }</MyTab> }
        </MyTabBox>
        <PopupClose onClick={() => setUserPopup(false)}>{_closeBtn}</PopupClose>
      </MyPopupInner>
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
