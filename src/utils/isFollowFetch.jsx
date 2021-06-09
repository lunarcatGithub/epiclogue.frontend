import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components';

// component import
import ViewerLanguage from '@component/view/Viewer.Language';

// Hooks
import useAxiosFetch from '@hooks/useAxiosFetch';
import { useToggle } from '@hooks/useToggle';

export default function IsFollowFetch({ _id, initFollow }) {

  // 팔로우 언어
    const { _followBtn, _followingBtn } = ViewerLanguage();

  const [, , , feedbackFetch] = useAxiosFetch();

  // toggle
  const [follow, toggle_follow] = useToggle();

  const submitHandler = (e) => {
    e.preventDefault();
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/interaction/follow`;
      feedbackFetch(URL, follow ? 'post' : 'delete', { targetUserId: _id }, null);
  };
  
  useEffect(() => { 
    toggle_follow(initFollow)
  }, [initFollow])

  return (
    <form action="" method="post" onSubmit={submitHandler}>
      <FeedbackFollowTxt clickState={follow} onClick={() => toggle_follow()}>
        { follow ? _followingBtn : _followBtn }
      </FeedbackFollowTxt>
    </form>
  );
}
/* 애니메이션 */

const Following = keyframes`
from{
  color:rgba(164, 159, 186, 1);
}
to{
  color:rgba(241, 173, 57, 0.8);
}
`;
const UnFollowing = keyframes`
from{
  color:rgba(241, 173, 57, 0.8);
}
to{
  color:rgba(164, 159, 186, 1);
}
`;

const FeedbackFollowTxt = styled.button.attrs({
  type: 'submit',
})`
    white-space: nowrap;
  margin-right: 58px;
  margin-top: 4px;
  font-weight: ${(props) => props.theme.fontWeight.font500};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.font14};

  flex-shrink: 0;
  animation: ${(props) => (props.clickState ? Following : UnFollowing)} 0.3s ease forwards;
`;