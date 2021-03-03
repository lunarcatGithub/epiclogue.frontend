import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

//컴포넌트 import
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';

// 이미지 import

// Hooks import
import { useUrlMove } from '@hooks/useUrlMove';

const LoginLayOut = () => {
  const router = useRouter();
  const sign = router?.query
  console.log(router?.query)
  const [changePage, setChangePage] = useState(Object.keys(sign).length === 0 ? false : true);
  const [goURL] = useUrlMove();

  useEffect(() => {
    if (localStorage.getItem('loginOn')) {
      goURL({pathname:'/main'});
    }
  }, []);

  return (
    <ContentWrap>
      <ContentInner>
        {/* background image */}

        <ContentSection>
        {
        changePage ?
        <SignUp
          backToLogin={sign}
          setChangePage={setChangePage}
          />
        :
        <SignIn setChangePage={setChangePage} />
        }
        </ContentSection>
      </ContentInner>
    </ContentWrap>
  );
};

/* 전체 레이아웃 화면 */

const ContentWrap = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;
const ContentInner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
// 배경 레이아웃 이미지
const BackgroundLayout = styled.div`
  position: absolute;
  /* background:url(${''}) no-repeat center / cover;
  filter: blur(4px);
  display:flex;
  top:0;
  left:0;
  width:100%;
  height:100%; */
`;
const MovieLayout = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(3px);
`;

// 입력 폼 영역
const ContentSection = styled.div`
  display: flex;
  max-width: 380px;
  width: 100%;
  height: auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.boxshadow.popup2};
  z-index: 9;

  @media (max-width: 900px) {
    max-width: 100%;
    width: 100%;
    height: 100%;
    justify-content: center;
    border-radius: 0;
  }
`;

export default LoginLayOut;
