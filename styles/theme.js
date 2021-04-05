import { css } from "styled-components";

const moreMenu = css`
 position: relative;
  width: 6px;
  height: 6px;
  background-color: rgba(164, 159, 186, 1);
  border-radius: 50%;
  
  &::before, &::after{
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    left: 0px;
    background-color: inherit;
    border-radius: inherit;
  }
  &::before {
    top: -8px;
  }
  &::after {
  top: 8px;
}
`
// x버튼
const closeBtn = css`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  height:100%;  
  cursor:pointer;
  &::before, &::after{
    content: "";
    height: 2.1em;
    width: 2px;
    background-color: rgba(164, 159, 186, 1);
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
}
`

const textOneLine = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const textTwoLine = css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;/* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap:break-word;
`
const ImgButtonHover = css`
  position: absolute;
  width: 46px;
  height: 46px;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
`
const PositionCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 28px;
  height: 30px;
  transform: translate(-50%, -50%);
`

const theme = {
  textOneLine,
  textTwoLine,
  ImgButtonHover,
  PositionCenter,
  moreMenu,
  closeBtn,
 color:{
// 블랙 계열
 blackColor: "#4E4E4E",
 blackOpacity: 'rgba(34,34,34,0.7)',
 darkBlackOpacity: 'rgba(0,0,0,0.9)',
 darkGray:"rgb(113,113,113)",
 softBlackColor:"rgba(164, 159, 186, 1)",
 softGrayColor: "rgba(247, 247, 247, 1)",
 hoverColor: "#E9E9E9",
 soSoGrayColor:"#c3c3c3",
 popupColor:"rgba(34, 34, 34, 0.5)",
// 레드 계열
 redColor: "rgba(228, 79, 70, 0.85)",
 pinkColor: "rgba(247, 112, 143, 1)",
 middlePinkColor:"rgba(245,167,181, 1)",
 softPinkColor:"rgba(245,167,181, 0.6)",
// 오렌지 계열
 darkOrange:'#ECA62C',
 orangeColor:"#F3BD60",
 orangeOpacityColor:"rgba(243,189,96,0.5)",
 softOrangeColor: "#F8D69B",
 semiOrangeColor: "#FBE6C3",
 microOrangeColor: "#FEF7EB",
// 블루 계열
skyColor: "rgba(73, 173, 239, 1)",
opacitySkyColor: "rgba(73, 173, 239, 0.4)",
softSkyColor: "#B6DEF9",
// 화이트 계열
whiteColor:"#fff",
backgroundColor:"#F5F5F6",
// 그린 계열
greenColor:"#358786",
soSoGreenColor:"rgba(3,109,108,0.5)",
softGreenColor:"rgba(3,109,108,0.2)",
semiGreenColor:"rgba(3,109,108,0.1)",
// 브라운 계열
brownColor:"#986444",
softBrownColor:"rgba(126,65,25,0.2)"
},
 //모달 전용 그림자효과
 boxshadow:{
   popup:"0 3px 4px 2px rgba(0, 0, 0, 0.1);",
   popup2:"0 2px 16px 3px rgba(0, 0, 0, 0.2);",
   popup3:"0 4px 14px -4px rgba(0, 0, 0, 0.1);",
   nav:"0 1px 2px 1.3px rgba(0, 0, 0, 0.1)"
 },
 //글자 크기
 fontSize:{
   font26:"26px",
   font20:"20px",
   font18:"18px",
   font16:"16px",
   font15:"15px",
   font14:"14px",
   font13:"13px",
   font12:"12px"
 },
 //글자 굵기
fontWeight:{
  font100:"100",
  font300:"300",
  font500:"500",
  font700:"700"
},
adminColor:{
  whiteColor: "#ffffff",
  darkColor:"#222222",
  soSoGrayColor:"#c3c3c3",
  darkGreenColor: "#232F34",
  replyBlue: "#4A6572",
  grayColor: "#e2e2e2",
  replyOrange: "#F9AA33",
  hoverColor: "#E9E9E9",
  semiOrangeColor: "#FBE6C3",
}
}
export default theme;
