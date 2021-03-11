import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router'

// 컴포넌트 import
import FB from './Feedback';
import WriteFbForm from './Viewer__WriteFbForm';
import ReactPopup from './ReactPopup';
import MyPopup from './MyMoreMenuPopup';
import UserPopup from './UserMoreMenuPopUp';
import TranslatePopup from './TranslatePopup';
import { ProgressSmall } from '@utils/LoadingProgress';
import { langViewer, langViewerUser } from '@language/Lang.Viewer';
import { LangCommon } from '@language/Lang.Common';
import { langMetaViewer } from '@language/Lang.Meta';
import { Meta } from '@utils/MetaTags';
import Modal from '@utils/Modal';
import ConfirmPopup from '@utils/ConfirmPopup'; 
import Contents from '../content/Contents';
import ViewerUserForm from './Viewer__UserForm'

// Hooks&&reducer
import { useModal } from '@hooks/useModal';
import { useToggle } from '@hooks/useToggle';
import { useTimeCalculation } from '@hooks/useTimeCalculation';
import { useUrlMove } from '@hooks/useUrlMove';
import { useConvertURL } from '@hooks/useConvertURL';
import usePublic from '@hooks/usePublic';
import {useConvertTags} from '@hooks/useConvertTags';
import useAxiosFetch from '@hooks/useAxiosFetch';
import { LanguageContext, AlertContext, AppDataContext } from '@store/App_Store';

export const ReplyListContext = React.createContext();

const Viewer = ({boardItem, nonError}) => {
  const router = useRouter();
  const boardUid = router?.query?.id;

  const { alertPatch } = useContext(AlertContext);
  const [profileURL, , convertProfileIamge] = useConvertURL();
  const [O_profileURL, , convertO_ProfileIamge] = useConvertURL();
  const { langState } = useContext(LanguageContext);
  const {loginOn, setUnAuth} = useContext(AppDataContext);

  const [goURL] = useUrlMove();
  const [goUploadUpdate] = useUrlMove();

  const [replyList, setReplyList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [boardImg, setBoardImg] = useState([]);
  const [data, setData] = useState({});
  const [checkOrigin, setCheckOrigin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [getIndicateDate, setGetIndicateDate] = useState();
  const [_heartCount, setHeartCount] = useState();


  const [bookmark, toggleBookmark] = useToggle();
  const [like, toggleLike] = useToggle();
  const [globe, toggleGloobe] = useToggle();

  const [state_O_MoreMenu, toggle_O_Modal_MoreMenu] = useModal();
  const [state_MoreMenu, toggle_Modal_MoreMenu] = useModal();
  const [state_React, toggle_Modal_React] = useModal();
  const [state_Share, toggle_Modal_Share] = useModal();
  const [state_Trans, toggle_Modal_Trans] = useModal();
  const [allowSecondary, setAllowSecondary] = useModal();
  const [originDeleted, setOriginDeleted] = useModal();

  const [originId, setOriginId] = useState();
  const [secondAllow, setSecondAllow] = useState();
  
  // 외부 출처
  const [externalSource, setExternalSource] = useState();

  // 댓글 <-> 대댓글로 전송할 데이터
  const [fbUid, setFbUid] = useState();
  const [ReFbUid, setReFbUid] = useState();
  const [fbReList, setFbReList] = useState([]);

  // 피드백
  const [fbLoading, setFbLoading] = useState(false);
  const [prevFb, setPrevFb] = useState(3);
  const [fbTxt, setFbTxt] = useState();
  const [eventCtrl, setEventCtrl] = useState(true);

  // 공개 비공개 여부
  // const sessionId = localStorage.getItem('userid') 
  const sessionId = boardUid
  const _writer = data.screenId
  const pub = data.pub
  const _public = usePublic({pub, _writer, sessionId});

  // 작품이 삭제되거나 없을 경우
  const [noContents, setNoContents] = useState(false)

  // 태그 및 하이퍼링크 convert
  const [converted, convert] = useConvertTags();
  // 토글 submit 전용
  const [likeLoding, likeApi, likeError, likeFetch] = useAxiosFetch();
  const [bookmarkLoding, bookmarkApi, bookmarkError, bookmarkFetch] = useAxiosFetch();
  // const [initialLoding, initialApi, initialError, initialFetch] = useAxiosFetch();

  // ref
const feedbackRef = useRef();

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;

  const { contentsReact, feedbackScore, feedbackScoreEnd, feedbackPlaceholder, moreFeedback, firstFeedback, foldFeedback, moreContents, modified } = langViewer;

  const { originalUser, recreateUser, removedContents } = langViewerUser;

  const metaViewerTitle = langMetaViewer();
  const { followBtn, followingBtn } = LangCommon;
  const _contentsReact = contentsReact[selectedLanguage] || contentsReact[defaultLanguage],
    _feedbackScore = feedbackScore[selectedLanguage] || feedbackScore[defaultLanguage],
    _feedbackScoreEnd = feedbackScoreEnd[selectedLanguage] || feedbackScoreEnd[defaultLanguage],
    _feedbackPlaceholder = feedbackPlaceholder[selectedLanguage] || feedbackPlaceholder[defaultLanguage],
    _moreFeedback = moreFeedback[selectedLanguage] || moreFeedback[defaultLanguage],
    _firstFeedback = firstFeedback[selectedLanguage] || firstFeedback[defaultLanguage],
    _foldFeedback = foldFeedback[selectedLanguage] || foldFeedback[defaultLanguage],
    _moreContents = moreContents[selectedLanguage] || moreContents[defaultLanguage],
    _originalUser = originalUser[selectedLanguage] || originalUser[defaultLanguage],
    _recreateUser = recreateUser[selectedLanguage] || recreateUser[defaultLanguage],
    _removedContents = removedContents[selectedLanguage] || removedContents[defaultLanguage],
    _followBtn = followBtn[selectedLanguage] || followBtn[defaultLanguage],
    _followingBtn = followingBtn[selectedLanguage] || followingBtn[defaultLanguage],
    _modified = modified[selectedLanguage] || modified[defaultLanguage];

  const addList = () => {
    setFbLoading(true);
    if (renderList.length >= prevFb) {
      setPrevFb(prevFb + 3);
    }
    if (renderList.length <= prevFb) {
      setPrevFb(3);
    }
    setFbLoading(false);
  };

  // 피드백 갯수
  const checkFbLength = (length) => {
    if (length <= 3) {
      setFbTxt('');
    } else {
      setFbTxt(_moreFeedback);
    }
  };

  const fbMoreText = () => {
    setEventCtrl(true);
    if (renderList.length <= 3) {
      setFbTxt(_firstFeedback);
      setEventCtrl(false);
    } else {
      if (renderList.length <= prevFb) {
        setFbTxt(_foldFeedback);
      } else if (renderList.length > prevFb) {
        setFbTxt(_moreFeedback);
      }
    }
  };

  const sumitHandler = (e, type, targetType) => {
    e.preventDefault();
    if(!loginOn) return;
    
    const URL = `${process.env.API_URL}/interaction/${type}`;

    if(type === 'like'){
      likeFetch( URL, like ? 'post' : 'delete', {targetInfo: boardUid, targetType}, null)
    } else if(type === 'bookmark') {
      bookmarkFetch( URL, bookmark ? 'post' : 'delete', {boardId: boardUid}, null)
    }
  }

  useEffect(()=> {
    likeApi && setHeartCount(likeApi?.data.heartCount);
  }, [likeApi])

  // const checkO_MoreMenuType = () => {
  //   toggle_O_Modal_MoreMenu();
  //   if (data.originBoardId.screenId === localStorage.getItem('userid')) {
  //     setType_O_MoreMenu(<MyPopup type="O_More"  handleModal_Menu={() => toggle_O_Modal_MoreMenu(false)} />);
  //   } else {
  //     setType_O_MoreMenu(<UserPopup handleModal_Menu={() => toggle_O_Modal_MoreMenu(false)} />);
  //   }
  // };

  useEffect(() => {
    addList();
  }, []);

  useEffect(() => {
    fbMoreText();
  }, [renderList, eventCtrl, prevFb]);

  useEffect(() => {
    const initialData = boardItem;

    if (initialData?.result === 'ok') {
      const boardData = initialData.data;
      const replyList = initialData.data.feedbacks;
      const writer = initialData.data.writer;
      const {
        boardTitle,
        boardBody, 
        pub, 
        writeDate, 
        category, 
        heartCount, 
        originBoardId, 
        originUserId, 
        reactCount, 
        uid, 
        tags, 
        boardImg, 
        bookmarked, 
        edited, 
        liked,
        allowSecondaryCreation,
        sourceUrl
      } = boardData;
      const { screenId, nickname, _id, following, profile } = writer;

      setData({
        boardTitle,
        boardBody,
        pub,
        writeDate,
        category,
        originBoardId,
        originUserId,
        reactCount,
        uid,
        tags,
        screenId,
        nickname,
        _id,
        following,
        writer,
        edited,
        allowSecondaryCreation
      });

      if(originUserId){
        setOriginId(originUserId._id)
      }
      //tag && email convert
      // setBody(boardBody);
      convert(boardBody)
      
      // useProfile
      convertProfileIamge(profile?.origin);
      toggleBookmark(!loginOn ? false : bookmarked);
      toggleLike(!loginOn ? false : liked);
      setReplyList(replyList);
      setRenderList(replyList);

      setBoardImg(boardImg);
      setHeartCount(heartCount);
      setIsLoading(false);
      setGetIndicateDate(writeDate, '');
      setExternalSource(sourceUrl === 'null' ? false : sourceUrl);

      // secondAllow
      setSecondAllow(allowSecondaryCreation);
      if (originUserId === '' || originUserId === null || originUserId === undefined) {
        setCheckOrigin(false);
      } else {
        convertO_ProfileIamge(originUserId?.profile?.thumbnail);
        setCheckOrigin(true);
      }
    } else if (initialData?.result === 'error') {
      alert(initialData.message);
      if (initialData.message === 'token 유효기간 만료 또는 토큰이 전송되지 않았습니다.') {
        window.location.href = '/login';
      }
    }
  }, [boardItem])

  useEffect(() => {
    nonError === 404 && setNoContents(true);
  }, [nonError])

  // 공유하기 클립보드
  const clipboardShare = () => {
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

  // Meta 전용
  const metaData = {
    title: `${data.nickname}${metaViewerTitle}${data.boardTitle}`,
    description: data.boardBody,
    image: boardImg[0],
    canonical: `viewer/${boardUid}`,
  };

  return (
    <ReplyListContext.Provider
      value={{
        replyList,
        renderList,
        boardUid,
        setReplyList,
        setRenderList,
        toggle_Modal_Share,
        toggle_Modal_React,
        toggle_Modal_Trans,
        fbUid,
        setFbUid,
        fbReList,
        setFbReList,
        ReFbUid,
        setReFbUid,
        checkFbLength,
        data,
        boardImg
      }}
    >
      <Meta meta={metaData} />
      {/* 작품 뷰어 부분*/}
      <ViewerPortWrap>
        <ContentsAllView>
          <ViewerPort>
            {
            _public === 'none' ? null : boardImg.map((item, index) => {
              return <ViewImg key={index} src={item} category={data.category}/>;
            })
            }
          </ViewerPort>
        </ContentsAllView>
        {/* 코멘트 시작 부분*/}
        <UserCommentWrap>
          <UserComment>
            {/* 원작 유저 */}
            {
            checkOrigin ? 
              <>
                {/* 원작자 */}
                <ViewerUserForm
                  type='ORIGIN' 
                  externalSource={externalSource} 
                  userLang={_originalUser}
                  followLang={_followBtn}
                  followOnLang={_followingBtn}
                  removedContents={_removedContents}
                  profile={O_profileURL}
                  userData={data}
                  boardUid={boardUid}
                />
                {/* 2차 창작자 */}
                <ViewerUserForm
                  type='SECOND'
                  userLang={_recreateUser}
                  followLang={_followBtn}
                  followOnLang={_followingBtn}
                  profile={profileURL}
                  userData={data}
                  boardUid={boardUid}
                />
              </>
            : 
            <ViewerUserForm
              type='NOSECOND'
              externalSource={externalSource} 
              userLang={_originalUser}
              followLang={_followBtn}
              followOnLang={_followingBtn}
              profile={profileURL}
              userData={data}
              boardUid={boardUid}
            />
            }

            {/* 모바일용 뷰어 */}
            <MobileViewerPort>
              {
                _public === 'none' ? null : boardImg.map((item, index) => (
                  <ViewImg key={index} src={boardImg[index]} />
                ))
              }
            </MobileViewerPort>
            {/* 반응 탭 */}
            <ReactTab>
              <ReactInfoWrap onClick={() => {
                if(!loginOn){setUnAuth(true); return}
                toggle_Modal_React()
                }}>
                <ReactImg />
                <ReactTitle>
                  {data.reactCount}
                  {_contentsReact}
                </ReactTitle>
              </ReactInfoWrap>
              <ReactSelector>
                <form 
                onSubmit={(e)=> sumitHandler(e, 'bookmark')}
                  >
                  <BtnBox onClick={() => {
                      if(!loginOn){
                        setUnAuth(true)
                        return
                      }else {
                        toggleBookmark()
                      }
                    }}>
                    <BookmarkBtn bookmark={bookmark} />
                  </BtnBox>
                </form>
                <form 
                  action="" 
                  onSubmit={(e)=> sumitHandler(e, 'like', 'Board')}>
                  <BtnBox onClick={() => {
                      if(!loginOn){
                        setUnAuth(true)
                      }else {
                        toggleLike()
                      }
                    }}>
                    <LikeBtn heart={like} />
                    <ReactScore>{_heartCount}</ReactScore>
                  </BtnBox>
                </form>

                <BtnBox onClick={clipboardShare}>
                  <ShareBtn share={state_Share} />
                </BtnBox>
                <BtnBox>
                  <GlobeBtn 
                  globe={globe} 
                  onClick={() => {
                      if(!loginOn){
                        setUnAuth(true)
                      } else if(data.originUserId && !data.originBoardId){
                        setOriginDeleted(true)
                      } else{
                        secondAllow === 0 ? setAllowSecondary(true) : toggle_Modal_Trans()
                      }
                    }} />
                </BtnBox>
              </ReactSelector>
            </ReactTab>
            {/* 피드백 작성하기 */}
            <FeedbackWrap>
              <FeedbackTitle>
                <FeedbackIcon />
                <FeedbackText>
                  {_feedbackScore} {replyList.length} {_feedbackScoreEnd}
                </FeedbackText>
              </FeedbackTitle>
              <WriteFbForm feedbackRef={feedbackRef} type="Fb" feedbackPlaceholder={_feedbackPlaceholder} />
            </FeedbackWrap>
            {/* 피드백 영역 */}
            {renderList &&
              !isLoading &&
              renderList.slice(0, prevFb).map(item => {
                return <FB type="Fb" key={item._id} data={item} counting={renderList.length}/>;
              })}
            <MoreFb 
            checkEvent={eventCtrl} 
            fbLoading={fbLoading} 
            onClick={()=>{
              addList()
              fbTxt === _firstFeedback && feedbackRef.current.focus()
              }}>
              <MoreFbTxt>{fbLoading ? <ProgressSmall /> : fbTxt}</MoreFbTxt>
            </MoreFb>
          </UserComment>
        </UserCommentWrap>
      </ViewerPortWrap>
      <MoreContents>
        <MoreContentsTxt>{_moreContents}</MoreContentsTxt>
        <Contents boardId={data._id} type="MAIN"/>
      </MoreContents>
      {/*Modal*/}
      {/* {state_O_MoreMenu && (
        <Modal visible={state_O_MoreMenu} closable={true} maskClosable={true} onClose={() => toggle_O_Modal_MoreMenu(false)}>
          {type_O_MoreMenu}
        </Modal>
      )}
      */}
      {state_React && (
        <Modal visible={state_React} closable={true} maskClosable={true} onClose={() => toggle_Modal_React(false)}>
          <ReactPopup />
        </Modal>
      )}
      {state_Trans && (
        <Modal visible={state_Trans} closable={true} maskClosable={true} onClose={() => toggle_Modal_Trans(false)}>
          <TranslatePopup writer={data.writer} />
        </Modal>
      )}
      {/* 비공개 작품일 경우 */}
      {_public === 'none' && 
        <Modal visible={true} onClose={() => toggle_Modal_Trans(false)} >
          <ConfirmPopup  setAccessConfirm={goURL} type={'GOBACK'}/>
        </Modal>
      }
      {/* 삭제or없는 콘텐츠 일 경우*/}
      {noContents &&
      <Modal visible={true} onClose={() => toggle_Modal_Trans(false)} >
        <ConfirmPopup  setAccessConfirm={goURL} type={'REMOVE'}/>
      </Modal>
      }
      {/* 2차 창작이 금지된 경우 */}
      {allowSecondary &&
      <Modal visible={allowSecondary} onClose={() => setAllowSecondary(false)} >
        <ConfirmPopup handleModal={() => setAllowSecondary(false)} type={'TRANS'}/>
      </Modal>
      }
      {/* 2차 창작하려는데 원작글이 삭제된 경우 */}
      {originDeleted &&
      <Modal visible={originDeleted} onClose={() => setOriginDeleted(false)} >
        <ConfirmPopup handleModal={() => setOriginDeleted(false)} type={'REMOVEORIGIN'}/>
      </Modal>
      }

    </ReplyListContext.Provider>
  );
};

// 전체 레이아웃
const ViewerPortWrap = styled.section`
  display: flex;
  width: 100%;

  height: auto;
  @media (max-width: 900px) {
    flex-flow: column;
  }
`;

  /* 뷰어 & 작가작품 모음 FLEX */

const ContentsAllView = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 70%;
  margin-right: 10px;
  background: ${(props) => props.theme.color.whiteColor};
  user-select:none;
  @media (max-width: 900px) {
    display: none;
  }
`;

// 뷰어 부분
const ViewerPort = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  width: 100%;
  height: auto;
  @media (max-width: 900px) {
    padding: 3px 0;
  }
`;
const ViewImg = styled.img`
  object-fit: contain;
  width:100%;
  height: auto;
  max-width:${props => props.category === '0' ? '100%': '48em'};
  @media (max-width: 900px) {
    width: 100%;
    height: auto;
  }
`;
// 모바일 버전 뷰어
const MobileViewerPort = styled(ViewerPort)`
  display: none;
  @media (max-width: 900px) {
    display: flex;
  }
`;

// 작가 작품 모음
const ViewMoreTitle = styled.h3`
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font20};
  padding: 1em 3.5em;
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font16};
    padding: 1em 0.8em;
  }
`;
// 유저 코멘트 부분
const UserCommentWrap = styled.section`
  position: sticky;
  top: 60px;
  right: 3px;
  width: 30%;
  height: auto;
  max-height: 93vh;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
  overflow-x: scroll;
  overflow-x: hidden;
  background: ${(props) => props.theme.color.backgroundColor};
  &::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera*/
  }
  @media (max-width: 900px) {
    position: static;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-height: 100%;
    padding-top: 10px;
    overflow-x: auto;
  }
`;
const UserComment = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: auto;
`;

// 반응 탭
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
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
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
const LikeBtn = styled(BookmarkBtn)`
  &::before {
    background: url(${(props) => (props.heart ? `/static/heart-1.svg` : `/static/heart-2.svg`)}) no-repeat center / contain;
  }
  &:active {
    &:after {
      background: ${(props) => props.theme.color.softPinkColor};
    }
  }
`;

const ShareBtn = styled(BookmarkBtn)`
  &::before {
    background: url(${(props) => (props.share ? '/static/share-2.svg' : '/static/share-1.svg')}) no-repeat center / contain;
    transform: translate(-58%, -50%);
  }
  &:active {
    &:after {
      background: ${(props) => props.theme.color.softBrownColor};
    }
  }
`;

const GlobeBtn = styled(BookmarkBtn)`
  &::before {
    background: url(${(props) => (props.globe ? '/static/globe-2.svg' : '/static/globe-1.svg')}) no-repeat center / contain;
  }
  &:active {
    &:after {
      background: ${(props) => props.theme.color.softGreenColor};
    }
  }
`;
const ReactScore = styled.span`
  margin-left: 6px;
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.softBlackColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};
`;
// 피드백 input 영역

const FeedbackWrap = styled(ReactTab)`
  padding: 12px 16px;
`;
const FeedbackTitle = styled.div`
  display: flex;
  align-items: center;
`;
const FeedbackIcon = styled.span`
  background: url('/static/comment-2.svg') no-repeat center center / contain;
  width: 24px;
  height: 23px;
`;
const FeedbackText = styled(ReactScore)``;
// 피드백 더보기
const MoreFb = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
  cursor: ${(props) => (props.checkEvent ? 'pointer' : 'default')};
  background: ${(props) => props.theme.color.whiteColor};
  pointer-events: ${(props) => (!props.fbLoading ? 'auto' : 'none')};
`;
const MoreFbTxt = styled.span`
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.softBlackColor};
  font-size: ${(props) => props.theme.fontSize.font14};
`;

// 더 많은 작품 보기
const MoreContents = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: auto;
  margin-top: 5em;
  background: ${(props) => props.theme.color.backgroundColor};
  @media (max-width: 900px) {
    margin-top: 3em;
  }
`;

const MoreContentsTxt = styled(ViewMoreTitle)``;

export default Viewer;
