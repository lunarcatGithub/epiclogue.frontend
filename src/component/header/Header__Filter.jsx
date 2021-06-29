import React from 'react'
import styled, { keyframes } from 'styled-components';

export default function HeaderFilter({
  selectFilter,
  clickedComic,
  clickedIllust,
  toggleCategory,
}) {
  return (
    <CategoryBox>
      <CategoryHeader>
        <HeaderTxt>Filter</HeaderTxt>
        <ClosedBox>
          <ClosedBtn onClick={() => toggleCategory()} />
        </ClosedBox>
      </CategoryHeader>
      <CategoryInner>
        <MbCategoryComic styling={clickedComic} onClick={() => selectFilter('comic')}>
          Comic
        </MbCategoryComic>
        <MbCategoryIllust styling={clickedIllust} onClick={() => selectFilter('illust')}>
          Illust
        </MbCategoryIllust>
      </CategoryInner>
    </CategoryBox>
  )
}

// filter modal

// animation

const modalAni = keyframes`
0% {
  opacity:0;
},
100% {
  opacity:1;
}
`;


const CategoryBox = styled.div`
  display:flex;
  position: fixed;
  flex-direction: column;
  top: 3.8em;
  right: 20em;
  width: 28em;
  border-radius: 0.4em;
  overflow: hidden;
  z-index: 999;
  background: ${(props) => props.theme.color.backgroundColor};
  box-shadow: ${(props) => props.theme.boxshadow.popup};  
  animation: ${modalAni} 0.1s ease-in-out normal;

  
  @media (max-width: 900px) {
    top: initial;
    bottom: 0;
    left: 0;
    right: initial;
    width: 100%;
    border-radius: 0.4em 0.4em 0 0;
  }
`;
const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 1em 0.3em;
  margin-bottom: 0.2em;
  background: ${(props) => props.theme.color.whiteColor};
`;
const CategoryInner = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.color.whiteColor};
  padding: 1.1em 2.5em;
`;
const HeaderTxt = styled.span`
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.softBlackColor};
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font15};
  }
`;
const MbCategoryComic = styled.button`
  display: flex;
  justify-content: center;
  line-height: 38px;
  padding: 0 5px;
  width: 100%;
  min-width: 128px;
  height: 42px;
  border-radius: 25px;
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  cursor: pointer;
  border: 2px solid ${(props) => props.theme.color.orangeColor};
  color: ${(props) => (props.styling ? props.theme.color.whiteColor : props.theme.color.orangeColor)};
  background: ${(props) => (props.styling ? props.theme.color.orangeColor : props.theme.color.whiteColor)};
  margin-right: 4px;
`;

const MbCategoryIllust = styled(MbCategoryComic)`
  border: 2px solid ${(props) => props.theme.color.darkGray};
  color: ${(props) => (props.styling ? props.theme.color.whiteColor : props.theme.color.darkGray)};
  background: ${(props) => (props.styling ? props.theme.color.darkGray : props.theme.color.whiteColor)};
  margin-top: 6px;
`;
// 닫기 버튼

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
