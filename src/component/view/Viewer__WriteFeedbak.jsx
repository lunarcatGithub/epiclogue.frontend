import React, { useEffect, useContext } from 'react'
import styled from 'styled-components';

// 컴포넌트 import
import ViewerLanguage from './Viewer.Language';

// utils
import WriteInputForm from '@utils/writeFbForm';

// hooks
import useAxiosFetch from '@hooks/useAxiosFetch';

// reduce
import { ViewerContext } from '../../store/ViewerStore';

export default function ViewerWriteFeedbak() {
  const { viewerData, setFeedbackRenderList } = useContext(ViewerContext);

  // fetch
  const [feedbackLoding, feedbackApi, , feedbackFetch] = useAxiosFetch();

  // 뷰어 언어
  const {
    _feedbackScore,
    _feedbackPlaceholder,
    _feedbackScoreEnd
  } = ViewerLanguage();
  
  const getFeedback = (text) => {
    // input utill에서 받아온 데이터
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/boards/${viewerData?._id}/feedback`
    feedbackFetch(URL, 'post', { feedbackBody:text }, null);
  }

  useEffect(() => {
    setFeedbackRenderList(viewerData?.feedbacks);
  }, []);

    return (
      <FeedbackWrap>
        <FeedbackTitle>
          <FeedbackIcon />
          <FeedbackText>
            {_feedbackScore} 0 
            {_feedbackScoreEnd} 
          </FeedbackText>
        </FeedbackTitle>
        <WriteInputForm 
          type="Feeback" 
          getText={getFeedback}
          _placeholder={_feedbackPlaceholder}
          loding={feedbackLoding}
        />
      </FeedbackWrap>
    )
}

// 피드백 input 영역

const FeedbackWrap = styled.div`
  padding: 12px 16px;
  height: auto;
  margin-bottom: 5px;
  background: ${(props) => props.theme.color.whiteColor};
  @media (max-width: 900px) {
    padding: 12px;
  }

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
const FeedbackText = styled.span`
  margin-left: 6px;
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.softBlackColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};

`;
// 피드백 더보기
