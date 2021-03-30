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
import { useUrlMove } from '@hooks/useUrlMove';

const MyBoardFollow = ({ routeId, routeTab }) => {
  const router = useRouter();
  const [goURL] = useUrlMove();

  const { followData, followButton, setFollowButton } = useContext(AppDataContext);
  // tab
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);

  // 팔로우 리스트 무한 스크롤
  const [items, setItems] = useState(5);
  const [sliceFollowing, setSliceFollowing] = useState();
  const [sliceFollower, setSliceFollower] = useState();
  const [page, scroll] = useScroll();
  //fetch
  const [, followListApi, , followListFetch] = useAxiosFetch();

  // 헤더 스크롤용
  const show = AutoHiding();

  const moveFollowList = (type) => {
    setFollowButton(type);
    goURL({ pathname: `/follows/${routeId}`, query:{tab:type, id:routeId} });
  };

  useEffect(() => {
    setItems((items) => items + 10);
    if (routeTab === 'following') {
      setSliceFollowing(followingList?.slice(0, items));
    } else {
      setSliceFollower(followerList?.slice(0, items));
    }
  }, [page, followingList, followerList]);

  useEffect(() => {
    followListFetch(`${process.env.NEXT_PUBLIC_API_URL}/interaction/follow?screenId=${routeId}&type=${routeTab}`, 'get', null, null, null);
  }, [routeTab]);

  useEffect(() => {
    if (!followListApi) return;
    routeTab === 'following' ? setFollowingList(followListApi?.data) : setFollowerList(followListApi?.data);
  }, [followListApi]);


  return (
    <Layout>
      <FollowsLayout>
        <LayoutInner>
          {/* 팔로우 헤더 상단 */}
          <HeaderBox show={show}>
            <TopHeaderBox>
              {/* <Link to={`/myboard/${dataId}`}>
                  <ArrowBtn />
                </Link> */}
              <ArrowBtnwrap>
                <ArrowBtn onClick={() => router.back()} />
              </ArrowBtnwrap>
              <UserPfBox>
                <UserNick>{followData?.nickname}</UserNick>
                <UserId>{followData?.screenId}</UserId>
              </UserPfBox>
            </TopHeaderBox>
            <FollowTabBox>
              <FollowingTab tabType={routeTab} onClick={() => moveFollowList('following')}>
                Following
              </FollowingTab>
              <FollowerTab tabType={routeTab} onClick={() => moveFollowList('follower')}>
                Follower
              </FollowerTab>
            </FollowTabBox>
            {/* // 팔로우 헤더 상단 끝*/}
          </HeaderBox>
          {/* 팔로우 본문 */}
          <ContentBox>
            {
              routeTab === 'following' ? sliceFollowing?.map((i, index) => <MyBoardFollowList key={index} data={i} type="following" />)
              :
              sliceFollower?.map((i, index) => <MyBoardFollowList key={index} data={i} type="follower" />)
            }
            {/* // 팔로우 본문 끝 */}
            <Observer {...scroll} />
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
const FollowingTab = styled.button`
  width: 100%;
  height: 46px;
  color: ${(props) => (props.tabType === 'following' ? props.theme.color.orangeColor : props.theme.color.darkGray)};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  cursor: pointer;
  padding-bottom: 3px;
  border-bottom: 3px solid ${(props) => (props.tabType === 'following' ? props.theme.color.softOrangeColor : props.theme.color.softGrayColor)};
  &:hover {
    background: ${(props) => props.theme.color.semiOrangeColor};
  }
`;
const FollowerTab = styled.button`
  width: 100%;
  height: 46px;
  color: ${(props) => (props.tabType === 'follower' ? props.theme.color.orangeColor : props.theme.color.darkGray)};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  cursor: pointer;
  padding-bottom: 3px;
  border-bottom: 3px solid ${(props) => (props.tabType === 'follower' ? props.theme.color.softOrangeColor : props.theme.color.softGrayColor)};
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
