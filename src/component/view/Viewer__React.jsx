import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components';

// reduce
import { ViewerContext } from '@store/ViewerStore';
import { AppDataContext, AlertContext } from '@store/App_Store';

// hooks
import { useToggle } from '@hooks/useToggle';

import ViewerLanguage from './Viewer.Language';

export default function ViewerReact() {
  const { viewerData, setPopupType, setUserPopup } = useContext(ViewerContext);
  const { loginOn, setUnAuth } = useContext(AppDataContext);
  const { alertPatch } = useContext(AlertContext);


  // toggle
  const [bookmark, toggleBookmark] = useToggle();
  const [like, toggleLike] = useToggle();

  // data
  const [ reactData, setReactData ] = useState(null);

    // 뷰어 언어
    const { _contentsReact } = ViewerLanguage();
    

    const submitHandler = (e, type) => {
      e.preventDefault();
      unAuthBanned(); // unAuth

      if(type === 'share'){ // share일 경우 clipboard
        clipboardShare();
        return;
      }

      if(type === 'globe'){ // globe
        setUserPopup(true);
        if (reactData.originUserId && !reactData.originBoardId) {
          setPopupType('RemovedBoard');
        } else {
          reactData?.allowSecondaryCreation === 0 ? setPopupType('BannedSecondary') : setPopupType('WorkSecondary');
        }
      }

      const URL = `${process.env.NEXT_PUBLIC_API_URL}/interaction/${type}`;

    }

    const unAuthBanned = () => {
      if (!loginOn) {
        setUnAuth(true);
        return;
      }
    }
    

    useEffect(() => {
      setReactData(viewerData);
    }, [viewerData]);

    useEffect(() => {
      toggleBookmark(!loginOn ? false : reactData?.bookmarked);
      toggleLike(!loginOn ? false : reactData?.liked)
    }, []);


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

    const buttonData = [
      { id:0, type: 'bookmark', toggle:<BookmarkBtn bookmark={bookmark} />, count:null },
      { id:1, type: 'like', toggle:<LikeBtn heart={like} />, count:reactData?.heartCount },
      { id:2, type: 'share', toggle:<ShareBtn />, count:null },
      { id:3, type: 'globe', toggle:<GlobeBtn />, count:null }
    ];

    return (
      <ReactTab>
        <ReactInfoWrap onClick={ () => unAuthBanned() }>
          <ReactImg />
          <ReactTitle>
            { reactData?.reactCount }
            { _contentsReact }
          </ReactTitle>
        </ReactInfoWrap>
        <ReactSelector>
        { buttonData.map( ({ id, type, toggle, count }) => (
          <form key={id} onSubmit={ (e) => submitHandler(e, type) }>
            <BtnBox
              onClick={ () => unAuthBanned() } >
              { toggle }
              { count && <ReactScore>{ count }</ReactScore> }
            </BtnBox>
          </form>
        ) ) }
        </ReactSelector>
      </ReactTab>
    )
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
const BtnBox = styled.div`
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
const LikeBtn = styled(BookmarkBtn)`
  &::before {
    background: url(${(props) => (props.heart ? `/static/heart-2.svg` : `/static/heart-1.svg`)}) no-repeat center / contain;
  }
  &:active {
    &:after {
      background: ${(props) => props.theme.color.softPinkColor};
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
const ReactScore = styled.span`
  margin-left: 6px;
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.softBlackColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};
`;