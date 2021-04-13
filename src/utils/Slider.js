import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// 컴포넌트 import

let initialX = null,
  slideDistance = null,
  moveBox = null,
  div = null,
  sliderWidth,
  contentWidth,
  boxes,
  boxesWidth;

const Slider = ({imgData, onRemove}) => {
  const layoutRef = useRef();
  const moveRef = useRef();
  const [distanceInit, setDistanceInit] = useState(null);

  const [mouseMoving, setMouseMoving] = useState(false);

  const mouseDown = (e) => {
    initialX = `${e.touches ? e.touches[0].clientX : e.clientX}`;
    setMouseMoving(true);
  };
  const mouseMove = (e) => {
    let currentX = `${e.touches ? e.touches[0].clientX : e.clientX}`;
    let diffX = initialX - currentX;
    if (mouseMoving) {
      slideDistance = -diffX;
      moveBox.style.transform = `translate(${distanceInit + slideDistance}px)`;
    }
  };
  // 슬라이더 에러 발생 DOM 문제인 것 같음 (작동하는데는 문제 없음)

  const mouseUp = (e) => {
    setDistanceInit(distanceInit + slideDistance);
    setMouseMoving(false);
    sliderWidth = div.offsetWidth;
    contentWidth = moveBox.offsetWidth;
    boxes = moveBox.childNodes;
    boxesWidth = `${boxes.length > 0 ? boxes[0].offsetWidth * boxes.length : null}`;
    // 슬라이더와 드래그 하는 영역의 크기를 비교
    if (sliderWidth < contentWidth) {
      if (-distanceInit > boxesWidth) {
        setDistanceInit(-boxesWidth);
        moveBox.style.transform = `translate(${distanceInit}px )`;

        // 이미지가 들어간 드래그 영역이 슬라이드 보다 짧고 맨 처음 이미지을 넘어서 가는것을 방지
      } else if (-distanceInit < 0) {
        moveBox.style.transform = `translate(0px)`;
        setDistanceInit(0);
      }
    }
    // 이미지가 들어간 드래그 영역이 슬라이드 보다 작으면 슬라이더 이동 0으로 고정
    else {
      moveBox.style.transform = `translate(0px)`;
      setDistanceInit(0);
    }
  };

  const removeImage = (key) => {
    onRemove(key);
  };

  useEffect(() => {
    div = layoutRef.current;
    moveBox = moveRef.current;
    div.addEventListener('mousedown', mouseDown, false);
    document.addEventListener('mousemove', mouseMove, false);
    document.addEventListener('mouseup', mouseUp, false);
    return () => {
      div.addEventListener('mousedown', mouseDown, false);
      document.removeEventListener('mousemove', mouseMove, false);
      document.removeEventListener('mouseup', mouseUp, false);
    };
  }, [mouseMoving]);

  return (
    <>
      <SliderLayout id="slider" ref={layoutRef}>
        <ImgBox event={mouseMoving} id="sliderBox" ref={moveRef}>
          {imgData
            ? imgData.map((i, key) => (
                <ImgDummy key={i.key} styling={imgData}>
                  <Img src={i.url} draggable="false" />
                  <ImgDelete onClick={() => removeImage(i.key)} />
                </ImgDummy>
              ))
            : null}
        </ImgBox>
      </SliderLayout>
      <MobileLayout>
        <MobileLayoutInner>
          {imgData
            ? imgData.map((i, key) => (
                <ImgDummy key={i.key} styling={imgData}>
                  <Img src={i.url} draggable="false" />
                  <ImgDelete onClick={() => removeImage(i.key)} />
                </ImgDummy>
              ))
            : null}
        </MobileLayoutInner>
      </MobileLayout>
    </>
  );
};

// 애니메이션
const Opacity = keyframes`
0% {
  opacity:0;
}
100% {
  opacity:1;
}
`;
// 레이아웃
const SliderLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  @media (max-width: 900px) {
    display: none;
  }
`;

// 모바일 레이아웃 영역
const MobileLayout = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  @media (max-width: 900px) {
    display: flex;
  }
`;
const MobileLayoutInner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 20px;
  width: 100%;
  background: ${(props) => props.theme.color.whiteColor};
`;
// 이미지 레이아웃
const ImgBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 20px;
  width: auto;
  background: ${(props) => props.theme.color.whiteColor};
  transition: ${(props) => (props.event ? null : 'all 0.3s ease')};
  user-select: none;
`;
const ImgDummy = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 120px;
  min-width: 110px;
  height: 100%;
  overflow: hidden;
  margin-right: 3px;
  border: 2px solid ${(props) => props.theme.color.hoverColor};
  border-radius: 8px;
  animation: ${Opacity} 0.3s ease-in-out;
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: auto;
  user-select: none;
`;
// 이미지 삭제
const ImgDelete = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(props) => props.theme.color.pinkColor};
  z-index: 999;
  opacity: 0.4;
  transition: all 0.2s ease;
  &::before {
    content: '×';
    color: ${(props) => props.theme.color.whiteColor};
    font-size: 15px;
    margin-bottom: 1px;
  }
  &:hover {
    transform: scale(1.2);
    opacity: 1;
  }
  @media (max-width: 900px) {
    opacity: 1;
  }
`;

export default Slider;
