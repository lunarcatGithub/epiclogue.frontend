import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';

// Hooks
import useAxiosFetch from '@hooks/useAxiosFetch';
import { useToggle } from '@hooks/useToggle';

// reduce
import { AppDataContext } from '@store/App_Store';

export default function LikeFetch({ _id, initLike, initialCount, type }) {
  // fetch
  const [ , likeApi, , likeFetch] = useAxiosFetch();

  const { loginOn, setUnAuth } = useContext(AppDataContext);
  
  const [ heartCount, setHeartCount ] = useState(initialCount);
  // toggle
  const [like, toggle_like] = useToggle();

  const submitHandler = (e) => {
    e.preventDefault();
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/interaction/like`;
      likeFetch(
        URL,
        like ? 'post' : 'delete',
        {
          targetInfo: _id,
          targetType: type,
        },
        null
      );
  };

  useEffect(() => {
    toggle_like(initLike);
  }, []);

  useEffect(() => {
    if(likeApi?.result === 'ok'){
      setHeartCount(likeApi?.data?.heartCount);
    }
  }, [likeApi]);


  return (
    <form onSubmit={submitHandler}>
      <ReactBtnWrap type={type} >
        <LikeFbBtn
          heart={like}
          onClick={ () =>  
            loginOn ? 
            toggle_like() 
            :
            setUnAuth(true)
          } />
        <LikeFbScore>{ heartCount }</LikeFbScore>
      </ReactBtnWrap>
    </form>
  );
}

// 버튼 wrap
const ReactBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.type === 'Board' ? 0 : `4em`};
`;

const LikeFbBtn = styled.button.attrs({ type: 'submit' })`
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: transform 0.1s ease-in-out;
  cursor: pointer;
  &::before {
    content: '';
    background: url(${(props) => (props.heart ? '/static/heart-2.svg' : '/static/heart-1.svg')}) no-repeat center / contain;
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
    background: ${(props) => props.theme.color.softSkyColor};
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: ${(props) => props.theme.color.softPinkColor};
    }
  }
`;

const LikeFbScore = styled.span`
  margin-left: 4px;
  margin-top: 2px;
  color: ${(props) => props.theme.color.softBlackColor};
  font-size: ${(props) => props.theme.fontSize.font14};
`;