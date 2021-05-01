import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import MyBoardFollowList from './MyBoard__Follow__List';
import { useRouter } from 'next/router';

//utils
import AutoHiding from '@utils/autoHiding';

// hooks&&reducer
import useAxiosFetch from '@hooks/useAxiosFetch';
import useScroll from '@hooks/useScroll';
import { AppDataContext } from '@store/App_Store';

const MyBoardFollow = () => {
  const router = useRouter();

  const { followData, loginOn } = useContext(AppDataContext);
  // tab
  const [routerTab, setRouterTab] = useState(router.query.tab || 'following');

  // 팔로우 리스트 무한 스크롤
  const [followsData, setFollowData] = useState(null);
  const [finalRender, setFinalRender] = useState([]);
  const [latestId, setLatestId] = useState();
  const [stopData, setStopData] = useState(true);

  //fetch
  const [followLoding, followListApi, , followListFetch] = useAxiosFetch();

  // 헤더 스크롤용
  const show = AutoHiding();
  const [page, scroll] = useScroll();

  // 데이터 호출 함수
  const handleScroller = () => {
    const params = {
      size:20,
      type:routerTab,
      screenId:router?.query?.id,
      latestId,
    }
    if(!loginOn) return;
    followListFetch(`${process.env.NEXT_PUBLIC_API_URL}/interaction/follow`, 'get', null, null, params)
  }

  // 데이터 호출
useEffect(() => {
  if(!stopData) return;
  handleScroller();
}, [page, routerTab, stopData])

  useEffect(() => {
    followListApi?.data?.length === 0 && setStopData(false)
  }, [followListApi])

  useEffect(() => {
    setFollowData();
    setStopData(true);
    setLatestId(null);
  }, [routerTab])

  // 데이터 분리
  useEffect(() => {
    followListApi && setFollowData(followsData ? [...followsData, ...followListApi?.data] : [...followListApi?.data]);
  }, [followListApi]);
  
  // latestId 찾기
  useEffect(() => {
    setLatestId(followListApi?.data[followListApi?.data?.length - 1]?._id)
  }, [followListApi, page]);

  useEffect(() => {
    setFinalRender(followsData?.map((i, index) => (<MyBoardFollowList key={index} data={i} type={routerTab} />) ) )
  }, [routerTab, followsData]);
    
  const followTab = [
      {id:0, title:'Following', value:'following'},
      {id:1, title:'Follower', value:'follower'}
    ];

    return (
    <Layout>
      <FollowsLayout>
        <LayoutInner>
          {/* 팔로우 헤더 상단 */}
          <HeaderBox show={show}>
            <TopHeaderBox>
              <ArrowBtnwrap>
                <ArrowBtn onClick={() => router.back()} />
              </ArrowBtnwrap>
              <UserPfBox>
                <UserNick>{followData?.nickname}</UserNick>
                <UserId>{followData?.screenId}</UserId>
              </UserPfBox>
            </TopHeaderBox>
            <FollowTabBox>
              { followTab.map(({id, title, value}) => (
                <FollowTab 
                key={id} 
                tabType={routerTab === value} 
                onClick={ () => setRouterTab(value) }>
                  {title}
                </FollowTab>
              ) ) }
            </FollowTabBox>
            {/* // 팔로우 헤더 상단 끝*/}
          </HeaderBox>
          {/* 팔로우 본문 */}
          <ContentBox>
            { finalRender }
            
            {!followLoding ? <Observer {...scroll} /> : null}
            {/* // 팔로우 본문 끝 */}
          </ContentBox>
        </LayoutInner>
      </FollowsLayout>
    </Layout>
  );
};

/* 마이페이지 스타일링 */
// 공통 부문

//레이아웃
const Layout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const FollowsLayout = styled.div`
  display: flex;
  min-width: 650px;
  width: calc(100% - 65%);
  height: 100%;
  @media (max-width: 900px) {
    width: 100%;
    min-width: 360px;
  }
`;
const LayoutInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
// 상단 부분
const HeaderBox = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 54px;
  left: 0;
  width: 100%;
  height: auto;
  background: ${(props) => props.theme.color.whiteColor};
  margin-bottom: 3px;
  transition: all 0.2s 0.3s ease-in-out;
  z-index: 9;
  @media (max-width: 900px) {
    top: ${(props) => (props.show ? 0 : -54)}px;
  }
`;
const TopHeaderBox = styled.div`
  display: flex;
  padding: 14px 20px 0 20px;
`;
const ArrowBtnwrap = styled.div``;
const ArrowBtn = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  cursor: pointer;
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    margin-left: 8px;
    border-top: 3px solid ${(props) => props.theme.color.darkGray};
    border-right: 3px solid ${(props) => props.theme.color.darkGray};
    transform: rotate(-135deg);
  }
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
`;
// 유저 아이디 영역
const UserPfBox = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-left: 12px;
  margin-top: 3px;
`;
const UserNick = styled.span`
  height: 18px;
  padding-top: 2px;
  ${(props) => props.theme.textOneLine};
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
`;
const UserId = styled.span`
  color: ${(props) => props.theme.color.softBlackColor};
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  margin-top: 4px;
`;
// 팔로잉 팔로워 선택 탭
const FollowTabBox = styled.div`
  display: flex;
  justify-content: space-around;
`;
const FollowTab = styled.button`
  width: 100%;
  height: 46px;
  color: ${(props) => (props.tabType ? props.theme.color.orangeColor : props.theme.color.darkGray)};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  cursor: pointer;
  padding-bottom: 3px;
  border-bottom: 3px solid ${(props) => (props.tabType ? props.theme.color.softOrangeColor : props.theme.color.softGrayColor)};
  &:hover {
    background: ${(props) => props.theme.color.semiOrangeColor};
  }
`;

// 본문
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: ${(props) => props.theme.color.whiteColor};
`;

const Observer = styled.span`
  display: block;
  width: 100%;
  height: 1;
  margin: 1px 0;
`;
export default MyBoardFollow;
