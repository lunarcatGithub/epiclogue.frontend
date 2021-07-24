import React, { useContext, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// component import
import FeedbackReply from './Feedback__Reply';
import FeedbackModify from './Feedback__Modify';

// Hooks
import { useToggle } from '@hooks/useToggle';
import { useUrlMove } from '@hooks/useUrlMove';

// reduce
import { ViewerContext } from '@store/ViewerStore';
import { AppDataContext } from '@store/App_Store';

// utils
import LikeFetch from '@utils/LikeFetch';
import IsFollowFetch from '@utils/isFollowFetch';

const FeedBack = ({ type, FeedbackData, contentPopup, feedbackReplyPopup, tagetScreenIdMention }) => {

  // reduce
  const { loginOn, setUnAuth } = useContext(AppDataContext);

  const {
    setTypeMenuPopup,
    setUserPopup,
    setPopupType,
    setTargetUser_Type,
    feedbackModifyMode,
    setFeedbackUid,
    setFeedbackModifyMode
  } = useContext(ViewerContext);

  const [comment, toggle_comment] = useToggle();

  const [profileImg, setProfileImg] = useState();
  const [nickName, setNickName] = useState('');
  const [screenId, setScreenId] = useState('');
  const [followMe, setFollowMe] = useState('');
  const [thisIsMe, setThisIsMe] = useState(false);

  // const [reConverted, reConvert] = useConvertTags();

  // ============================
  const [goURL] = useUrlMove();


  const replyPopupCtrl = () => {
    setUserPopup(true);
    setPopupType('');
    setTypeMenuPopup(
      <FeedbackReply 
        boardUid={FeedbackData?.boardId} 
        feedbackUid={FeedbackData?._id}
        FeedbackData={FeedbackData}
      />
    );
  };

  useEffect(() => { // 뷰어와 피드백 팝업 분기점
    const { screenId, following, nickname, profile } = FeedbackData?.writer;
    console.log(following);
    console.log(FeedbackData?.writer);
    setScreenId(screenId);
    setProfileImg(profile?.thumbnail);
    setNickName(nickname);
    setFollowMe(following === 'me');
 
  }, [FeedbackData?.writer]);
  
  return (
      <FeedbackUserWrap isMe={thisIsMe}>
        <UserLink onClick={() => goURL({ pathname: `/myboard/${screenId}` })}>
          <ProfileImgBox>
            <FeedbackProfileImg profile={profileImg} />
          </ProfileImgBox>
        </UserLink>
        <FeedbackProfileWrap>
          <FeedbackProfile>
            <UserLink onClick={() => goURL({ pathname: `/myboard/${screenId}` })}>
              <FeedbackNickInfo>{nickName}</FeedbackNickInfo>
            </UserLink>
            {
              !followMe && loginOn && <IsFollowFetch _id={FeedbackData?.writer?._id} initFollow={FeedbackData?.following} />
            }
          </FeedbackProfile>
          <FeedbackProfile>
            <UserLink onClick={() => goURL({ pathname: `/myboard/${screenId}` })} >
              <FeedbackIdInfo>@{screenId}</FeedbackIdInfo>
            </UserLink>
          </FeedbackProfile>
        </FeedbackProfileWrap>
        { type !== 'popupFeedback' && 
          <FdMoreMenuAnchor
            onClick={ () => {
              setFeedbackUid(FeedbackData?._id);
              setFeedbackModifyMode(false)
              if(loginOn){
                if(type === 'Feedback'){
                  contentPopup(screenId, FeedbackData?.writer?._id, FeedbackData._id);
                  setTargetUser_Type('Feedback');
                } else {
                  feedbackReplyPopup(FeedbackData._id, screenId, FeedbackData?.writer?._id);
                  setTargetUser_Type('Reply');
                }
              } else {
                setUnAuth(true)
              } } } >
            <MoreMenuDot />
          </FdMoreMenuAnchor> 
        }
          <FeedbackContentBox>
            <FeedbackModify FeedbackData={FeedbackData} />
          </FeedbackContentBox> 
        { !feedbackModifyMode && // 수정하기 모드일 경우에는 임시 제거
          <FeedbackBtnWrap>
          <LikeFetch 
            _id={FeedbackData?._id} 
            initLike={FeedbackData?.liked}
            initialCount={FeedbackData?.heartCount}
            type={ type === 'popupReply' ? 'Reply' : 'Feedback' }
          />
          <ReactBtnWrap>
          {
            type === 'popupReply' || type === 'popupFeedback' ? <></>
            // <ReReFbBtn onClick={() => tagetScreenIdMention(screenId)} />
            // 향후 멘션 기능 도입
            :
            <ReFbBtn
              comment={comment}
              onClick={ () => replyPopupCtrl() }
            />
          }
          </ReactBtnWrap>
        </FeedbackBtnWrap>
        }
      </FeedbackUserWrap>
  );
};

const fadeIn = keyframes`
0% {
  opacity:0;
  max-height:0;
},
100% {
  opacity:1;
  max-height:25em;
}
`

//버튼
const MoreMenuDot = styled.span`
  display: flex;
  ${(props) => props.theme.moreMenu};
`;

// 공통
const ImgButtonfb = css`
  position: absolute;
  width: 46px;
  height: 46px;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
`;

const FdMoreMenuAnchor = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  justify-content: center;
  align-items: center;

  top: 4px;
  right: 12px;
  ${ImgButtonfb}
`;

// 피드백 댓글 입력란

const FeedbackUserWrap = styled.div`
  position: relative;
  padding: 0.5em;
  height: auto;
  max-height: 25em;
  margin-bottom: 3px;
  background: ${(props) => props.theme.color.whiteColor};
  border:3px solid ${({ isMe, theme }) => isMe ? theme.color.semiOrangeColor : theme.color.whiteColor};
  
  animation:${fadeIn} .5s ease-in-out normal;

`;

// 반응 탭

// 피드백 프로필 유저영역
const FeedbackProfileWrap = styled.div`
  display: flex;
  flex-flow: column;
  min-width: 0;
  margin-left: 58px;
`;
const FeedbackProfile = styled.div`
  display: flex;
  flex-direction: row;
`;
const ProfileImgBox = styled.div`
  position: absolute;
  top: 0.8em;
  left: 16px;
  width: 42px;
  height: 42px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const FeedbackProfileImg = styled.span`
  background: ${(props) => (props.profile ? `url(${props.profile}) no-repeat center center / cover` : `${props.theme.color.hoverColor}`)};
  /* background: ${(props) => `${props.theme.color.hoverColor}`}; */
  width: 100%;
  height: 100%;
`;
// 유저 Link

const UserLink = styled.a`
  display: flex;
  min-width: 0;
`;

// 유저 닉네임
const FeedbackNickInfo = styled.span`
  line-height: 18px;
  padding-top: 2px;
  margin-top: 4px;
  padding-right: 5px;
  ${(props) => props.theme.textTwoLine};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
  cursor: pointer;
`;


// 유저 아이디
const FeedbackIdInfo = styled.span`
  ${(props) => props.theme.textOneLine};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.darkGray};
  height: 18px;
  margin-top: 2px;
  margin-left: 2px;
  padding-right: 60px;
  cursor: pointer;
`;
const FeedbackContentBox = styled.div`
  display: flex;
  width: 100%;
`;

// 피드백 대댓글 버튼 및 좋아요

const FeedbackBtnWrap = styled.div`
  display: flex;
  padding: 0.4em 0 0.8em 3.5em;
  margin-bottom: 3px;
`;

// 버튼 wrap
const ReactBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 댓글 및 좋아요 버튼
const ReFbBtn = styled.button`
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: transform 0.1s ease-in-out;
  cursor: pointer;
  &::before {
    content: '';
    background: url(${(props) => (props.comment ? '/static/comment-2.svg' : '/static/comment-1.svg')}) no-repeat center / contain;
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
    }
  }
`;

export default React.memo(FeedBack);
