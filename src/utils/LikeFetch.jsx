import React, { useContext, useEffect, useState } from 'react'
import styled, { keyframes, css } from 'styled-components';

// Hooks
import useAxiosFetch from '@hooks/useAxiosFetch';

// reduce
import { AppDataContext } from '@store/App_Store';

export default function LikeFetch({ _id, initLike, initialCount, type }) {

  // fetch
  const [ , likeApi, , likeFetch] = useAxiosFetch();

  const { loginOn, setUnAuth } = useContext(AppDataContext);
  
  const [ heartCount, setHeartCount ] = useState(initialCount);
  
  // toggle
  const [like, toggle_like] = useState();

  const toggleHandler = () => {
    if(!loginOn){
      setUnAuth(true);
      return;
    }
    toggle_like(!like);
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/interaction/like`;
    likeFetch(
      URL,
      like ? 'delete' : 'post',
      {
        targetInfo: _id,
        targetType: type,
      },
      null
    );
  }

  useEffect(() => { // 초기 좋아요 값 세팅
    if(initLike === undefined) return;
    toggle_like(initLike);
  }, [initLike])

  useEffect(() => {
    setHeartCount(initialCount || heartCount);
  }, [initialCount, heartCount]);

  useEffect(() => {
    if(likeApi?.result === 'ok'){
      setHeartCount(likeApi?.data?.heartCount);
    }
  }, [likeApi]);
  

  return (
      <ReactBtnWrap type={type} >
        <BtnBox>
          <LikeFbBtn
            heart={like}
            onClick={ () => { toggle_like(); toggleHandler() } }
          />
        </BtnBox>
        {/* <BtnDummy/> */}
      <ScoreBox>
        {/* <ScoreDummy>{ heartCount }</ScoreDummy> */}
        <LikeFbScore heart={like} >{ heartCount }</LikeFbScore>
      </ScoreBox>
    </ReactBtnWrap>
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

// 버튼 wrap
const ReactBtnWrap = styled.div`
  display:flex;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.type === 'Board' ? 0 : `4em`};
  margin-top:0.2em;
`;

const BtnBox = styled.div`
position:relative;
width:2em;
`

const LikeFbBtn = styled.button`
  ${center};
  display:flex;
  width:2em;
  height:2em;
  background:url( ${ ( { heart } ) => heart ? '/static/heart-2.svg' : '/static/heart-1.svg' }) no-repeat center center / contain;
  transition: all 0.2s ease-in-out;

  &:active {
    ${ ({ heart }) => !heart &&
    ` 
    width:1.2em; 
    height:1.2em;
    `
    };
      animation:${buttonAnimation} 0.2s ease-in-out normal;

  }
  
  &::before {
    ${ ({ heart }) => heart &&
    `
    content:'';
    border:2px solid red;
    `
    };
    ${center};
    left:51%;
    opacity:0;
    border-radius:50%;
    animation:${restoreBtn} 0.5s ease-in-out normal;
  }

  &::after {
    ${ ({ heart }) => heart &&
    `
    content:'';
    border:1px solid red;
    `
    };
    ${center};
    left:51%;
    opacity:0;
    border-radius:50%;
    animation:${restoreBtn} 0.5s 0.1s ease-in-out normal;
  }
`;

const ScoreBox = styled.div`
position:relative;
overflow:hidden;
margin-left:0.2em;
`;

const LikeFbScore = styled.span`
  display:flex;
  font-size: ${( {theme} ) => theme.fontSize.font14};
  font-weight: ${( { theme, heart } ) => heart ? theme.fontWeight.font700 : theme.fontWeight.font500 };
  color: ${( { theme, heart } ) => heart ? theme.color.pinkColor : theme.color.softBlackColor };
`;