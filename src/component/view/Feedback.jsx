import React, { useContext, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// component import
import FeedbackReply from './Feedback__Reply';
import ViewerLanguage from './Viewer.Language';

// Hooks
import { useToggle } from '@hooks/useToggle';
import { useTimeCalculation } from '@hooks/useTimeCalculation';
import { useConvertTags } from '@hooks/useConvertTags';
import useAxiosFetch from '@hooks/useAxiosFetch';
import { useUrlMove } from '@hooks/useUrlMove';

// reduce
import { ViewerContext } from '@store/ViewerStore';
import { AppDataContext } from '@store/App_Store';


// porps.data._id 는 댓글  uid, writer._id = 작성자의 uid
const FeedBack = ({ type, FeedbackData, contentPopup, feedbackReplyPopup, tagetScreenIdMention }) => {
  
  // 피드백 언어
  const { _followBtn, _followingBtn } = ViewerLanguage();

  // reduce
  const { loginOn, setUnAuth } = useContext(AppDataContext);

  const {
    setTypeMenuPopup,
    setUserPopup,
    setPopupType
  } = useContext(ViewerContext);
  
  const [getIndicateDate, setGetIndicateDate] = useState();
  const [indicateDate] = useTimeCalculation(getIndicateDate);

  const [follow, toggle_follow] = useToggle();
  const [like, toggle_like] = useToggle();
  const [comment, toggle_comment] = useToggle();

  const [profileImg, setProfileImg] = useState();
  const [nickName, setNickName] = useState();
  const [screenId, setScreenId] = useState();
  const [followMe, setFollowMe] = useState();

  // 태그 및 하이퍼링크 convert
  const [converted, convert] = useConvertTags();
  // const [reConverted, reConvert] = useConvertTags();

  // ============================
  const [_heartCount, setHeartCount] = useState();
  const [goURL] = useUrlMove();
  
  //언어 변수

  // fetch
  const [, , , feedbackFetch] = useAxiosFetch();
  const [, likeApi, , likeFetch] = useAxiosFetch();

  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const submitHandler = (e, _type) => {
    e.preventDefault();
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/interaction/${_type}`;
    if (_type === 'follow') {
      feedbackFetch(URL, follow ? 'post' : 'delete', { targetUserId: FeedbackData?.writer?._id }, null);
    } else if (_type === 'like') {
      likeFetch(
        URL,
        like ? 'post' : 'delete',
        {
          targetInfo: FeedbackData?._id,
          targetType: type === 'popupReply' ? 'Reply' : 'Feedback',
        },
        null
      );
    }
  };

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

    convert(FeedbackData?.feedbackBody || FeedbackData?.replyBody);
    setHeartCount();
    setGetIndicateDate(FeedbackData?.writeDate);
    toggle_follow(FeedbackData?.following);
    toggle_like(FeedbackData?.liked);
    setScreenId(screenId);
    setProfileImg(profile?.thumbnail);
    setNickName(nickname);
    setFollowMe(following === 'me');
  }, []);

  return (
      <FeedbackUserWrap>
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
              !followMe && loginOn && (
                <form action="" method="post" onSubmit={(e) => submitHandler(e, 'follow')}>
                  <FeedbackFollowTxt clickState={follow} onClick={() => toggle_follow()}>
                    { follow ? _followingBtn : _followBtn }
                  </FeedbackFollowTxt>
                </form> )
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
              if(loginOn){
                if(type === 'Feedback'){
                  contentPopup(screenId, '');
                } else {
                  feedbackReplyPopup(FeedbackData._id, screenId);
                }
              } else {
                setUnAuth(true)
              } } } >
            <MoreMenuDot />
          </FdMoreMenuAnchor> 
        }
            <FeedbackContentBox>
              <FeedbackContentInner modify={false}>
                
                  <ModifiForm>
                    <FeedbackTextContent>{converted}</FeedbackTextContent>
                    {/* { type === 'ReFb' && <FeedbackTextContent>{reConverted}</FeedbackTextContent>} */}
                    <FeedbackPostedTime>{`Posted by ${indicateDate}`}</FeedbackPostedTime>
                  </ModifiForm>
              </FeedbackContentInner>
            </FeedbackContentBox> 
        <FeedbackBtnWrap>
          <form onSubmit={(e) => submitHandler(e, 'like')}>
            {/* 피드백 좋아요 버튼 */}
            <ReactBtnWrap>
              <LikeFbBtn
                heart={like}
                onClick={() =>  loginOn ? toggle_like() : setUnAuth(true) }
              />
              <LikeFbScore>{_heartCount && _heartCount}</LikeFbScore>
            </ReactBtnWrap>
          </form>
          <ReactBtnWrap>
          {
            type === 'popupReply' || type === 'popupFeedback' ? <></>
            // <ReReFbBtn onClick={() => tagetScreenIdMention(screenId)} />
            :
            <ReFbBtn
              comment={comment}
              onClick={ () => replyPopupCtrl() }
            />
          }
          </ReactBtnWrap>
        </FeedbackBtnWrap>
      </FeedbackUserWrap>
  );
};

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
  padding: 8px;
  height: auto;
  max-height: 400px;
  margin-bottom: 3px;
  background: ${(props) => props.theme.color.whiteColor};
`;

// 더보기 메뉴

// 프로필 이미지
const FollowTxt = css`
  white-space: nowrap;
  margin-right: 58px;
  margin-top: 5px;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.font14};
`;
const TimePost = css`
  margin: 8px 0 3px 6px;
  font-weight: ${(props) => props.theme.fontWeight.font300};
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.softBlackColor};
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

const FeedbackFollowTxt = styled.button.attrs({
  type: 'submit',
})`
  ${FollowTxt};
  flex-shrink: 0;
  animation: ${(props) => (props.clickState ? Following : UnFollowing)} 0.3s ease forwards;
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
const FeedbackContentInner = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
  margin-top: 6px;
  margin-right: 1em;
  margin-left: ${props => props.modify ? `0em` : `3.5em`};
  
`;
const FeedbackContent = styled.span`
  margin-left: 6px;
  font-weight: ${(props) => props.theme.fontWeight.font300};
  line-height: 20px;
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
`;
const FeedbackPostedTime = styled.span`
  ${TimePost};
`;
const FeedbackTextContent = styled(FeedbackContent)`
  margin: 8px 5px;
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
const ReFbBtn = styled.button.attrs({ type: 'button' })`
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

const ReReFbBtn = styled(ReFbBtn)`
  &::before {
    background: url('/static/atIcon.svg') no-repeat center / contain;
  }
  &:active {
    &:after {
      width: 32px;
      height: 32px;
      background: ${(props) => props.theme.color.opacitySkyColor};
    }
  }
`;

const ReFbScore = styled.span`
  margin-left: 6px;
  margin-top: 2px;
  margin-right: 60px;
  color: ${(props) => props.theme.color.softBlackColor};
  font-size: ${(props) => props.theme.fontSize.font14};
`;

const LikeFbBtn = styled(ReFbBtn).attrs({ type: 'submit' })`
  &::before {
    background: url(${(props) => (props.heart ? '/static/heart-2.svg' : '/static/heart-1.svg')}) no-repeat center / contain;
  }
  &:active {
    &:after {
      background: ${(props) => props.theme.color.softPinkColor};
    }
  }
`;

const LikeFbScore = styled(ReFbScore)`
  margin-left: 4px;
`;

// 수정하기 스타일링
const ModifiForm = styled.form`
  display: flex;
  flex-direction: column;
  resize: none;
`;
const ModifiWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 900px) {
    margin-bottom: 10px;
  }
`;
const TextAreaForm = styled.textarea.attrs({
  autoFocus: 'autofocus',
})`
  display: block;
  resize: none;
  border-bottom: 2px solid ${(props) => props.theme.color.hoverColor};
  margin: 12px 0 0 58px;
  padding: 4px 8px 0 6px;
  background: ${(props) => props.theme.color.backgroundColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  transition: all 0.2s ease;
  &::-webkit-scrollbar {
    display: none;
  }
  &:focus {
    border-bottom: 2px solid ${(props) => props.theme.color.orangeColor};
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 4px;
  padding-right: 26px;
`;

const CloseBtn = styled.button`
  display: flex;
  width: auto;
  padding: 6px 14px;
  border: 1px solid ${(props) => props.theme.color.softBlackColor};
  border-radius: 8px;
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.softBlackColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.color.softGrayColor};
  }
`;

const CheckBtn = styled(CloseBtn)`
  border: 1px solid ${(props) => props.theme.color.skyColor};
  color: ${(props) => props.theme.color.whiteColor};
  background: ${(props) => props.theme.color.skyColor};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  margin-left: 8px;
  &:hover {
    background: ${(props) => props.theme.color.softSkyColor};
  }
`;

export default React.memo(FeedBack);
