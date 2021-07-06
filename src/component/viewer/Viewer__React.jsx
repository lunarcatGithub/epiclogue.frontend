import React, { useContext, useState, useEffect } from 'react'
import styled, { keyframes, css }  from 'styled-components';

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
  const [ toggleShare, setToggleShare ] = useState(false);
  const [ toggleTrans, setToggleTrans ] = useState(false);

  // data rendering
  const [ reactData, setReactData ] = useState();

    // 뷰어 언어
    const { _contentsReact } = ViewerLanguage();

    const submitHandler = (type) => {
      unAuthBanned(); // unAuth

      if(type === 'Globe'){ // globe
        setUserPopup(true);
        setToggleTrans(true);
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

    // 공유하기 클립보드
    const clipboardShare = () => {
      setToggleShare(true)
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
    
    useEffect(() => {
      setReactData(viewerData);
    }, [viewerData]);

    useEffect(() => { // 토글 버튼 ctrl

      toggleShare && setTimeout(() => {
        setToggleShare(false);
      }, 800);

      toggleTrans && setTimeout(() => {
        setToggleTrans(false);
      }, 800);

    }, [toggleShare, toggleTrans])
    console.log(reactData?.bookmarked)
    return (
      <ReactTab>
        <ReactInfoWrap>
          <ReactImg />
          <ReactTitle onClick={ () => openReactPopupHandler() } >
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
              <ShareBtn share={toggleShare} />
            </BtnBox>
            <BtnBox onClick={ () => submitHandler('Globe') } >
              <GlobeBtn globe={toggleTrans} />
            </BtnBox>

        </ReactSelector>
      </ReactTab>
    );
  }
// keyframes
const buttonAnimation = keyframes`
50% {
  width:2.6em;
  height:2.6em;
}
`;

const restoreBtn = keyframes`
0% {
  width:0em;
  height:0em;
  opacity:0;
}
50% {
  width:2.4em;
  height:2.4em;
  opacity:1;
}
60% {
  width:2.7em;
  height:2.7em;
  opacity:0.3;
}
80% {
  width:2.9em;
  height:2.9em;
  opacity:0.1;
}
100% {
  width:3.5em;
  height:3.5em;
  opacity:0;
}
`
const center = css`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
`


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
  position:relative;
  width:2em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
`;

const ShareBtn = styled.span`
  ${center};
  display:flex;
  width:2em;
  height:2em;
  background:url( ${ ( { share } ) => share ? '/static/share-2.svg' : '/static/share-1.svg' }) no-repeat center center / contain;
  transition: all 0.2s ease-in-out;

  &:active {
    ${ ({ share }) => !share &&
    ` 
    width:1.2em; 
    height:1.2em;
    `
    };
      animation:${buttonAnimation} 0.2s ease-in-out normal;

  }
  
  &::before {
    ${ ({ share }) => share &&
    `
    content:'';
    border:2px solid #986444;
    `
    };
    ${center};
    left:51%;
    opacity:0;
    border-radius:50%;
    animation:${restoreBtn} 0.5s ease-in-out normal;
  }

  &::after {
    ${ ({ share }) => share &&
    `
    content:'';
    border:1px solid #986444;
    `
    };
    ${center};
    left:51%;
    opacity:0;
    border-radius:50%;
    animation:${restoreBtn} 0.5s 0.1s ease-in-out normal;
  }
`;

const GlobeBtn = styled(ShareBtn)`
  width:2em;
  height:2em;
  background:url( ${ ( { globe } ) => globe ? '/static/secondary.svg' : '/static/secondary.svg' }) no-repeat center center / contain;

  &:active {
    ${ ({ globe }) => !globe &&
    ` 
    width:1.2em; 
    height:1.2em;
    `
    };
  }
  
  &::before {
    ${ ({ globe }) => globe &&
    `
    content:'';
    border:2px solid #358786;
    `
    };
  }

  &::after {
    ${ ({ globe }) => globe &&
    `
    content:'';
    border:1px solid #358786;
    `
    };
  }
`;