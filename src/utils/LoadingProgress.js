import React from 'react';
import styled, { css, keyframes } from 'styled-components';

// 컴포넌트 import

const Progress = () => {
  return (
    <Layout>
      <Circle />
      <CircleSmall />
      <LogoRotate />
    </Layout>
  );
};

const Common = css`
  position: absolute;
  top: 50%;
  left: 50%;
  @media (max-width: 900px) {
    left: 40%;
  }
`;
const Rotate = keyframes`
	0% {transform: rotate(0deg)}
	100% {transform: rotate(-360deg);}
`;
const ReverseRotate = keyframes`
	0% {transform: rotate(0deg) ;}
	100% {transform: rotate(360deg);}
`;

const Layout = styled.article`
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  /* padding: 0.5em 0; */
  margin-top: 20px;
`;

const Circle = styled.div`
  ${Common};
  width: 80px;
  height: 80px;
  border: 3px dotted rgba(241, 173, 57, 0.5);
  border-radius: 200px;
  -webkit-animation: ${Rotate} 4s infinite linear;
  animation: ${Rotate} 4s infinite linear;
`;

const CircleSmall = styled.div`
  ${Common};
  margin-left: 7px;
  margin-top: 7px;
  width: 66px;
  height: 66px;
  border: 4px inset rgba(241, 173, 57, 0.3);
  border-radius: 200px;
  -webkit-animation: ${ReverseRotate} 4s infinite linear;
  animation: ${ReverseRotate} 4s infinite linear;
`;
const LogoRotate = styled.svg`
  background: url('/static/Logo.svg') no-repeat center center / contain;
  ${Common};
  margin-left: 21px;
  margin-top: 22px;

  width: 40px;
  height: 40px;
  opacity: 0.6;
  -webkit-animation: ${Rotate} 3s infinite linear;
  animation: ${Rotate} 3s infinite linear;
`;

const ProgressSmall = ({ disabled }) => {
  return (
    <SmallLayout>
      <SmallCircle disabled={disabled} />
    </SmallLayout>
  );
};

// 로딩 진행바 디자인
const SmallLayout = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  flex-direction: column;
  @media (max-width: 900px) {
    height: 100%;
  }
`;

const SmallCircle = styled.div`
  width: 30px;
  height: 30px;
  border: 3px dotted ${(props) => (props.disabled ? '#ffffff' : `rgba(241, 173, 57, 0.5)`)};
  border-radius: 200px;
  -webkit-animation: ${Rotate} 3s infinite linear;
  animation: ${Rotate} 3s infinite linear;
`;

export { Progress, ProgressSmall };
