import React, { useContext } from 'react';
import styled from 'styled-components';

//컴포넌트 import
import { ProgressSmall } from '@utils/LoadingProgress';

// hooks&&reducer
import { AlertContext, AppDataContext } from '@store/App_Store';
import useAxiosFetch from '@hooks/useAxiosFetch';
import { useChange } from '@hooks/useChange';

export default function WriteInputForm({ getText, _placeholder, loading }){
  const { alertPatch } = useContext(AlertContext);
  const { loginOn, setUnAuth } = useContext(AppDataContext);

  const [feedbackBody, handleChange, resetValue] = useChange('');
  

  //fetch

  const handleSubmit = (e) => {
    e.preventDefault();
    //비회원 유저가 글쓰고 제출할 때
    if (!loginOn) {
      setUnAuth(true);
      return;
    }
    
    if (loading) return;
    if (!feedbackBody) return;
    //정상 제출
    if (feedbackBody.length <= 1) {
      return alertPatch({ type: 'FEEDBACK_TWO', payload: true });
    } else {
      // if (type === 'Feedback') {
      //   getText(feedbackBody);

      // } else if (type === 'RePly') {
      //   getText(feedbackBody);
      // }
      getText(feedbackBody);
      resetValue();
    }
  };

  // useEffect(() => {
  //   if (!reFeedbackApi) return;
  //   resetValue();
  //   setFbReList(reFeedbackApi?.data);
  // }, [reFeedbackApi]);

  // 댓글 전송 버튼
  return (
    <form action="" method="post" onSubmit={handleSubmit} autoComplete="off">
      <FeedbackInputWrap>
        <FeedbackInput onChange={handleChange} value={feedbackBody} placeholder={_placeholder} />
        <InputSendBtn loading={loading} feedbackBody={feedbackBody.length > 1}>
          { !loading ? <InputSendImg imgOn={feedbackBody.length > 1} /> : <ProgressSmall /> }
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

