import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Dashboard = () => {
  const [comfirmData, setComfirmData] = useState({});

  const dashObj = {
    서버용량: 1.58,
    트래픽: '50%',
    '신호 상태': 'Good',
    '서버 상태': 'All green',
    '오늘 가입 회원': 413,
    '주간 가입 회원': 2544,
    '월간 가입 회원': 84186,
    '연간 가입 회원': 497421,
    '오늘 콘텐츠 업로드': 87,
    '주간 콘텐츠 업로드': 764,
    '월간 콘텐츠 업로드': 3597,
    '연간 콘텐츠 업로드': 65872,
  };

  useEffect(() => {
    // userData()
  }, []);

  return (
    <>
      <Layout>
        {/* 상단 브리핑 */}
        <BriefBox>
          {Object.entries(dashObj).map(([key, value], i) => (
            <ContentBox key={i}>
              <ContentInner>
                <ContentTitle>{value}</ContentTitle>
                <ContentDescript>{key}</ContentDescript>
              </ContentInner>
            </ContentBox>
          ))}
        </BriefBox>
      </Layout>
    </>
  );
};

// 스타일 영역
// 공통
// 레이아웃
const Layout = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2.5em;
`;
const ChartLayout = styled.div`
  display: flex;
  width: 100%;
`;
const Chart = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1em;
`;

// 상단 매출, 트래픽, 신호, 서버 상태
const BriefBox = styled.div`
  display: grid;
  justify-content: center;
  height: 100%;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  column-gap: 1em;
  @media (max-width: 1280px) {
    grid-template-columns: repeat(auto-fill, minmax(30%, auto));
  }
  @media (max-width: 980px) {
    grid-template-columns: repeat(auto-fill, minmax(40%, auto));
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(45%, auto));
    column-gap: 0.8em;
  }
  @media (max-width: 380px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, auto));
    column-gap: 0.4em;
  }
`;
const ContentBox = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  background: #fff;
  height: 8em;
  border-radius: 4px;
  margin: 0.7em;
  box-shadow: ${(props) => props.theme.boxshadow.popup2};
`;
const ContentInner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 10px;
`;
const ContentTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
`;
const ContentDescript = styled.h4`
  margin-top: 22px;
  font-size: 16px;
  font-weight: 500;
`;
