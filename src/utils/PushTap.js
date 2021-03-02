import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

// 컴포넌트 import
import theme from '../../theme/theme';

const PushTab = (props) => {
  const [user, setUser] = useState([
    { id: 1, userId: '@asdasd', content: '안녕하세요 팔로우 해도 되는지 물어보고 싶어요' },
    { id: 2, userId: '@asdasd', content: '안녕하세요 팔로우 해도 되는지 물어보고 싶어요' },
    { id: 3, userId: '@asdasd', content: '안녕하세요 팔로우 해도 되는지 물어보고 싶어요' },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <LayoutInner>
          {true
            ? user.map((i) => (
                <PushBox>
                  {/* 푸쉬바 내부 콘텐츠 */}
                  <PushBoxInner>
                    <UserImg />
                    <UserContentBox>
                      <UserIDnKindWrap>
                        <UserId>{i.userId}</UserId>
                        <PushKindTxt> 님의 댓글</PushKindTxt>
                      </UserIDnKindWrap>
                      <UserContents>{i.content}</UserContents>
                    </UserContentBox>
                    {/* // 푸쉬바 내부 콘텐츠 끝 */}
                  </PushBoxInner>
                </PushBox>
              ))
            : null}
        </LayoutInner>
      </Layout>
    </ThemeProvider>
  );
};

// 레이아웃 부분

const Layout = styled.div`
  position: fixed;
  bottom: 13%;
  right: 3%;
  display: flex;
  min-width: 300px;
  max-width: 300px;
  height: auto;
  max-height: 300px;
  overflow: hidden;
  @media (max-width: 900px) {
    bottom: 10%;
    right: initial;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const LayoutInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const PushBox = styled.div`
  display: flex;
  width: 100%;
  max-height: 80px;
  background: #fff;
  margin-bottom: 3px;
  border-radius: 4px;
`;

const PushBoxInner = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 12px;
  box-shadow: ${(props) => props.theme.boxshadow.popup3};
`;

// 내부 콘텐츠

const UserImg = styled.img`
  min-width: 42px;
  max-width: 42px;
  min-height: 42px;
  max-height: 42px;
  border-radius: 50%;
  background: #999999;
  margin-right: 5px;
`;
const UserContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserIDnKindWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3px;
`;
const UserId = styled.span`
  display: inline-block;
  max-width: 160px;
  ${(props) => props.theme.textOneLine};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  height: 17px;
`;
const PushKindTxt = styled.span`
  white-space: nowrap;
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.darkGray};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  margin-bottom: 4px;
`;

const UserContents = styled.span`
  ${(props) => props.theme.textTwoLine};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.darkGray};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  line-height: 18px;
`;

export default PushTab;
