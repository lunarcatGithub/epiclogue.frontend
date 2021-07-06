import React, { useContext, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components';

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

  const toggleHandler = () => {
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
        <BtnBox>
        <BookmarkBtn
          bookmark={bookmark}
          onClick={ () => toggleHandler() }
        />
        </BtnBox>
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BtnBox = styled.div`
position:relative;
width:2em;
`

const BookmarkBtn = styled.button`
  ${center};
  display:flex;
  width:2em;
  height:2em;
  background:url( ${ ( { bookmark } ) => bookmark ? '/static/bookmark-2.svg' : '/static/bookmark-1.svg' }) no-repeat center center / contain;
  transition: all 0.2s ease-in-out;

  &:active {
    ${ ({ bookmark }) => !bookmark &&
    ` 
    width:1.2em; 
    height:1.2em;
    `
    };
      animation:${buttonAnimation} 0.2s ease-in-out normal;

  }
  
  &::before {
    ${ ({ bookmark }) => bookmark &&
    `
    content:'';
    border:2px solid #F3BD60;
    `
    };
    ${center};
    left:51%;
    opacity:0;
    border-radius:50%;
    animation:${restoreBtn} 0.5s ease-in-out normal;
  }

  &::after {
    ${ ({ bookmark }) => bookmark &&
    `
    content:'';
    border:1px solid #F3BD60;
    `
    };
    ${center};
    left:51%;
    opacity:0;
    border-radius:50%;
    animation:${restoreBtn} 0.5s 0.1s ease-in-out normal;
  }
`;
