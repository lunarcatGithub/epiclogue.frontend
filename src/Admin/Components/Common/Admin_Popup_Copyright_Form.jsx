import React from 'react'
import styled,{ css } from 'styled-components';

export default function AdminPopupCopyrightForm() {
  return (
    <div>
      zzz
    </div>
  )
}

const TextSize15 = css`
color:${(props) => props.theme.color.blackColor};
font-weight:${(props) => props.theme.fontWeight.font700};
font-size:${(props) => props.theme.fontSize.font15};
`;

// 상단 유저 정보
const InformBox = styled.span`
display:flex;
width:100%;
height:auto;
max-height:5em;
overflow-y:hidden;
overflow-y:scroll;
border: 1px solid #999;
border-radius:0.3em;
padding:0.8em 0.5em;
${TextSize15};
font-weight:${(props) => props.theme.fontWeight.font500};
`;

// 신고한 유저 목록용
const ReportUserBox = styled(InformBox)`
position: relative;
display:flex;
flex-direction:column;
min-height:5em;
max-height:15em;
`;