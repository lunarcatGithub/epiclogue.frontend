import React, { useEffect, useContext, useState } from 'react';
import styled, { css } from 'styled-components';

// 컴포넌트 import
import ViewerLanguage from './Viewer.Language';

// Hooks&&reducer import
import { useUrlMove } from '@hooks/useUrlMove';
import { ViewerContext } from '@store/ViewerStore';

const MorePopup = ({ type, doType }) => {
  const { setUserPopup, setPopupType, setFeedbackModalCtrl, setFeedbackPopupType } = useContext(ViewerContext);

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

  const reportOrModify = () => {
    if(type === 'MyContentPopup'){ // 수정하기
      setPopupType('ContentModify');

    } else { // 신고하기
      setPopupType('ContentReport');
    }
  };

  // confirm popup ctrl
  const confirmPopup = (e) => {
    e.stopPropagation();
    if(doType === 'PopupFeedback'){
      setFeedbackPopupType('PopupFeedbackRemove');
    } else {
      setPopupType('ContentRemove');

    }
  }

  const typeDivide = () => {
    switch (type) {
      case 'MyContentPopup':
        setDescript({
          title:_myOptions, script1:_modifyContent, script2:_deleteContent
        } );
        break;
      case 'UserContentPopup':
        setDescript({
          title:_userOptions, script1:_reportUser, script2:null
        } );
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    typeDivide(); 
  }, [type])

  return (
    <>
      <MyPopupInner >
        <MyTitleBox>{ descript.title }</MyTitleBox>
        <MyTabBox>
            <MyTab onClick={()=> reportOrModify()}>{ descript.script1 }</MyTab>
          { descript.script2 &&
            <MyTab onClick={confirmPopup}>{ descript.script2 }</MyTab>
          }
        </MyTabBox>
        <PopupClose onClick={ () => {
          if(doType === 'PopupFeedback'){
            setFeedbackModalCtrl(false); // reply 팝업 쪽
          } else {
            setUserPopup(false); // viewer 쪽
          } } } >{ _closeBtn }</PopupClose>
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
