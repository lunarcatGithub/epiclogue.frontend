import React, { useEffect } from 'react';
import styled,{ css } from 'styled-components';

//component

//hooks && reduce
import { useDate } from '@hooks/useDate';

export function ConfirmReportPopup({ reportData }) {

  return (
    <>
      <TextBlock>신고 한 유저</TextBlock>
      <ReportUserBox>
          <ReportHeader>
            <ReportHeaderTab>유저 아이디</ReportHeaderTab>
            <ReportHeaderTab>신고 내용</ReportHeaderTab>
            <ReportHeaderTab>신고 날짜</ReportHeaderTab>
          </ReportHeader>
          <ReportBody>
          { reportData?.data?.map( ( { reporterId, reportType, createdAt }, i ) => (
            <ReporterList 
            reporterId = { reporterId }
              reportType = { reportType }
              createdAt = { createdAt }
              key = { i }
            /> ) ) }
          </ReportBody>
      </ReportUserBox>
    </>
    )
  }

function ReporterList({ reporterId, reportType, createdAt }){
  const [ setGetDate, , dateResult ] = useDate('Admin');

  const reportTypeReturn = (_type) => {
    if(_type === 0){
      return '스팸'
    } else if (_type === 1){
      return '음란/선정적'
    } else if (_type === 2){
      return '혐오유발'
    } else if (_type === 3){
      return '폭력성'
    } else if (_type === 4){
      return '거짓정보'
    } else if (_type === 5){
      return '분쟁유발'
    } else if (_type === 6){
      return '불법 콘텐츠'
    }
  };

  useEffect(() => {
    setGetDate(createdAt);
  }, [createdAt]);

  return (
      <ReportBodyInner>
        <ReportBodyDevide type='id' >@{ reporterId?.screenId }</ReportBodyDevide>
        <ReportBodyDevide>{ reportTypeReturn(reportType) }</ReportBodyDevide>
        <ReportBodyDevide>{ dateResult }</ReportBodyDevide>
      </ReportBodyInner>
  )
}

const TextSize15 = css`
color:${(props) => props.theme.color.blackColor};
font-weight:${(props) => props.theme.fontWeight.font700};
font-size:${(props) => props.theme.fontSize.font15};
`

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

`

// 신고한 유저 목록용
const ReportUserBox = styled(InformBox)`
position: relative;
display:flex;
flex-direction:column;
min-height:5em;
max-height:15em;
`

const ReportHeader = styled.div`
position:absolute;
top:0;
left:0;
display:flex;
width:100%;
height:2em;
`
const ReportHeaderTab = styled.div`
display:flex;
flex-wrap:nowrap;
width:100%;
justify-content:center;
align-items:center;
${TextSize15};
`
const ReportBody = styled.div`
display:flex;
flex-direction:column;
width:100%;
padding-top:1.5em;
`
const ReportBodyInner = styled(ReportBody)`
display:flex;
flex-direction:row;
padding:0.5em 0;
`
const ReportBodyDevide = styled(ReportHeaderTab)`
font-weight:${(props) => props.theme.fontWeight.font500};

`

// hidden contents 영역 - 라디오 버튼

const TextBlock = styled.span`
display:flex;
${TextSize15};
margin-bottom:0.7em;
`
