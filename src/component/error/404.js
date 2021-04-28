import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// 컴포넌트 import
import ErrorLanguage from './Error.Language';

export default function NotFound() {

  //언어 변수
  const {_error404} = ErrorLanguage();


  return (
    <Layout>
      <LayoutInner>
        <ImgBox>
          <Img404 />
        </ImgBox>
        <Link href="/">
          <ErrorButton>{_error404}</ErrorButton>
        </Link>
      </LayoutInner>
    </Layout>
  );
}

const Layout = styled.article`
  display: flex;
  width: 100%;
  height: 100%;
`;

const LayoutInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 20%;
`;
const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Img404 = styled.svg`
  background: url('/static/404.svg') no-repeat center center / cover;
  width: 380px;
  height: 300px;
  @media (max-width: 900px) {
    width: 280px;
    height: 220px;
  }
`;

const ErrorButton = styled.button`
  display: inline-block;
  width: auto;
  height: auto;
  padding: 12px 34px;
  border-radius: 35px;
  color: ${(props) => props.theme.color.whiteColor};
  background: ${(props) => props.theme.color.darkOrange};
  font-size: 28px;
  font-weight: 700;
  cursor: pointer;
  @media (max-width: 900px) {
    font-size: 20px;
    padding: 8px 26px;
  }
`;
