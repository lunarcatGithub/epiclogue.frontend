import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

// 컴포넌트 import
import FeedBack from './Feedback';
import { ProgressSmall } from '@utils/LoadingProgress';
import WriteInputForm from '@utils/WriteSendForm';
import ViewerLanguage from './Viewer.Language';
import MorePopup from './MoreMenuPopup';
import ReportsPopup from '../report/ReportsPopup';

// Hooks
import useAxiosFetch from '@hooks/useAxiosFetch';

// reducer
import { ViewerContext } from '@store/ViewerStore';

// utils
import Modal from '@utils/Modal';
import ConfirmPopup from '@utils/ConfirmPopup';
import { popupDisplayAni } from '@utils/popupAnimation';

const FeedbackReply = ({ boardUid, feedbackUid, FeedbackData }) => {
  const targetRef = useRef();

  const [ replyLoding, replyApi, , replyFetch ] = useAxiosFetch();
  const [ reFeedbackLoding, reFeedbackApi, , reFeedbackFetch ] = useAxiosFetch();
  const [, feedbackRemoveApi, , feedbackRemoveFetch] = useAxiosFetch();

  const { 
    setUserPopup,
    feedbackModalCtrl,
    setFeedbackModalCtrl,
    feedbackPopupType,
    setFeedbackPopupType,
    setTargetUser_Id
  } = useContext(ViewerContext);

  const [ replyData, setReplyData ] = useState([]);
  const [ moreMenu, setMoreMenu] = useState();
  const [ accessConfirm, setAccessConfirm ] = useState(false);
  const [ targetReply, setTargetReply ] = useState();
  const [ screenId, setScreenId ] = useState();
  const [ feedbackUserId, setFeedbackUserId ] = useState();
  
  // 뷰어 언어
  const { _replyPlaceholder } = ViewerLanguage();


    // interation user popup

    const feedbackReplyPopup = (replyId, screenId, feedbackUserId) => {
      setFeedbackModalCtrl(true);
      setTargetReply(replyId) // reply ID 저장 remove 할 때 이용
      setTargetUser_Id(feedbackUserId)
      setFeedbackPopupType('');
      if (localStorage.getItem('userid') === screenId) {
        setMoreMenu( <MorePopup type="MyContentPopup" doType="PopupFeedback" /> );
      } else {
        setMoreMenu( <MorePopup type="UserContentPopup" doType="PopupFeedback" /> );
      }
    };
    const tagetScreenIdMention = (screenId) => {
      targetRef.current.focus();
      setScreenId(screenId);
    }

    useEffect(() => {
      if(feedbackPopupType === 'PopupFeedbackRemove'){
        setMoreMenu(<ConfirmPopup type="CONFIRM" setAccessConfirm={setAccessConfirm} doType="PopupFeedback" />)
      } else {
        setMoreMenu(<ReportsPopup contentType="Reply" contentId={targetReply} suspectUserId={feedbackUserId} />)
      }
    }, [feedbackPopupType]);

    useEffect(() => { // reply 삭제
    if(accessConfirm && feedbackPopupType === 'PopupFeedbackRemove'){
      feedbackRemoveFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}/feedback/${feedbackUid}/reply/${targetReply}`, 'delete', null, null, null);
      // setReplyData(null);
      setAccessConfirm(false);
      setFeedbackModalCtrl(false);
      setFeedbackPopupType('')
      setMoreMenu(null);
    }
    setAccessConfirm(false);
  }, [accessConfirm, feedbackPopupType]);
  
  useEffect(() => { // 초기 댓글 데이터 불러오기
    replyFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}/feedback/${feedbackUid}/reply`, 'get', null, null);
  }, []);

  const getText = (text) => { // 댓글 작성 후 전송
    reFeedbackFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}/feedback/${feedbackUid}/reply`, 'post', { replyBody: text }, null);
  }

  useEffect(() => { // 초기 렌더링
    setReplyData(replyApi?.data);
  }, [replyApi, feedbackRemoveApi]);

  useEffect(() => { // 댓글 작성 이후 렌더링
    setReplyData(reFeedbackApi?.data);
  }, [reFeedbackApi]);

  useEffect(() => { // 삭제 이후 렌더링
    setReplyData(feedbackRemoveApi?.data);
  }, [feedbackRemoveApi]);


  return (
    <>
    <FeedbackLayout>
      <FBheader>
        <ClosedBox onClick={() => setUserPopup(false)} >
          <ClosedBtn />
        </ClosedBox>
      </FBheader>

      {/* 원 댓글  */}
      <OriginUserBox>
        <OriginFeedback>
          <FeedBack 
            type="popupFeedback" 
            FeedbackData={FeedbackData}
            tagetScreenIdMention={tagetScreenIdMention}
          />
        </OriginFeedback>
      </OriginUserBox>
      {/* 대댓글  */}
      <FBcontent>
        <FeedbackInner>
          { 
            replyData ? replyData.map(( items, index ) => (
            <FeedBack 
              key={index} 
              FeedbackData={items}
              boardUid={boardUid}
              feedbackUid={feedbackUid}
              feedbackReplyPopup={feedbackReplyPopup}
              tagetScreenIdMention={tagetScreenIdMention}
              type="popupReply"
            /> ) )
            :
            <ProgressSmall />
          }
        </FeedbackInner>
      </FBcontent>
      <FBform>
        { /* input 작성 */}
        <WriteInputForm
          getText={getText}
          _placeholder={_replyPlaceholder}
          loading={reFeedbackLoding}
          targetRef={targetRef}
          screenId={screenId}
        />
      </FBform>
    </FeedbackLayout>
    <Modal visible={feedbackModalCtrl} onClose={() => setFeedbackModalCtrl(false)}>
      { moreMenu }
    </Modal>
  </>
  );
};

//공통
// 피드백 팝업 레이아웃

const FeedbackLayout = styled.section`
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  overflow: hidden;
  width: 100%;
  max-width: 480px;
  min-width: 480px;
  height: 650px;
  border-radius: 12px;
  background: ${(props) => props.theme.color.backgroundColor};
  box-shadow: ${(props) => props.theme.boxshadow.popup};
  box-sizing: content-box;

  animation:${popupDisplayAni} .4s ease-in-out normal;

  @media (max-width: 900px) {
    max-width: 100vh;
    min-width: 100vw;
    height: 100%;
    border-radius: 0;
    animation:none;

  }
`;
// 피드백 팝업 헤더
const FBheader = styled.article`
  width: 100%;
  height: 5.8em;
  margin-bottom: 0.1em;
  background: ${(props) => props.theme.color.whiteColor};
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 1em;
`;


// 헤더 유저 닉네임

// 팝업 닫기 버튼
const ClosedBox = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0.4em;
  right: 1.5em;
  border-radius: 50%;
  width: 3em;
  height: 3em;
  overflow: hidden;
`;
const ClosedBtn = styled.span`
  ${(props) => props.theme.closeBtn};
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
`;

// 원댓글자 레이아웃
const OriginUserBox = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
`;

// 본문 콘텐츠 레이아웃
const FBcontent = styled.article`
  width: 100%;
  height: 100%;
  overflow-style: none;
  overflow-x: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const OriginFeedback = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 0 5px;
  margin-bottom: 3px;
  background: ${(props) => props.theme.color.whiteColor};
  box-sizing: border-box;
  border: 3px solid ${(props) => props.theme.color.softOrangeColor};
`;
const FeedbackInner = styled(OriginFeedback)`
  border: none;
`;

// 댓글입력 폼
const FBform = styled.div`
  width: 100%;
  height: 56px;
  padding: 0 8px;
  padding-bottom: 8px;
  margin-bottom: 3px;
  background: ${(props) => props.theme.color.whiteColor};
`;

export default FeedbackReply;
