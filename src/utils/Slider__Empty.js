import React, {useContext} from 'react';
import styled from "styled-components"

//컴포넌트 import
import {langUploadPreView} from '@language/Lang.Upload';
import {LanguageContext} from '@store/App_Store';

export default function SliderEmpty () {
    const {langState} = useContext(LanguageContext);

    //언어 변수
  const {selectedLanguage, defaultLanguage} = langState;
  const {
    beforeContent,
    contentDesc
  }  = langUploadPreView;

   const _beforeContent = beforeContent[selectedLanguage] || beforeContent[defaultLanguage],
         _contentDesc = contentDesc[selectedLanguage] || contentDesc[defaultLanguage];
  
    return (
        <EmptyLayout>
            <EmptyLayoutInner>
                <ImgBox><Img/></ImgBox>
                <TextBox><Title>{_beforeContent}</Title></TextBox>
                <LastBox><GeneralText>{_contentDesc}</GeneralText></LastBox>

            </EmptyLayoutInner>
        </EmptyLayout>
    )

}
// 레이아웃
const EmptyLayout = styled.div`
display:flex;
width:100%;
height:100%;
`
const EmptyLayoutInner = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
border:2px dashed ${(props) => props.theme.color.softOrangeColor};
border-radius:8px;
margin:20px;
width:100%;
@media(max-width:900px){
    border-radius:4px;
    margin:8px;  
}
`
const ImgBox = styled.div`
display:flex;
@media(max-width:900px){
    margin-top:20px;
}

`
const TextBox = styled.div`
display:flex;
margin-top:18px;
opacity:0.8;
@media(max-width:900px){
    margin-top:8px;
    margin-bottom:8px;
}
`
const LastBox = styled(TextBox)`
@media(max-width:900px){
    margin-top:0px;
    margin-bottom:20px;
}

`

const Img = styled.span`
background:url("/static/Preview.svg") no-repeat center center / cover;
width:156px;
height:174px;
@media(max-width:900px){
    width:80px;
    height:89px;
}
`
const Title = styled.h2`
user-select: none;
color: ${(props) => props.theme.color.orangeColor};
font-size: ${(props) => props.theme.fontSize.font26};
font-weight: ${(props) => props.theme.fontWeight.font700};
@media(max-width:900px){
    font-size: ${(props) => props.theme.fontSize.font20};
}
`
const GeneralText = styled.span`
user-select: none;
color: ${(props) => props.theme.color.orangeColor};
font-size: ${(props) => props.theme.fontSize.font18};
font-weight: ${(props) => props.theme.fontWeight.font700};
@media(max-width:900px){
    font-size: ${(props) => props.theme.fontSize.font15};
}

`