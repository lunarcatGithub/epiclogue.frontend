import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

// 컴포넌트 import
import ViewerLanguage from './Viewer.Language';

// hooks&reducer
import { useUrlMove } from '@hooks/useUrlMove';
import { ViewerContext } from '@store/ViewerStore'
;
//utils
import { popupAni } from '@utils/popupAnimation';

const TranslatePopup = () => {
  const { viewerData, setUserPopup } = useContext(ViewerContext);

  const [goURL] = useUrlMove();

  const [boardId, setBoardId] = useState();

  const { originBoardId, _id, boardImg, writer } = viewerData;

  //언어 변수
  const {
    _secondaryOpt,
    _useEditor,
    _selfUpload,
    _closeBtn
  } = ViewerLanguage();

  const boardIdDevide = () => {
    if (originBoardId) {
      setBoardId(originBoardId?._id);
    } else {
      setBoardId(_id);
    }
  };

  useEffect(() => {
    boardIdDevide();
  }, [viewerData]);

  return (
    <UserContentPopupInner>
      <UserContentTitleBox>{_secondaryOpt}</UserContentTitleBox>
      <UserContentTabBox>
        <UserContentTab
          onClick={ () => {
            setUserPopup(false);
            goURL( { 
              pathname: `/editor/${boardId}`, 
              query: { 
                writer, boardUid:boardId, 
                data: JSON.stringify(viewerData), 
                boardImg
              } } );
          } } >
          {_useEditor}
        </UserContentTab>
        <UserContentTab 
        onClick={ () => 
          goURL( { pathname: `/upload`, query: { writer, boardUid:boardId, data: JSON.stringify(viewerData), _type:'noneEditor'} } )
        } >{_selfUpload}</UserContentTab>
      </UserContentTabBox>
      <PopupClose onClick={() => setUserPopup(false)}>{_closeBtn}</PopupClose>
    </UserContentPopupInner>
  );
};

// 공통
const PositionCenter = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

//  레이아웃

const UserContentPopupInner = styled.div`
  ${PositionCenter};
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  overflow: hidden;
  width: 340px;
  height: auto;
  z-index: 100000;
  border-radius: 12px;
  background: ${(props) => props.theme.color.backgroundColor};
  box-shadow: ${(props) => props.theme.boxshadow.popup};
  animation:${popupAni} .3s ease-in-out normal;
`;

//헤더 탭
const UserContentTitleBox = styled.div`
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
const UserContentTabBox = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`;
const UserContentTab = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  padding-left: 28px;
  width: 100%;
  height: 38px;
  font-weight: ${(props) => props.theme.fontWeight.font500};
  margin-bottom: 3px;
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
  background: ${(props) => props.theme.color.whiteColor};
`;

// 버튼
const PopupClose = styled.button.attrs({ type: 'submit' })`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 0;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.softBlackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
`;

export default TranslatePopup;
