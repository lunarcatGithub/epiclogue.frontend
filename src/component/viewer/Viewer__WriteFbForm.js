import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

//컴포넌트 import
import { ReplyListContext } from './Viewer';
import { ProgressSmall } from '@utils/LoadingProgress';
import ViewerLanguage from './Viewer.Language';

// hooks&&reducer
import { AlertContext, AppDataContext } from '@store/App_Store';
import useAxiosFetch from '@hooks/useAxiosFetch';
import { useChange } from '@hooks/useChange';

let fbCnt = 10;

const WriteFbForm = (props) => {
  const { type, setFbReList, feedbackRef } = props;
  const { alertPatch } = useContext(AlertContext);
  const { loginOn, setUnAuth } = useContext(AppDataContext);
  const [feedbackBody, handleChange, resetValue] = useChange('');
  const { boardUid, fbUid, setReplyList, setRenderList } = useContext(ReplyListContext);
  
  //언어 변수
  const {_feedbackPlaceholder} = ViewerLanguage();

  //fetch
  const [feedbackLoding, feedbackApi, , feedbackFetch] = useAxiosFetch();
  const [reFeedbackLoding, reFeedbackApi, , reFeedbackFetch] = useAxiosFetch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //비회원 유저가 글쓰고 제출할 때
    if (!loginOn) setUnAuth(true);
    if (feedbackLoding || reFeedbackLoding) return;
    if (!feedbackBody) return;
    //정상 제출
    if (feedbackBody.length <= 1) {
      return alertPatch({ type: 'FEEDBACK_TWO', payload: true });
    } else {
      if (type === 'Fb') {
        feedbackFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}/feedback`, 'post', { feedbackBody }, null);
      } else if (type === 'ReFb') {
        reFeedbackFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}/feedback/${fbUid}/reply`, 'post', { replyBody: feedbackBody }, null);
      }
    }
  };

  useEffect(() => {
    if (feedbackApi?.result === 'ok') {
      if (feedbackApi?.data.length + 1 <= fbCnt) {
        setRenderList(feedbackApi?.data);
      } else {
        setReplyList(feedbackApi?.data);
      }
      // checkFbLength(data.data.length);
      resetValue();
    }
  }, [feedbackApi]);

  useEffect(() => {
    if (!reFeedbackApi) return;
    resetValue();
    setFbReList(reFeedbackApi?.data);
  }, [reFeedbackApi]);

  // 댓글 전송 버튼
  return (
    <form action="" method="post" onSubmit={handleSubmit} autoComplete="off">
      <FeedbackInputWrap>
        <FeedbackInput ref={feedbackRef} name="replyBody" onChange={handleChange} value={feedbackBody} placeholder={_feedbackPlaceholder} />
        <InputSendBtn loading={String(feedbackLoding || reFeedbackLoding)} feedbackBody={feedbackBody.length > 1}>
          { !feedbackLoding ? <InputSendImg imgOn={feedbackBody.length > 1} /> : <ProgressSmall /> }
        </InputSendBtn>
      </FeedbackInputWrap>
    </form>
  );
};

// 피드백 input 영역

const FeedbackInputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 2.7em;
  margin-top: 10px;
  border-radius: 25px;
  background: ${(props) => props.theme.color.backgroundColor};
  overflow: hidden;
`;

const FeedbackInput = styled.input.attrs({
  type: 'text',
})`
  width: 100%;
  height: 100%;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.blackColor};
  padding: 0 1.5em;

  transition: 0.1s background-color ease-in-out;
  &::placeholder {
    color: ${(props) => props.theme.color.softBlackColor};
    font-weight: ${(props) => props.theme.fontWeight.font500};
  }
  &:focus {
    background: ${(props) => props.theme.color.microOrangeColor};
  }
`;
const InputSendBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 1.2em;
  transform: translateY(-50%);
  cursor: ${(props) => (Boolean(props.loading) && !props.feedbackBody ? 'default' : 'pointer')};
`;

const InputSendImg = styled.svg`
  background: url(${(props) => (props.imgOn ? '/static/paper-plane.svg' : '/static/paper-plane-1.svg')}) no-repeat center center / contain;
  width: 1.6em;
  height: 1.6em;
  z-index: 999;
`;

export default WriteFbForm;
