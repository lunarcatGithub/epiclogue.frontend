import React, { useContext } from 'react';
import styled,{ css } from 'styled-components';

// component
import {ConfirmReportPopup} from './Admin_Confirm_Report';

// reduce 
import { AdminContext } from '../Store/Admin_Context';

export default function AdminPopupReportForm({ reportApi }) {
  const { currentData } = useContext(AdminContext);

  const goUrlHandle = () => {

    if(currentData?._contentType === 'Board'){
      window.open('about:blank').location.href=`http://localhost:3000/viewer/${currentData?._id}`
    } else {
      return;
    }
  }

  return (
    <ConfirmInBody>
      <BlockWrap>
        <TextBlock>콘텐츠 정보</TextBlock>
          <InformBox>
            <GoTargetPage onClick={ ()=> goUrlHandle() } >{currentData?._contentType}</GoTargetPage>
          </InformBox>
      </BlockWrap>
      {/* 콘텐츠 업로드 유저 */}
      <BlockWrap>
      <TextBlock>신고 받은 유저</TextBlock>
          <InformBox>@{currentData?.suspectUserInfo[0]?.screenId}</InformBox>
      </BlockWrap>
      <BlockWrap>
        <ConfirmReportPopup reportData={reportApi} />
      </BlockWrap>
    </ConfirmInBody>
  )
}

const TextSize15 = css`
color:${(props) => props.theme.color.blackColor};
font-weight:${(props) => props.theme.fontWeight.font700};
font-size:${(props) => props.theme.fontSize.font15};
`;

const GoTargetPage = styled.a`
cursor:pointer;
`;

const ConfirmInBody = styled.div`
display:flex;
flex-direction:column;
width:100%;
padding: 2em 0;
`;


//block wrap
const BlockWrap = styled.div`
margin-bottom:0.8em;
`


// 상단 유저 정보
const InformBox = styled.span`
display:flex;
width:100%;
height:auto;
max-height:5em;

border: 1px solid #999;
border-radius:0.3em;
padding:0.6em 0.8em;
${TextSize15};
font-weight:${(props) => props.theme.fontWeight.font500};
`

// 신고한 유저 목록용

const TextBlock = styled.span`
display:flex;
${TextSize15};
margin-bottom:0.7em;
`