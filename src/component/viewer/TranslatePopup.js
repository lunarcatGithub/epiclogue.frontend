import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

// 컴포넌트 import
import { ReplyListContext } from './Viewer';
import { langTranslatePopup } from '@language/Lang.Viewer';
import { LangCommon } from '@language/Lang.Common';

// hooks&reducer
import { useUrlMove } from '@hooks/useUrlMove';
import { LanguageContext } from '@store/App_Store';

const TranslatePopup = ({ writer }) => {
  const { langState } = useContext(LanguageContext);
  const [goURL] = useUrlMove();

  const { toggle_Modal_Trans, boardUid, data, boardImg } = useContext(ReplyListContext);
  const [originBoardId, setOriginBoardId] = useState();

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { secondaryOpt, useEditor, selfUpload } = langTranslatePopup;
  const { closeBtn } = LangCommon;

  const _secondaryOpt = secondaryOpt[selectedLanguage] || secondaryOpt[defaultLanguage],
    _useEditor = useEditor[selectedLanguage] || useEditor[defaultLanguage],
    _selfUpload = selfUpload[selectedLanguage] || selfUpload[defaultLanguage],
    _closeBtn = closeBtn[selectedLanguage] || closeBtn[defaultLanguage];

  const boardIdDevide = () => {
    if (data.originBoardId) {
      setOriginBoardId(data.originBoardId._id);
    } else {
      setOriginBoardId(boardUid);
    }
  };

  useEffect(() => {
    boardIdDevide();
  }, []);

  return (
    <UserContentPopupInner>
      <UserContentTitleBox>{_secondaryOpt}</UserContentTitleBox>
      <UserContentTabBox>
        <UserContentTab
          onClick={() => {
            toggle_Modal_Trans();
            goURL({ pathname: `/editor/${originBoardId}`, query: { writer, boardUid, data: JSON.stringify(data), boardImg } });
          }}
        >
          {_useEditor}
        </UserContentTab>
        <UserContentTab onClick={() => goURL({ pathname: `/upload`, query: { writer, boardUid, data: JSON.stringify(data), _type:'noneEditor'} })}>{_selfUpload}</UserContentTab>
      </UserContentTabBox>
      <PopupClose onClick={() => toggle_Modal_Trans()}>{_closeBtn}</PopupClose>
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
