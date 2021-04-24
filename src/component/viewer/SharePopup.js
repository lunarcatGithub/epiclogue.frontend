import React, { useContext } from 'react';
import styled from 'styled-components';

import { ReplyListContext } from './Viewer';

// 컴포넌트 import
import ViewerLanguage from './Viewer.Language';

const SharePopup = () => {
  const { toggle_Modal_Share } = useContext(ReplyListContext);

  //언어 변수
  const { _hareText, _linkShare, _closeBtn } =ViewerLanguage();

  return (
    <>
      <PopupLayout onClick={() => toggle_Modal_Share()}></PopupLayout>
      <SharePopupInner>
        {/*공유하기 타이틀*/}
        <ShareTitleBox>
          <ShareIcon src={require('../../img/share-2.png')} />
          <ShareTitle>{_hareText}</ShareTitle>
        </ShareTitleBox>
        {/*링크 공유학기 탭*/}
        <LinkShareBox>
          <LinkIcon src={require('../../img/link.png')} />
          <LinkShareTitle>{_linkShare}</LinkShareTitle>
        </LinkShareBox>
        {/*Api 공유하기 탭*/}
        <TwitterIcon src={require('../../img/twitter-logo.png')} />
        <PinterestIcon src={require('../../img/Pinterest-logo.png')} />
        <TumblrIcon src={require('../../img/tumblr-logo.png')} />
        <PopupClose onClick={() => toggle_Modal_Share()}>{_closeBtn}</PopupClose>
      </SharePopupInner>
    </>
  );
};

//공통
const ShareTxt = css`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 3px;
  background: ${(props) => props.theme.color.whiteColor};
`;

const PositionCenter = css`
  position: fixed;
  z-index: 100000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

//공유하기 팝업 레이아웃
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

const SharePopupInner = styled.div`
  ${PositionCenter};
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  overflow: hidden;
  min-width: 360px;
  width: 480px;
  height: auto;
  border-radius: 12px;
  background: ${(props) => props.theme.color.backgroundColor};
  box-shadow: ${(props) => props.theme.boxshadow.popup};
  @media (max-width: 900px) {
    width: 340px;
  }
`;

// 공유하기 헤더 탭
const ShareTitleBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding-left: 26px;
  margin-bottom: 3px;
  background: ${(props) => props.theme.color.whiteColor};
`;
const ShareIcon = styled.img`
  margin-top: 2px;
  width: 17px;
  height: 19px;
`;
const ShareTitle = styled.span`
  padding-left: 10px;
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font700};
`;
// 링크 공유하기
const LinkShareBox = styled.button.attrs({
  type: 'button',
})`
  height: 52px;
  padding: 3px 0 0 28px;
  cursor: pointer;
  ${ShareTxt};
`;
const LinkIcon = styled.img`
  width: 20px;
  height: 20px;
`;
const LinkShareTitle = styled(ShareTitle)`
  font-size: ${(props) => props.theme.fontSize.font15};
`;
// Api 공유하기 탭

const ApiLinkTab = styled.div`
  height: 64px;
  padding-left: 20px;
  ${ShareTxt};
`;
const ApiAnchor = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  width: 52px;
  height: 52px;
  border-radius: 50%;

  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
`;
// 트위터 아이콘
const TwitterIcon = styled.img`
  width: 42px;
  height: 42px;
`;
// 핀터레스트 아이콘
const PinterestIcon = styled(TwitterIcon)``;
// 텀블러 아이콘
const TumblrIcon = styled(TwitterIcon)``;

// 닫기 버튼
const PopupClose = styled.button.attrs({ type: 'submit' })`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 0;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.softBlackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
`;

export default SharePopup;
