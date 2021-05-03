import React, { useEffect, useContext, useState } from 'react';
import styled, { css } from 'styled-components';

// 컴포넌트 import
import { ReplyListContext } from './Viewer';
import ViewerLanguage from './Viewer.Language';

// Hooks&&reducer
import useAxiosFetch from '@hooks/useAxiosFetch';

const ReactPopup = () => {

  const [reactData, setReactData] = useState([]);
  const { boardUid, toggle_Modal_React } = useContext(ReplyListContext);

  //언어 변수
  const {
    _reactTxt,
    _reactShare,
    _reactLike,
    _reactBookmark,
    _reactFeedback,
    _noReact,
    _closeBtn
  } = ViewerLanguage();

  const [, initialApi, , initialFetch] = useAxiosFetch();

  useEffect(() => {
    initialFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}/react`, 'get', null, null);
  }, []);

  useEffect(() => {
    initialApi && setReactData(initialApi?.data);
  }, [initialApi]);

  return (
    <PopupInner>
      <PopupTabTitle>
        <PopupTitleBox>
          <ReactIconImg />
          <PopupTitle>
            {_reactTxt} ({reactData.length})
          </PopupTitle>
        </PopupTitleBox>
      </PopupTabTitle>
      <PopupTabBox onClick={(e) => e.stopPropagation()}>
        {reactData.length !== 0 ? (
          reactData.map((item, index) => {
            return (
              <PopupTab key={index}>
                <UserProfileImgWrap>
                  <UserProfileImg profile={item?.user?.profile?.thumbnail} />
                </UserProfileImgWrap>
                <RecreateImgBox>
                  {item.type === 'secondary' && <RecreateImg reactImg={'/static/globe-2.svg'} />}
                  {item.type === 'like' && <LikeImg reactImg={'/static/heart-2.svg'} />}
                  {item.type === 'bookmark' && <BookmarkImg reactImg={'/static/bookmark-2.svg'} />}
                  {item.type === 'comment' && <FeedbackImg reactImg={'/static/comment-2.svg'} />}
                </RecreateImgBox>
                <UserProfile>
                  <TabUserNick>{item.user.nickname}</TabUserNick>
                  {item.type === 'share' && <UserStateRecre>{_reactShare}</UserStateRecre>}
                  {item.type === 'like' && <UserStateRecre>{_reactLike}</UserStateRecre>}
                  {item.type === 'bookmark' && <UserStateRecre>{_reactBookmark}</UserStateRecre>}
                  {item.type === 'comment' && <UserStateRecre>{_reactFeedback}</UserStateRecre>}
                  <StatedTime>{item.reactTime}</StatedTime>
                </UserProfile>
                <TabUserId>{item.user._id}</TabUserId>
              </PopupTab>
            );
          })
        ) : (
          <NoDataLayout>
            {/* 데이터가 없을 경우 */}
            <NoDataImg />
            <NoDataTxt>{_noReact}</NoDataTxt>
          </NoDataLayout>
        )}
      </PopupTabBox>
      <PopupCloseBox>
        <PopupClose onClick={() => toggle_Modal_React()}>{_closeBtn}</PopupClose>
      </PopupCloseBox>
    </PopupInner>
  );
};

/* 뷰어 팝업 레이아웃 */

const PositionCenter = css`
  position: fixed;
  z-index: 100000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PopupCloseBox = styled.div`
  width: 100%;
`;
const PopupClose = styled.button.attrs({ type: 'submit' })`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 6px 0;
  margin-bottom: 3px;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.softBlackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
`;

//모달 레이아웃
const PopupInner = styled.div`
  ${PositionCenter};
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  overflow: hidden;
  min-width: 360px;
  width: 480px;
  height: 100%;
  max-height: 480px;
  border-radius: 12px;
  background: ${(props) => props.theme.color.backgroundColor};
  box-shadow: ${(props) => props.theme.boxshadow.popup};
  @media (max-width: 900px) {
    width: 360px;
  }
`;

/* 반응 팝업 */

//탭 레이아웃
const PopupTabTitle = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  position: relative;
  padding-left: 12px;
  width: 100%;
  height: 52px;
  margin-bottom: 3px;
  background: ${(props) => props.theme.color.whiteColor};
`;
// 2차 창작 헤더 탭
const PopupTitleBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 12px;
`;
const ReactIconImg = styled.svg`
  background: url('/static/react.svg') no-repeat center center / contain;
  width: 18px;
  height: 20px;
  margin-top: 2px;
`;
const PopupTitle = styled.span`
  padding-left: 8px;
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font700};
`;

// 탭 유저 프로필 이미지
const PopupTabBox = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
  overflow-x: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera*/
  }
`;
const PopupTab = styled(PopupTabTitle)`
  position: relative;
  padding: 7px 4px;
  width: 100%;
  height: 4em;
  margin-bottom: 3px;
  background: ${(props) => props.theme.color.whiteColor};
`;
// 유저 프로필
const UserProfileImgWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translate(0, -50%);
  min-width: 42px;
  width: 42px;
  min-height: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
`;
const UserProfileImg = styled.span`
  background: ${(props) => (props.profile ? `url(${props.profile}) no-repeat center center / cover` : `${props.theme.color.hoverColor}`)};
  width: 100%;
  height: 100%;
`;
// 탭 유저 프로필 이미지 >> 2차 창작
const RecreateImgBox = styled.div`
  position: absolute;
  top: 50%;
  left: 11px;
  display: flex;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${(props) => props.theme.color.whiteColor};
`;

const RecreateImg = styled.svg`
  background: url(${(props) => props.reactImg}) no-repeat center center / contain;
  width: 20px;
  height: 19px;
`;
// 탭 유저 프로필 이미지 >> 공유하기
// const ShareImg = styled(RecreateImg)`
//   width: 17px;
//   height: 19px;
// `;
// 탭 유저 프로필 이미지 >> 좋아요
const LikeImg = styled(RecreateImg)`
  width: 26px;
  height: 24px;
`;
// 탭 유저 프로필 이미지 >> 북마크
const BookmarkImg = styled(RecreateImg)`
  top: 54%;
  width: 24px;
  height: 24px;
`;
// 탭 유저 프로필 이미지 >> 피드백
const FeedbackImg = styled(RecreateImg)`
  top: 57%;
  left: 9px;
  width: 24px;
  height: 22px;
`;

// 탭 유저 프로필
const UserProfile = styled.div`
  display: flex;
  min-width: 0;
  padding-left: 4.5em;
`;
const TabUserNick = styled.span`
  ${(props) => props.theme.textTwoLine};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
  height: 17px;
`;
const UserStateRecre = styled.span`
  flex-shrink: 0;
  padding-left: 14px;
  white-space: nowrap;
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.darkGray};
  font-weight: ${(props) => props.theme.fontWeight.font700};
`;
const StatedTime = styled(UserStateRecre)`
  padding-right: 20px;
`;
const TabUserId = styled.span`
  ${(props) => props.theme.textOneLine};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.darkGray};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  padding-left: 4.5em;
  padding-right: 1em;
  margin: 0.3em 0;
`;
// 데이터가 없을 경우
const NoDataLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const NoDataImg = styled.svg`
  display: block;
  background: url('/static/react_heart.svg') no-repeat center center / contain;
  width: 100%;
  height: 100%;
  margin: 1.8em 0;
`;
const NoDataTxt = styled.span`
  font-size: ${(props) => props.theme.fontSize.font26};
  color: ${(props) => props.theme.color.blackOpacity};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  opacity: 0.4;
  margin-bottom: 1.5em;
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font20};
  }
`;

export default ReactPopup;
