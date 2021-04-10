import React from 'react'
import styled, {css} from 'styled-components';

export function EmailForm(props) {
  const {userData} = props

  return (
    <Layout>
      {/* 보낼 유저 이메일 */}
      <BlockWrap>
      <TextBlock>유저 이메일</TextBlock>
      <InformBox>{userData.email}</InformBox>
      </BlockWrap>
      {/* 이메일 제목 */}
      <BlockWrap>
      <TextBlock>이메일 제목</TextBlock>
        <TextInput/>
      </BlockWrap>
      {/* 이메일 설명 */}
      <BlockWrap>
      <TextBlock>내용</TextBlock>
      <TextArea/>
      </BlockWrap>
    </Layout>
  )
}
const TextSize15 = css`
color:${(props) => props.theme.color.blackColor};
font-weight:${(props) => props.theme.fontWeight.font700};
font-size:${(props) => props.theme.fontSize.font15};
`
const Layout = styled.div`
display:flex;
flex-direction:column;
width:100%;
`

// 정보 분리 solid
const InformBox = styled.span`
display:flex;
width:100%;
height:auto;
max-height:5em;
border: 1px solid #999;
border-radius:0.3em;
padding:0.8em 0.5em;
${TextSize15};
font-weight:${(props) => props.theme.fontWeight.font500};

`
//block wrap
const BlockWrap = styled.div`
display:flex;
flex-direction:column;
width:100%;
margin-bottom:0.5em;
`
const TextBlock = styled.span`
display:flex;
${TextSize15};
margin-bottom:0.7em;

`

//input
const TextInput = styled.input.attrs({
  type:'text'
})`
width:100%;
padding:0.8em 0.6em;
border: 1px solid #999;
border-radius:0.3em;
`

//textarea
const TextArea = styled.textarea`
width:100%;
padding:0.8em 0.6em;
border: 1px solid #999;
border-radius:0.3em;
`