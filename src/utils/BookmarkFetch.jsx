import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';

// Hooks
import useAxiosFetch from '@hooks/useAxiosFetch';
import { useToggle } from '@hooks/useToggle';

// reduce
import { AppDataContext } from '@store/App_Store';

export default function BookmarkFetch({ _id, initToggle }) {
  // fetch
  const [ , , , bookmarkFetch] = useAxiosFetch();

  const { loginOn, setUnAuth } = useContext(AppDataContext);
  
  // toggle
  const [bookmark, toggleBookmark] = useToggle();

  const toggleHandler = (e) => {
    if(!loginOn){
      setUnAuth(true)
      return;
    }

    toggleBookmark();

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/interaction/bookmark`;
    bookmarkFetch(
        URL,
        bookmark ? 'post' : 'delete',
        {
          boardId: _id,
        },
        null
      );
  };

  useEffect(() => {
    toggleBookmark(initToggle);
  }, []);

  return (
      <ReactBtnWrap>
        <BookmarkBtn
          bookmark={bookmark}
          onClick={ () => toggleHandler() } />
      </ReactBtnWrap>
  );
}

// 버튼 wrap
const ReactBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
