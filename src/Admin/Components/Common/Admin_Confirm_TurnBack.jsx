import React,{useState} from 'react'
import styled, {css} from 'styled-components';

export function AdminConfirmTurnBack() {
  const [turnBackValue, changeValue] = useState();
  return (
    <Layout>
      {/* 반려 사유 */}
      <BlockWrap>
        <TextBlock>반려 사유</TextBlock>
        <TextArea value={turnBackValue} onChange={e => changeValue(e)} />
      </BlockWrap>
      {/* 이메일 설명 */}
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

//textarea
const TextArea = styled.textarea`
width:100%;
padding:0.8em 0.6em;
border: 1px solid #999;
border-radius:0.3em;
`