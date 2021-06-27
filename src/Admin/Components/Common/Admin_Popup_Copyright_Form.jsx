import React, { useState, useEffect } from 'react'
import styled,{ css } from 'styled-components';

// reduce 

export default function AdminPopupCopyrightForm({ reportApi }) {
  const [ copyrightData, setCopyrightData ] = useState();

  useEffect(() => {
    setCopyrightData(reportApi?.data[0]);
  }, [reportApi]);

  const listData = [
    {title:'회사 소속', desc:copyrightData?.reportBody?.reporterCompany},
    {title:'신고자 이메일', desc:copyrightData?.reportBody?.reporterEmail},
    {title:'신고자 이름', desc:copyrightData?.reportBody?.reporterEmail},
    {title:'연락처', desc:copyrightData?.reportBody?.tel},
    {title:'서명', desc:copyrightData?.reportBody?.signature},
    {title:'침해 사실 설명', desc:copyrightData?.reportBody?.contentSubject},
  ]

  return (
    <UserInfoWrap>
      {/* 콘텐츠 상세 정보 */}
      <DetailAboutContent>
      <Textwrap>
        <Title>콘텐츠 제목</Title>
        <Desc>{copyrightData?.contentId?.boardTitle}</Desc>
      </Textwrap>

      <Textwrap>
      <Title>콘텐츠 정보</Title>
      <LinkDesc target='_blank' href={`/viewer/${copyrightData?.contentId?._id}`}>www.epiclogue.com/viewer/{copyrightData?.contentId?._id}</LinkDesc>
      </Textwrap>

      </DetailAboutContent>
      {/* 유저 상세 정보 */}
      <ReportUserBox>
        { listData?.map( ( { title, desc }, i) => (
        <Textwrap key={i}>
          <Title>
            {title}
          </Title>
          <Desc>
            {desc}
          </Desc>
        </Textwrap>
        ) ) }
        <Textwrap>
          <Title>관련 링크</Title>
          { copyrightData?.reportBody?.originLink.map( ( list, i ) => (
          <LinkDesc
          key={i}
          target='_blank' 
          href={`https://${list}`}
          >{list}</LinkDesc>
          ) ) }
        </Textwrap>
      </ReportUserBox>
    </UserInfoWrap>
  )
}

const TextSize15 = css`
color:${(props) => props.theme.color.blackColor};
font-weight:${(props) => props.theme.fontWeight.font700};
font-size:${(props) => props.theme.fontSize.font15};
`;

// 신고 당한 유저 목록용
const UserInfoWrap = styled.div`
display:flex;
flex-direction:column;
`;

const DetailAboutContent = styled(UserInfoWrap)`

`

const ReportUserBox = styled(UserInfoWrap)`
position: relative;
width:100%;
height:auto;
min-height:5em;
max-height:20em;
overflow-y:hidden;
overflow-y:scroll;
border: 1px solid #999;
border-radius:0.3em;
padding:0.8em 0.5em;
${TextSize15};
font-weight:${(props) => props.theme.fontWeight.font500};
`;

// text
const Textwrap = styled.div`
display:flex;
flex-direction:column;
margin-bottom:1.8em;
`;

const Title = styled.span`
color:${(props) => props.theme.color.popupColor};
font-weight:${(props) => props.theme.fontWeight.font700};
font-size:${(props) => props.theme.fontSize.font16};
margin-bottom:0.6em;
user-select: none;
`;

const Desc = styled.span`
${TextSize15};
font-weight:${(props) => props.theme.fontWeight.font500};
`;

const LinkDesc = styled.a`
cursor:pointer;
font-weight:${(props) => props.theme.fontWeight.font700};
color:${(props) => props.theme.color.orangeColor};
margin-bottom:0.4em;
`