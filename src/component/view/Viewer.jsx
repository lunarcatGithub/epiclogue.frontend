import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

// componenets
import ViewerUserForm from './Viewer__UserForm';
import MorePopup from './MoreMenuPopup';
import ReportsPopup from '../report/ReportsPopup';
import ViewerReact from './Viewer__React';
import TranslatePopup from './TranslatePopup';
import ViewerWriteFeedback from './Viewer__WriteFeedback';
import FeedBack from './Feedback';
import ViewerLanguage from './Viewer.Language';
import Contents from '../content/Contents';

// Hooks
import { useModal } from '@hooks/useModal';
import useAxiosFetch from '@hooks/useAxiosFetch';
import { useToggle } from '@hooks/useToggle';
import { useUrlMove } from '@hooks/useUrlMove';

// reduce
import { ViewerContext } from '@store/ViewerStore';

// utils
import { Meta } from '@utils/MetaTags';
import Modal from '@utils/Modal';
import ConfirmPopup from '@utils/ConfirmPopup';
import { ProgressSmall } from '@utils/LoadingProgress';

export default function Viewer({ boardItem, nonError }) {
  const {
    viewerData,
    setViewerData,
    userPopup,
    setUserPopup,
    typeMenuPopup,
    setTypeMenuPopup,
    popupType,
    setPopupType,
    feedbackRenderList,
    setTargetUser_Id,
    targetUser_Type

  } = useContext(ViewerContext);

  // 뷰어 언어
  const { 
    _moreFeedback, 
    _firstFeedback, 
    _foldFeedback,
    _moreContents
  } = ViewerLanguage();

  const [goBack] = useUrlMove();

  // board content script
  const [ boardImage, setBoardImage ] = useState([]);
  const [ category, setCategory ] = useState();
  const [ devidedBoard, setDevidedBoard ] = useState();
  // const [ isPublic, setIsPublic ] = useState();

  // remove ctrl value
  const [ accessConfirm, setAccessConfirm ] = useState(false);
  const [ feedbackRemove, setFeedbackRemoveConfirm ] = useState(false);

  // feedback
  const [ initalFeedback, setInitialFeedback ] = useState([]);
  const [ feedbackData, setFeedbackData ] = useState([]);
  const [ feedbackSliceData, setFeedbackSliceData ] = useState([]);
  const [ feedbackTxt, setFeedbackTxt ] = useState('');
  const [ FbLoading, setFbLoading ] = useState('');
  const [ prevFeeback, setPrevFeeback ] = useState(5);
  const [ feedbackEventCtrl, setFeedbackEventCtrl ] = useState(false);
  const [ feedbackUid, setFeedbackUid ] = useState('');
  // fetch
  const [ , dataApi, dataLoading, dataFetch ] = useAxiosFetch();
  const [ , feedbackApi, feedbackLoading, FeedbackFetch ] = useAxiosFetch();

  // Add feedback list
  const addFeedbackList = () => {
    setFbLoading(true);
    if (feedbackData.length >= prevFeeback) {
      setPrevFeeback(prevFeeback + 5);
    }
    if (feedbackData.length <= prevFeeback) {
      setPrevFeeback(5);
    }
    setFbLoading(false);
  };

  const fbMoreText = (length) => {
    setFeedbackEventCtrl(true);
    if (length <= 3) {
      setFeedbackTxt(_firstFeedback);
      setFeedbackEventCtrl(false);
    } else {
      if (length <= prevFeeback) {
        setFeedbackTxt(_foldFeedback);
      } else if (length > prevFeeback) {
        setFeedbackTxt(_moreFeedback);
      }
    }
  };

  // interation user popup
  const contentPopup = (screenId, user_id, fbUid) => {
    setUserPopup(true);
    setTargetUser_Id(user_id);
    setFeedbackUid(fbUid);
    if (localStorage.getItem('userid') === screenId) {
      setTypeMenuPopup( <MorePopup type="MyContentPopup" /> );

    } else {
      setTypeMenuPopup( <MorePopup type="UserContentPopup" /> );
    }
  };

  const reportOrRemoveOrModifyOrTrans = () => { // useEffect에서 popup 관리
    if(popupType === 'ContentReport'){
      setTypeMenuPopup(<ReportsPopup onClose={setUserPopup} contentType="Board" contentId={viewerData._id} suspectUserId={''} />);
    } else if(popupType === 'ContentModify'){
      return
    } else if (popupType === 'ContentRemove'){
      setTypeMenuPopup(<ConfirmPopup type="CONFIRM" setAccessConfirm={setAccessConfirm} />);

    } else if(popupType === 'FeedbackRemove'){
      setTypeMenuPopup(<ConfirmPopup type="CONFIRM" setAccessConfirm={setFeedbackRemoveConfirm} />);

    }else if (popupType === 'WorkSecondary'){
      setTypeMenuPopup(<TranslatePopup />)

    } else if (popupType === 'RemovedBoard'){ // 작품이 삭제되고 그걸 2차 창작하려 할 때 발생
      setTypeMenuPopup(<ConfirmPopup type="REMOVEORIGIN" handleModal={() => setUserPopup(false)} />)

    } else if (popupType === 'BannedSecondary'){ // 2차 창작 불허
      setTypeMenuPopup(<ConfirmPopup type="TRANS" handleModal={() => setUserPopup(false)} />)
    }
  };

  // remove board
  const removeBoard = () => {
    dataFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${viewerData._id}`, 'delete', null, null, null);
  }

  // remove feedback
  const removeFeedback = () => {
    FeedbackFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${viewerData._id}/feedback/${feedbackUid}`, 'delete', null, null, null);
  }

  useEffect(() => {
    if (!boardItem) return;
    const boardData = boardItem.data;

    // global data
    setViewerData(boardData);
    
    // local data
    setBoardImage(boardData?.boardImg);
    setCategory(Number(boardData?.category));
    setInitialFeedback(boardData?.feedbacks)
    // content devide
    if(boardData.originUserId){
      setDevidedBoard(
        <>
          <ViewerUserForm type="ORIGIN" contentPopup={contentPopup} />
          <ViewerUserForm type="SECOND" contentPopup={contentPopup} />
        </>
      )
    } else {
      setDevidedBoard( <ViewerUserForm type="NOSECOND" contentPopup={contentPopup} /> )
    }
  }, [boardItem]);

  useEffect(() => {
    reportOrRemoveOrModifyOrTrans();
    if(popupType === 'ContentRemove' || popupType === 'FeedbackRemove'){
      return;
    } else { // popupType이 바뀔 때 마다, popup => close 할 때 빈값으로 변경
      setPopupType('');
    }
  }, [popupType, userPopup]);

  useEffect(() => {
    if(accessConfirm && popupType === 'ContentRemove'){ // 작품 삭제
      removeBoard();
      setAccessConfirm(false);
      goBack({ pathname:'/' });

    } else if(feedbackRemove && popupType === 'FeedbackRemove'){ // feedback 삭제
      removeFeedback();
      setFeedbackRemoveConfirm(false);

    }

    setUserPopup(false);
    setPopupType(''); // reportOrRemoveOrModifyOrTrans 렌더링 순서 때문에 여기서 처리함

  }, [accessConfirm, feedbackRemove]);

  useEffect(() => { // 초기 피드백 렌더링
    setFeedbackData(initalFeedback);
  }, [initalFeedback, boardItem]);

  useEffect(() => { // 피드백 업로드 할 때 다시 렌더링
    if(feedbackRenderList?.length === 0 || feedbackRenderList === undefined) return;
    setFeedbackData(feedbackRenderList);
  }, [feedbackRenderList]);

  useEffect(() => { // 피드백 삭제 이후 다시 렌더링
    if(!feedbackApi) return;
    setFeedbackData(feedbackApi?.data);
  }, [feedbackApi]);

  useEffect(() => {
    setFeedbackSliceData(feedbackData?.slice(0, prevFeeback));
    // checkFbLength(feedbackData.length);
    fbMoreText(feedbackData?.length)
  }, [prevFeeback, feedbackData, feedbackApi])

  return (
  <>
    {/* <Meta meta={''} /> */}
      <ViewerPortWrap>
      {/* 뷰어 콘텐츠 레이아웃 */}
        <ContentsAllView>
          <ViewerPort>{ boardImage.map((item, index) => <ViewImg key={index} src={item} category={category} /> ) }</ViewerPort>
        </ContentsAllView>
      {/* 유저 인터렉션 레이아웃 */}
        <UserCommentWrap>
          <UserComment>
            { /* 원작 유저 */}
            { devidedBoard }
          {/* 모바일용 뷰어 */}
          <MobileViewerPort>
            { boardImage.map((item, index) => <ViewImg key={index} src={item} /> ) }
          </MobileViewerPort>

          { /* 반응 탭 */}
            <ViewerReact />

          {/* 유저 피드백 */}
            <ViewerWriteFeedback/> 

          {/* 피드백 영역 */}
          { feedbackSliceData?.map( ( items ) => (
            <FeedBack 
              key={items?._id} 
              type="Feedback" 
              FeedbackData={items}
              contentPopup={contentPopup}
            />
          ) ) }
          { /* 피드백 추가 버튼 */}
          <MoreFb
            fbLoding={FbLoading}
            checkEvent={feedbackEventCtrl}
            onClick={() => {
              addFeedbackList();
              // fbTxt === _firstFeedback && feedbackRef.current.focus();
            } } >
            <MoreFbTxt>{ FbLoading ? <ProgressSmall /> : feedbackTxt }</MoreFbTxt>
          </MoreFb>
          </UserComment>
        </UserCommentWrap>
      </ViewerPortWrap>
      <MoreContents>
        <ViewMoreTitle>{_moreContents}</ViewMoreTitle>
        <Contents boardId={viewerData?._id} type="MAIN" />
      </MoreContents>
      { /* 모달 팝업 관리 */ }
      <Modal visible={userPopup} onClose={() => setUserPopup(false)}>
        { typeMenuPopup }
      </Modal>
  </>
  );
} 

// 전체 레이아웃
const ViewerPortWrap = styled.section`
  display: flex;
  width: 100%;

  @media (max-width: 900px) {
    flex-flow: column;
  }
`;

// 뷰어 콘텐츠 레이아웃

const ContentsAllView = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  flex:3;
  margin-right: 10px;
  background: ${(props) => props.theme.color.whiteColor};
  user-select: none;
  @media (max-width: 900px) {
    display: none;
  }
`;

// 뷰어 콘텐츠 레이아웃 -- 이미지
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

// 유저 코멘트 부분
const UserCommentWrap = styled.section`
  position: sticky;
  top: 60px;
  right: 3px;
  flex:1;
  height:100%;
  max-height:93vh;
  /* max-height: 100vh; */
  background: #999;
  -ms-overflow-style: none;
  /* IE and Edge */
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
// 뷰어 이미지
const ViewImg = styled.img`
  object-fit: contain;
  width: 100%;
  height: auto;
  max-width: ${(props) => (props.category === 0 ? '100%' : '48em')};
  @media (max-width: 900px) {
    width: 100%;
    height: auto;
  }
`;

const UserComment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

// 모바일 버전 뷰어
const MobileViewerPort = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: flex;
  }
`;

// 피드백 더보기
const MoreFb = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6em 0;
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

const ViewMoreTitle = styled.h3`
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font20};
  padding: 1em 3.5em;
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font16};
    padding: 1em 0.8em;
  }
`;