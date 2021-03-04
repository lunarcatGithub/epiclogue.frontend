import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
  
// 컴포넌트 import
import { LangHeaderInform } from '@language/Lang.Header';
import {HeaderDataContext} from './Header';

// hooks&&reducer
import { useUrlMove } from '@hooks/useUrlMove';
import { LanguageContext, AppDataContext} from '@store/App_Store';
import useAxiosFetch from '@hooks/useAxiosFetch';

const UserInform = () => {
  const { langState } = useContext(LanguageContext);
  const { toggleNoti } = useContext(HeaderDataContext);
  const { loginOn } = useContext(AppDataContext);
  const informRef = useRef();
  // 유저 알림
  const [goURL] = useUrlMove();

 // 알림 스크롤
 const [items, setItems] = useState(20);
 const [sliceData, setSliceData] = useState(null);
 const [tagetUser, setTargetUser] = useState();

 //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { 
    headerInfrom,
    userReactLike, 
    userFeedback, 
    userSecondary, 
    userBookmark, 
    userFollowMe, 
    userReply,
    dataRemove,
    feedbackRemove
  } = LangHeaderInform;

  const _headerInfrom = headerInfrom[selectedLanguage] || headerInfrom[defaultLanguage],
        _userReactLike = userReactLike[selectedLanguage] || userReactLike[defaultLanguage],
        _userFeedback = userFeedback[selectedLanguage] || userFeedback[defaultLanguage],
        _userSecondary = userSecondary[selectedLanguage] || userSecondary[defaultLanguage],
        _userBookmark = userBookmark[selectedLanguage] || userBookmark[defaultLanguage],
        _userFollowMe = userFollowMe[selectedLanguage] || userFollowMe[defaultLanguage],
        _userReply = userReply[selectedLanguage] || userReply[defaultLanguage],
        _dataRemove = dataRemove[selectedLanguage] || dataRemove[defaultLanguage],
        _feedbackRemove = feedbackRemove[selectedLanguage] || feedbackRemove[defaultLanguage];
    
  //fetch
  const [notiLoding, notiApi, notiError, notiFetch] = useAxiosFetch();
  const [infromLoding, , infromError, infromFetch] = useAxiosFetch();

  useEffect(() => {
    if(notiApi){
      let data;
      data = notiApi?.data.map(i => i).filter(i => i !== undefined )
      setTargetUser(data)
      setSliceData(data?.slice(0, items))
    }
    
  }, [notiApi])

  // 알림용 무한 스크롤
  const infinityScroll = () => {
    
    let scrollHeight = informRef?.current?.scrollHeight;

    let scrollTop = informRef?.current?.scrollTop;

    let clientHeight = informRef?.current?.clientHeight;
    
    if(scrollTop + clientHeight === scrollHeight){
      setItems( items => items + 10);
      setSliceData(tagetUser?.slice(10, items))
    }
  }

  // 유저 알림 API
  useEffect(() => {
    if(!loginOn) return;
    notiFetch(`${process.env.API_URL}/notification`, 'get', null, null, null)
  },[toggleNoti]);

    // 읽음 처리용
  useEffect(()=> {
    if(!loginOn) return;
    infromFetch(`${process.env.API_URL}/notification/all`, 'patch', null);
  },[]);

  useEffect(()=> {
    infinityScroll()
    return () => {
      infinityScroll()
    }
  },[])

  return (
    <InformContainer>
      <InformHeader>
        <InformIcon />
        <InformText>{_headerInfrom}</InformText>
          <ClosedBox>
            <ClosedBtn onClick={() => toggleNoti()}/>
          </ClosedBox>
      </InformHeader>
      <InformBodyInner onScroll={infinityScroll} ref={informRef}>
        {/* {sliceData &&  */}
        {sliceData && sliceData.map(({maker, notificationType, read, targetInfo, targetType}, key) => (
            <ContentBox
              key={key}
              read={read}
              onClick={() => {
                if(!targetInfo) return;
                if(notificationType === "Follow"){
                  goURL({pathname:`/myboard/${maker.screenId}`});
                } else if(notificationType === "Reply"){
                  goURL({pathname:`/viewer/${targetInfo.boardId}`})
                } else{
                  goURL({pathname:`/viewer/${targetInfo._id}`})
                }
                toggleNoti();
              }}
            >
              {/* 유저 이미지 */}
              <UserImgWrap>
                <UserImgBox>
                <UserImg profile={maker.profile.thumbnail} />
                  <InformTypeIcon>
                    {notificationType === 'Bookmark' && <BookmarkImg infoImg={'/static/bookmark-2.svg'} />}
                    {notificationType === 'Feedback' && <FeedbackImg infoImg={'/static/comment-3.svg'} />}
                    {notificationType === 'Like' && <LikeImg infoImg={'/static/heart-2.svg'} />}
                    {notificationType === 'Secondary' && <RecreateImg infoImg={'/static/globe-2.svg'} />}
                    {notificationType === 'Follow' && <FollowImg infoImg={'/static/followAdd.svg'} />}
                    {notificationType === 'Reply' && <ReplyImg infoImg={'/static/comment-2.svg'} />}
                  </InformTypeIcon>
                </UserImgBox>
              </UserImgWrap>
              {/* 콘텐츠 내용 */}
              <ContentRColumn>
                <TextBox>
                  <UserText >{maker.nickname}
                  {notificationType === 'Bookmark' && <UserInteract>{_userBookmark}</UserInteract>}
                  {notificationType === 'Feedback' && <UserInteract>{_userFeedback}</UserInteract>}
                  {notificationType === 'Like' && <UserInteract>{_userReactLike}</UserInteract>}
                  {notificationType === 'Secondary' && <UserInteract>{_userSecondary}</UserInteract>}
                  {notificationType === 'Follow' && <UserInteract>{_userFollowMe}</UserInteract>}
                  {notificationType === 'Reply' && <UserInteract>{_userReply}</UserInteract>}
                  </UserText>
                </TextBox>
                {
                  targetInfo ?
                    <InteractContent>{targetInfo?.boardTitle || targetInfo?.feedbackBody}</InteractContent>
                    :
                    <DeletedContent>{_dataRemove}</DeletedContent>
                }
              </ContentRColumn>
            </ContentBox>
            )
          )
        }
      </InformBodyInner>
    </InformContainer>
  );
};


/* 알림 스타일링 */
// 공통
//레이아웃

const InformContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 550px;
  height: 650px;
  overflow: hidden;
  border-radius: 0.5em;
  z-index: 9999999;
  box-shadow: ${(props) => props.theme.boxshadow.popup3};
  background: ${(props) => props.theme.color.backgroundColor};

  @media (max-width: 900px) {
   width: 100%;
  height: 100%;
  border-radius: 0em;
  }
`;

// 알림 헤더
const InformHeader = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: auto;
  margin-bottom: 3px;
  padding: 0.6em;
  background: ${(props) => props.theme.color.whiteColor};
`;

const InformIcon = styled.svg`
  background: url('/static/informOn.svg') no-repeat center center / contain;
  margin-left: 0.8em;
  width: 36px;
  height: 32px;
`;
const InformText = styled.p`
  margin-left: 0.5em;
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font700};
`;
  // 닫기 버튼
  const ClosedBox = styled.button`
  position:absolute;
  display:flex;
  justify-content:center;
  align-items:center;
  top:0.6em;
  right: 1.5em;
  border-radius:50%;
  width:3em;
  height:3em;
  overflow:hidden;
`
const ClosedBtn = styled.span`
  ${props => props.theme.closeBtn};
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
`;
// 알림 body 콘텐츠

const InformBodyInner = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-x: hidden;
  z-index:999;
  &::-webkit-scrollbar {
    display: block;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.hoverColor};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${(props) => props.theme.color.orangeColor};
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;

const ContentBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: auto;
  padding: 14px 18px;
  margin-bottom: 2px;
  cursor: pointer;
  background: ${(props) => (props.read ? props.theme.color.whiteColor : props.theme.color.microOrangeColor)};
`;
const ContentRColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;
// 탭 유저 프로필 이미지 >> 2차 창작
const UserImgWrap = styled.div`
  position: relative;
  margin-right: 12px;
`;

const UserImgBox = styled.div`
  display: flex;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid #2222;
  overflow: hidden;
`;

const UserImg = styled.span`
  background:${props => props.profile ? `url(${props.profile}) no-repeat center center / cover` : `${props.theme.color.hoverColor}`};
  width: 100%;
  height: 100%;
`;
const InformTypeIcon = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: -9px;
  left: -9px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
`;

// 좋아요 아이콘
const BookmarkImg = styled.svg`
  background: url(${(props) => props.infoImg}) no-repeat center center / contain;
  width: 27px;
  height: 27px;
`;
// 북마크 아이콘
const LikeImg = styled(BookmarkImg)`
  height: 26px;
`;

// 피드백 아이콘
const FeedbackImg = styled(BookmarkImg)`
  margin-bottom: 5px;
`;
// 2차 창작
const RecreateImg = styled(BookmarkImg)``;
// 팔로우
const FollowImg = styled(BookmarkImg)``;
// 대댓글
const ReplyImg = styled(BookmarkImg)``;

// 콘텐츠 내용
const TextBox = styled.div`
  display: flex;
  min-width: 0;
  margin-bottom: 3px;
`;
const UserText = styled.span`
  line-height: 20px;
  ${(props) => props.theme.textTwoLine};
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  /* padding-right: 16px; */
  cursor: pointer;
`;

const UserInteract = styled.span`
  flex-shrink: 0;
  padding-left: 8px;
  padding-right: 12px;
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.darkGray};
`;
const InteractContent = styled.span`
  ${(props) => props.theme.textOneLine};
  flex-shrink: 0;
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  margin: 0.15em 0;
  line-height: 1.2em;
  cursor: pointer;
`;

const DeletedContent = styled(InteractContent)`
  color: ${(props) => props.theme.color.popupColor};
  font-weight: ${(props) => props.theme.fontWeight.font500};

`

export default UserInform;
