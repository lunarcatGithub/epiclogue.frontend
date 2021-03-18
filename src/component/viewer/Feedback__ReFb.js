import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
// 컴포넌트 import
import WriteFbForm from './Viewer__WriteFbForm';
import FB from './Feedback';
import { ProgressSmall } from '@utils/LoadingProgress';
import { ReplyListContext } from './Viewer';

// Hooks&&reducer
import useAxiosFetch from '@hooks/useAxiosFetch';

const ReFeedback = (props) => {
  const { fbReList, setFbReList, boardUid, fbUid } = useContext(ReplyListContext);
  const { data, onClose } = props;
ClosedBox
  const [replyLoding, replyApi, replyError, replyFetch] = useAxiosFetch();

  useEffect(() => {
    replyFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}/feedback/${fbUid}/reply`, 'get', null, null);
  }, []);

  useEffect(() => {
    replyApi && setFbReList(replyApi?.data);
  }, [replyApi]);

  return (
      <FeedbackLayout>
        <FBheader>
          <FBheaderInner>
            <ClosedBox>
              <ClosedBtn onClick={onClose} />
            </ClosedBox>
          </FBheaderInner>
        </FBheader>

        {/* 원 댓글  */}
        <OriginUserBox>
          <OriginFeedback>
            <FB type="popupFb" key={data?._id} data={data} />
          </OriginFeedback>
        </OriginUserBox>
        {/* 대댓글  */}
        <FBcontent>
          <FeedbackInner>
            {
              !replyLoding && fbReList ? (
                fbReList.map( item => (
                  <FB type="ReFb" key={item._id} data={item} counting={fbReList.length} />
                ))
              ) : (
                <ProgressSmall />
              )
            }
          </FeedbackInner>
        </FBcontent>
        <FBform>
          <WriteFbForm type="ReFb" setFbReList={setFbReList} />
        </FBform>
      </FeedbackLayout>
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
  @media (max-width: 900px) {
    max-width: 100vh;
    min-width: 100vw;
    height: 100%;
    border-radius: 0;
  }
`;
// 피드백 팝업 헤더
const FBheader = styled.article`
  width: 100%;
  height: 3em;
  margin-bottom: 0.1em;
  background: ${(props) => props.theme.color.whiteColor};
  box-shadow: ${(props) => props.theme.boxshadow.nav};
`;

const FBheaderInner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
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

export default ReFeedback;
