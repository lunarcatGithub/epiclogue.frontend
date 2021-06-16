import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components';

// reduce
import { ViewerContext } from '@store/ViewerStore';
import { AppDataContext, AlertContext } from '@store/App_Store';

// utils
import BookmarkFetch from '@utils/BookmarkFetch';
import LikeFetch from '@utils/LikeFetch';

import ViewerLanguage from './Viewer.Language';

export default function ViewerReact() {
  const { viewerData, setPopupType, setUserPopup } = useContext(ViewerContext);
  const { loginOn, setUnAuth } = useContext(AppDataContext);
  const { alertPatch } = useContext(AlertContext);

  // data rendering
  const [ reactData, setReactData ] = useState();

    // 뷰어 언어
    const { _contentsReact } = ViewerLanguage();

    const submitHandler = (type) => {
      unAuthBanned(); // unAuth

      if(type === 'Globe'){ // globe
        setUserPopup(true);
        if (reactData?.originUserId && !reactData?.originBoardId) {
          setPopupType('RemovedBoard');
        } else {
          reactData?.allowSecondaryCreation === 0 ? setPopupType('BannedSecondary') : setPopupType('WorkSecondary');
        }
      }
    }

    const openReactPopupHandler = () => {
      unAuthBanned();
      setUserPopup(true);
      setPopupType('ReactPopup');
    }

    const unAuthBanned = () => {
      if (!loginOn) {
        setUnAuth(true);
        return;
      }
    }
    
    useEffect(() => {
      setReactData(viewerData);
      return () => setReactData(null);
    }, [viewerData]);

    // 공유하기 클립보드
    const clipboardShare = () => {
      const link = document.location.href;
      const clipBoard = document.createElement('textarea');

      document.body.appendChild(clipBoard);
      clipBoard.value = link;
      clipBoard.select();
      document.execCommand('copy');
      document.body.removeChild(clipBoard);

      // 성공 푸시탭
      alertPatch({ type: 'SHARE', payload: true });
    };

    return (
      <ReactTab>
        <ReactInfoWrap onClick={ () => openReactPopupHandler() }>
          <ReactImg />
          <ReactTitle>
            { reactData?.reactCount }
            { _contentsReact }
          </ReactTitle>
        </ReactInfoWrap>
        <ReactSelector>
          <BookmarkFetch
            _id={reactData?._id}
            initToggle={reactData?.bookmarked}
          />
          <LikeFetch
            _id={reactData?._id}
            initLike={reactData?.liked}
            initialCount={reactData?.heartCount}
            type="Board"
          />
          <BtnBox onClick={ () => clipboardShare() } >
            <ShareBtn />
          </BtnBox>
          <BtnBox onClick={ () => submitHandler('Globe') } >
            <GlobeBtn />
          </BtnBox>

        </ReactSelector>
      </ReactTab>
    );
  }


// 반응 탭 레이아웃
const ReactTab = styled.div`
  padding: 16px;
  height: auto;
  margin-bottom: 5px;
  background: ${(props) => props.theme.color.whiteColor};
  @media (max-width: 900px) {
    padding: 12px;
  }
`;

const ReactInfoWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  @media (max-width: 900px) {
    padding-left: 8px;
  }
`;

// image
const ReactImg = styled.span`
  background: url('/static/react.svg') no-repeat center center / contain;
  width: 18px;
  height: 20px;
`;

const ReactTitle = styled.button.attrs({
  type: 'button',
})`
  margin: 0 0 3px 6px;
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.softBlackColor};
`;


const ReactSelector = styled.div`
  display: flex;
  justify-content: space-around;
  height: auto;
  padding-top: 10px;
`;
const BtnBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
`;
const BookmarkBtn = styled.button.attrs({ type: 'submit' })`
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: transform 0.1s ease-in-out;
  cursor: pointer;
  &::before {
    content: '';
    background: url(${(props) => (props.bookmark ? '/static/bookmark-2.svg' : '/static/bookmark-1.svg')}) no-repeat center / contain;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 28px;
    height: 28px;
  }
  &:active {
    transform: scale(1.3);
    transition: all 0.2s ease-in-out;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: ${(props) => props.theme.color.orangeOpacityColor};
    }
  }
`;

const ShareBtn = styled(BookmarkBtn)`
  &::before {
    background: url(${(props) => (props.share ? '/static/share-2.svg' : '/static/share-1.svg')}) no-repeat center / contain;
    transform: translate(-58%, -50%);
  }
  &:active {
    &:after {
      background: ${(props) => props.theme.color.softBrownColor};
    }
  }
`;

const GlobeBtn = styled(BookmarkBtn)`
  &::before {
    background: url(${(props) => (props.globe ? '/static/secondary.svg' : '/static/secondary.svg')}) no-repeat center / contain;
  }
  &:active {
    &:after {
      background: ${(props) => props.theme.color.softGreenColor};
    }
  }
`;