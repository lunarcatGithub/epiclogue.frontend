import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// 컴포넌트 import
import Modal from '@utils/Modal';
import ConfirmPopup from '@utils/ConfirmPopup';
import MyBoardLanguage from './MyBoard.Language';
import { Progress } from '@utils/LoadingProgress';
import AutoHiding from '@utils/autoHiding';
import MainContent from '../content/Contents__Form';

// hooks&reducer
import { useToggle } from '@hooks/useToggle';
import { useConvertTags } from '@hooks/useConvertTags';
import { useModal } from '@hooks/useModal';
import { useUrlMove } from '@hooks/useUrlMove';
import { useDate } from '@hooks/useDate';
import useAxiosFetch from '@hooks/useAxiosFetch';
import { AppDataContext, LanguageContext } from '@store/App_Store';
import useDebounce from '@hooks/useDebounce';
import { Meta } from '@utils/MetaTags';
import useScroll from '@hooks/useScroll';

// 아이콘 import

export default function MyBoard({ boardItem, userId, nonError }) {
  const [goURL] = useUrlMove();
  const { t } = useTranslation('common');
  const router = useRouter();

  const { setMyboardData, loginOn, setUnAuth, followData, setFollowData } = useContext(AppDataContext);

  const [follow, toggleFollow] = useToggle();

  const [date, setDate] = useState();
  const [checkMe, setCheckMe] = useState();
  const [userScreenId, setUserScreenId] = useState();

  // debounce 처리
  const [followDebounce, getValue] = useDebounce();

  useEffect(() => {
    setUserScreenId(followData?.screenId);
  }, [followData]);

  // 헤더 스크롤용
  const show = AutoHiding();

  // 태그 및 하이퍼링크 convert
  const [converted, convert] = useConvertTags();

  // confirm popup
  const [state_Confirm, toggle_Modal_Confirm] = useModal();
  // 날짜
  const [setGetDate, setCountryDivided, countryResult] = useDate();

  //tab
  const [isTab, setIsTab] = useState(router?.query?.tab || 'all');

  // 콘텐츠 렌더링
  const [initRender, setInitRender] = useState([]);
  const [renderComponent, setRenderComponent] = useState();

  // scroll
  const [page, scroll] = useScroll();

  //언어 변수
  const { langState } = useContext(LanguageContext);
  const { selectedLanguage, defaultLanguage } = langState;

  const { navTabArr, _signDate, _noIntro, _followingBtn, _followBtn } = MyBoardLanguage();

  //fetch
  const [, , , followFetch] = useAxiosFetch();
  const [boardDataLoding, boardDataApi, , boardDataFetch] = useAxiosFetch();

  const submitHandler = () => {
    if (!loginOn) return;
    getValue(follow);
    followFetch(`${process.env.NEXT_PUBLIC_API_URL}/interaction/follow`, followDebounce ? 'delete' : 'post', { targetUserId: boardItem?.data?._id });
  };

  useEffect(() => {
    if (!loginOn) return;
    getValue(follow);
  }, [follow]);

  const moveFollowList = (type) => {
    if (!loginOn) {
      setUnAuth(true);
      return;
    }
    goURL({ pathname: `/follows/[id]`, as: `/follows/${userScreenId}`, query: { tab: type } });
  };

  useEffect(() => {
    setFollowData(boardItem?.data);
    setCountryDivided(selectedLanguage || defaultLanguage);
    convert(boardItem?.data?.intro);
    setGetDate(boardItem?.data.joinDate);
    setDate(boardDataLoding ? '00-00-00' : countryResult);
    toggleFollow(boardItem?.data?.isFollowing);
    localStorage.getItem('userid') === boardItem?.data?.screenId && setCheckMe(true);
  }, [boardItem, countryResult]);

  useEffect(() => {
    const params = {};

    userScreenId && boardDataFetch(`${process.env.NEXT_PUBLIC_API_URL}/myboard/${userScreenId}/${isTab}`, 'get', null);
  }, [isTab, userScreenId]);

  useEffect(() => {
    setMyboardData(boardDataApi?.data);
  }, [boardDataApi, router?.query?.id]);

  useEffect(() => {
    setInitRender(null);
  }, [router?.query?.id]);

  useEffect(() => {
    nonError === 404 && toggle_Modal_Confirm(true);
  }, [nonError]);

  useEffect(() => {
    boardDataApi && setInitRender(initRender ? [...initRender, ...boardDataApi?.data] : [...boardDataApi?.data]);
  }, [boardDataApi]);

  useEffect(() => {
    setInitRender([]);
  }, [isTab]);

  useEffect(() => {
    setRenderComponent(initRender?.map((item, index) => <MainContent key={index} contentData={item} />));
    return () => setRenderComponent();
  }, [initRender]);

  const metaData = {
    title: `${boardItem?.data?.nickname}${t('metaBoardTitle')}`,
    description: `${boardItem?.data?.intro} || ${t('boardDescFirst')}${boardItem?.data?.screenId}${t('boardDescSecond')}`,
    image: [`${boardItem?.data?.profile?.thumbnail?.origin}`],
    canonical: `myboard/${boardItem?.data?._id}`,
  };

  return (
    <>
      <Meta meta={metaData} />
      <Layout>
        <LayoutInner>
          <BackgroundBox>
            <BackgroundImg banner={followData?.banner?.origin} />
          </BackgroundBox>

          <GradientBox>
            {/* 레이아웃 상단 유저정보 레이아웃 시작 */}
            <UserInformBox>
              <UserPfImgBox>
                <UserPfImg profile={followData?.profile?.origin} />
              </UserPfImgBox>
              <UserNickName>{followData?.nickname}</UserNickName>
              {/* 유저 아이디, 가입일 시작 */}
              <UserIdCreateDateBox>
                <UserIdTag>{followData?.screenId}</UserIdTag>
                <CreateIdDate>
                  {_signDate} {date}
                </CreateIdDate>
              </UserIdCreateDateBox>
              {/* 유저 소개 시작 */}
              <UserIntroduceBox>
                <UserIntroduce>{converted.length === 0 ? `${followData?.nickname} ${_noIntro}` : converted}</UserIntroduce>
              </UserIntroduceBox>
              {/* 팔로우 버튼 시작 */}
              <FollowsBox>
                <FollowButton type="following" onClick={() => moveFollowList('following')}>
                  {_followingBtn}
                  <FollowScore>{followData?.followingCount}</FollowScore>
                </FollowButton>

                <FollowButton onClick={() => moveFollowList('follower')}>
                  {_followBtn}
                  <FollowScore>{followData?.followerCount}</FollowScore>
                </FollowButton>
                {!checkMe && (
                  <ButtonWrap>
                    {/* <FollowAddButton data={String(follow)} onClick={toggleFollow}>
                          {follow ? _followingBtn : _followBtn}
                        </FollowAddButton> */}
                    <FollowAddButton
                      styling={follow}
                      onClick={() => {
                        if (!loginOn) {
                          setUnAuth(true);
                          return;
                        }
                        toggleFollow();
                        submitHandler();
                      }}
                    >
                      {follow ? _followingBtn : _followBtn}
                    </FollowAddButton>
                    {/* <MoreMenuBtn>
                          <MoreMenu />
                        </MoreMenuBtn> */}
                  </ButtonWrap>
                )}
              </FollowsBox>
              {/*// 레이아웃 상단 유저정보 레이아웃 끝 */}
            </UserInformBox>
          </GradientBox>
          {/* 네비게이션 시작 */}
          <NavBar show={show}>
            <NavBarInner>
              { navTabArr.map((nav, index) => (
                <NavItem
                  key={index}
                  styling={isTab === nav.link}
                  onClick={() => {
                    setIsTab(nav.link);
                    goURL({
                      pathname: `/myboard/${followData?.screenId}`,
                      as: `/myboard/${followData?.screenId}`,
                      query: {
                        tab: nav.link,
                      },
                    });
                  }}
                >
                  <NavAllButton>{nav.title}</NavAllButton>
                </NavItem>
              ) ) }
            </NavBarInner>
          </NavBar>
          {/* 작품 콘텐츠 시작 */}
          <ContentsBox myboardData={boardDataApi?.data.length}>
            <ContentsLayout>
              <ContentsInner>
                <MasonryBox>{renderComponent}</MasonryBox>
              </ContentsInner>
              { boardDataLoding && (
                <DummyLayout>
                  <Progress />
                </DummyLayout>
              ) }
              {!boardDataLoding ? <RefLayout {...scroll} /> : null}
            </ContentsLayout>
          </ContentsBox>
        </LayoutInner>
      </Layout>
      { state_Confirm && (
        <Modal visible={state_Confirm} closable={true} maskClosable={true} onClose={() => toggle_Modal_Confirm(false)}>
          <ConfirmPopup handleModal={() => toggle_Modal_Confirm(false)} setAccessConfirm={goURL} type={'REMOVE_USER'} />
        </Modal>
      ) }
    </>
  );
}

// 전체 레이아웃
const Layout = styled.div`
  width: 100%;
  height: 100%;
`;
const LayoutInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

// 배경 고정
const BackgroundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 3.8em;
  width: 100%;
  height: 60%;
  z-index: -1;
  user-select: none;
`;
const BackgroundImg = styled.span`
  background: url(${(props) => props.banner}) no-repeat center center / cover;
  width: 100%;
  height: 100%;
`;

// 그라디언트 적용 박스
const GradientBox = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.3) 85%), linear-gradient(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1) 55%),
    linear-gradient(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.8) 100%);
  /* width: 100%; */
  min-height: 320px;
  height: 100%;
`;
// 그라디언트 - 유저 정보
const UserInformBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 50px;
  z-index: 9999;
`;
const UserPfImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin-bottom: 12px;
  overflow: hidden;
  background: ${(props) => props.theme.color.backgroundColor};
  border: 4px solid ${(props) => props.theme.color.whiteColor};
`;

const UserPfImg = styled.span`
  background: ${(props) => (props.profile ? `url(${props.profile}) no-repeat center center / cover` : `${props.theme.color.hoverColor}`)};
  width: 100%;
  height: 100%;
  user-select: none;
`;

// 그라디언트 - 유저 닉네임
const UserNickName = styled.span`
  font-size: ${(props) => props.theme.fontSize.font18};
  color: ${(props) => props.theme.color.whiteColor};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  margin-bottom: 8px;
  @media (max-width: 900px) {
    margin-bottom: 2px;
  }
`;
// 그라디언트 - 유저 아이디, 아이디 생성일
const UserIdCreateDateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.3em 0;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const UserIdTag = styled.span`
  position: relative;
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.whiteColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  margin-right: 20px;
  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 7px;
    right: -13px;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: ${(props) => props.theme.color.whiteColor};
  }
  @media (max-width: 900px) {
    margin-right: 0;
    margin-bottom: 8px;

    &::before {
      display: none;
    }
  }
`;
const CreateIdDate = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.whiteColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};
`;
// 그라디언트 - 자기소개
const UserIntroduceBox = styled.div`
  display: flex;
  justify-content: center;
  max-width: 30em;
  width: 100%;
  height: auto;
  padding: 0.4em 1em;
  margin: 1em 0;
`;
const UserIntroduce = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.whiteColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  line-height: 18px;
`;

// 그라디언트 팔로잉 팔로워
const FollowsBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8em;
  user-select: none;
`;
const FollowButton = styled.button`
  position: relative;
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.whiteColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  margin-right: ${(props) => (props.type === 'following' ? `1.3em` : 0)};
  white-space: nowrap;
  cursor: pointer;
  &::before {
    content: '';
    display: ${(props) => (props.type === 'following' ? `inline-block` : `none`)};
    position: absolute;
    top: 9px;
    right: -12px;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: ${(props) => props.theme.color.whiteColor};
    cursor: default;
  }
`;

const ButtonWrap = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-left: 16px;
  /* &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 5px;
    right: -12px;
    width: 1px;
    height: 14px;
    border-radius: 0;
    background: ${(props) => props.theme.color.whiteColor};
    cursor: none;
  } */
`;
const FollowScore = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.whiteColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  margin-left: 4px;
  cursor: pointer;
`;
 
// 팔로우하기 버튼
const FollowAddButton = styled.button`
  font-size: ${(props) => props.theme.fontSize.font13};
  color: ${(props) => props.theme.color.whiteColor};
  font-weight: ${(props) => (props.styling ? props.theme.fontWeight.font500 : props.theme.fontWeight.font300)};
  padding: 0.3em 0.8em;
  border: 1px solid ${(props) => (props.styling ? props.theme.color.darkOrange : props.theme.color.whiteColor)};
  background: ${(props) => (props.styling ? props.theme.color.darkOrange : null)};
  border-radius: 25px;
  cursor: pointer;
  margin-right: 1em;
`;

// 더보기 메뉴 버튼
const MoreMenuBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8em;
  border: 1px solid ${(props) => props.theme.color.softGrayColor};
  border-radius: 50%;
  cursor: pointer;
`;

const MoreMenu = styled.span`
  position: relative;
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${(props) => props.theme.color.softGrayColor};

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    right: 6px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${(props) => props.theme.color.softGrayColor};
  }
  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    right: -6px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${(props) => props.theme.color.softGrayColor};
  }
`;

// 네비게이션 - 레이아웃
const NavBar = styled.div`
  position: sticky;
  top: 53px;
  width: 100%;
  height: 2.8em;
  background: ${(props) => props.theme.color.darkBlackOpacity};
  z-index: 1;
  transition: all 0.2s 0.3s ease-in-out;

  @media (max-width: 900px) {
    top: ${(props) => (props.show ? 53 : 0)}px;
  }
`;
const NavBarInner = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  user-select: none;
`;

// 네비게이션 - 버튼

const NavAllButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.softGrayColor};
  font-weight: ${(props) => props.theme.fontWeight.font500};
`;

// NavLink 스타일 ****

const NavItem = styled.button`
  display: flex;
  width: 100%;
  max-width: 8em;
  height: 100%;
  cursor: pointer;
  transition: all 0.05s ease-in-out;
  background: ${(props) => props.styling && props.theme.color.darkGray};

  &:active {
    background: ${(props) => props.theme.color.darkGray};
    opacity: 0.5;
  }
`;

// 본문 콘텐츠
const ContentsLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0.5em;
`;

const RefLayout = styled.div`
  display: flex;
  color: #222;
  width: 200px;
  height: 50px;
`;

const ContentsBox = styled.div`
  display: flex;
  width: 100%;
  height: ${(props) => (props.myboardData < 20 ? `100vh` : `100%`)};
  background: ${(props) => props.theme.color.backgroundColor};
`;
const ContentsInner = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.color.backgroundColor};
`;

const MasonryBox = styled.section`
  display: grid;
  justify-content: center;
  height: 100%;
  grid-template-columns: repeat(auto-fill, minmax(14%, 1fr));
  column-gap: 0.4em;
  padding: 0.8em;
  @media (max-width: 1280px) {
    grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
  }
  @media (max-width: 980px) {
    grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  }
  @media (max-width: 380px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`;

const DummyLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
