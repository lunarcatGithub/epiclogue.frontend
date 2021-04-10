import React from 'react';
import styled from 'styled-components';

// 컴포넌트 import
import MypageForm from './Mypage__Form';

const MypageInform = () => {
  return (
    <Container>
      {/* 푸시 설정 */}
      <MypageForm type="push" />
      {/* 일반 설정 */}
      <MypageForm type="generalset" />
    </Container>
  );
};

//공통
// 레이아웃
const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default MypageInform;
