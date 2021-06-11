import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components';
import { useRouter } from 'next/router';

// component
import ViewerLanguage from './Viewer.Language';

// hook
import { useConvertTags } from '@hooks/useConvertTags';
import { useTimeCalculation } from '@hooks/useTimeCalculation';
import useAxiosFetch from '@hooks/useAxiosFetch';

//reduce
import { ViewerContext } from '@store/ViewerStore';
import { AlertContext } from '@store/App_Store';

function FeedbackModify({ FeedbackData }) {
  const router = useRouter();
  const { alertPatch } = useContext(AlertContext);

  const {
    viewerData,
    feedbackModifyMode,
    setFeedbackModifyMode,
    feedbackUid,
    setModifiedFeedbackData
  } = useContext(ViewerContext);

    // 수정 버튼 언어
    const { 
      _confirmTxt,
      _cancleBtn
  } = ViewerLanguage();

  const [feedbackLoding, feedbackApi, , feedbackFetch] = useAxiosFetch();

  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // 태그 및 하이퍼링크 convert
  const [converted, convert] = useConvertTags();
  const [getIndicateDate, setGetIndicateDate] = useState();
  const [indicateDate] = useTimeCalculation(getIndicateDate);

  //data value
  const [ modifingLayout, setModifingLayout ] = useState();
  const [ modifyValue, setModifyValue ] = useState('');

  const modifyValueHandler = () => {
    // if( FeedbackData?._id !== feedbackUid ) return;
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/boards/${viewerData?._id}/feedback/${FeedbackData?._id}`
    feedbackFetch(URL, 'patch', { newFeedbackBody: modifyValue }, null);
    setFeedbackModifyMode(false);
    setModifyValue('');
  }

  const modifyHandler = () => {
    if( feedbackModifyMode && FeedbackData?._id === feedbackUid){

      setModifingLayout(
          <ModifiWrap>
            <TextAreaForm 
              defaultValue={converted[0]?.props?.children}
              onChange={ e => {
                setModifyValue(e.target.value);
                handleKeyDown(e);
              } } />
            <BtnWrap>
              <CloseBtn onClick={ () => setFeedbackModifyMode(false) }>{_cancleBtn}</CloseBtn>
              <CheckBtn onClick={ () => modifyValueHandler() } >{_confirmTxt}</CheckBtn>
            </BtnWrap>
          </ModifiWrap>
      );
    } else {
      setModifingLayout(
        <>
          <FeedbackTextContent>{converted}</FeedbackTextContent>
          <FeedbackPostedTime>{`Posted by ${indicateDate}`}</FeedbackPostedTime>
        </>
      );
    }
  };

  useEffect(() => {
    convert(FeedbackData?.feedbackBody || FeedbackData?.replyBody);
    setGetIndicateDate(FeedbackData?.writeDate);

    return () => {
      convert(null);
      setGetIndicateDate(null);
    };
  }, [FeedbackData]);

  useEffect(() => { // 수정하기
    modifyHandler();
  }, [converted, feedbackModifyMode, modifyValue])

  useEffect(() => {
    if(feedbackApi?.result !== 'ok' ) return;
    setModifiedFeedbackData(feedbackApi);
    alertPatch({ type: 'FEEDBACK_UPDATE', payload: true });

  }, [feedbackApi])

  useEffect(() => { // 라우터 이동시 피드백 수정모드 false
    if(router.pathname !== '/viewer/') setFeedbackModifyMode(false);
  }, [router.pathname]);


  return (
  <FeedbackContentInner modify={feedbackModifyMode && FeedbackData?._id === feedbackUid}>
    { modifingLayout }
  </FeedbackContentInner>
  )
}

// 기본 레이아웃

const FeedbackContentInner = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
  margin-top: 6px;
  margin-right: 1em;
  margin-left: ${props => props.modify ? `0.7em` : `3.5em`};
  
`;
const FeedbackContent = styled.span`
  margin-left: 6px;
  font-weight: ${(props) => props.theme.fontWeight.font300};
  line-height: 20px;
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
`;
const FeedbackPostedTime = styled.span`
  margin: 8px 0 3px 6px;
  font-weight: ${(props) => props.theme.fontWeight.font300};
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.softBlackColor};
`;
const FeedbackTextContent = styled(FeedbackContent)`
  margin: 8px 5px;
`;

// 수정하기 스타일링
const ModifiWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0.3em 0.6em 0 0;
  padding: 0.3em 0.5em;
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
  margin-top: 0.4em;
  /* padding-right: 26px; */
`;

const CloseBtn = styled.button`
  display: flex;
  width: auto;
  padding: 0.3em 0.8em;
  border: 1px solid ${(props) => props.theme.color.softBlackColor};
  border-radius: 0.4em;
  font-size: ${(props) => props.theme.fontSize.font12};
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
  /* font-weight: ${(props) => props.theme.fontWeight.font700}; */
  margin-left: 8px;
  &:hover {
    background: ${(props) => props.theme.color.softSkyColor};
  }
`;

export default React.memo(FeedbackModify);