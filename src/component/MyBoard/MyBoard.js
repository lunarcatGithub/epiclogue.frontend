import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// 컴포넌트 import
import { LanguageContext, AppDataContext } from '@store/App_Store';
import { LangMyBoard } from '@language/Lang.Myboard';
import { LangCommon } from '@language/Lang.Common';
import { langMetaBoard } from '@language/Lang.Meta';
import Contents from '../content/Contents';
import Modal from '@utils/Modal';
import ConfirmPopup from '@utils/ConfirmPopup';

// hooks&reducer
import AutoHiding from '@utils/autoHiding';
import { useToggle } from '@hooks/useToggle';
import {useConvertTags} from '@hooks/useConvertTags';
import { useModal } from '@hooks/useModal';
import { useUrlMove } from '@hooks/useUrlMove';
import {useDate} from '@hooks/useDate';
import useAxiosFetch from '@hooks/useAxiosFetch';

// 아이콘 import

export default function MyBoard({boardItem, userId}) {
  const {loginOn, setUnAuth} = useContext(AppDataContext);
  const [goURL] = useUrlMove();
  const router = useRouter();

  const { langState } = useContext(LanguageContext);
  const { myboardData, setMyboardData } = useContext(AppDataContext);
  const [follow, toggleFollow] = useToggle();

  const [date, setDate] = useState();
  const [checkMe, setCheckMe] = useState();

  const [boardData, setBoardData] = useState();

  // 헤더 스크롤용
  const show = AutoHiding()

  // 태그 및 하이퍼링크 convert
  const [converted, convert] = useConvertTags();

  // confirm popup
  const [state_Confirm, toggle_Modal_Confirm] = useModal();
  // 날짜
  const [setGetDate, setCountryDivided, countryResult] = useDate()

  //tab
  const [isTab, setIsTab] = useState('all');

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { signDate, noIntro, allTabs, contentsTabs, bookMarkTabs, secondary } = LangMyBoard;
  const { followBtn, followingBtn } = LangCommon;

  const metaBoardTitle = langMetaBoard();
  const _signDate = signDate[selectedLanguage] || signDate[defaultLanguage],
        _noIntro = noIntro[selectedLanguage] || noIntro[defaultLanguage],
        _followingBtn = followingBtn[selectedLanguage] || followingBtn[defaultLanguage],
        _followBtn = followBtn[selectedLanguage] || followBtn[defaultLanguage],
        _allTabs = allTabs[selectedLanguage] || allTabs[defaultLanguage],
        _contentsTabs = contentsTabs[selectedLanguage] || contentsTabs[defaultLanguage],
        _bookMarkTabs = bookMarkTabs[selectedLanguage] || bookMarkTabs[defaultLanguage],
        _secondary = secondary[selectedLanguage] || secondary[defaultLanguage];

    //fetch
    const [, , , followFetch] = useAxiosFetch();
    const [boardLoding, boardApi, boardError, boardFetch] = useAxiosFetch();
    const [boardDataLoding, boardDataApi, boardDataError, boardDataFetch] = useAxiosFetch();
    console.log(boardDataApi)
    const submitHandler = (e, type, url) => {
      if(!loginOn) return;
      e.preventDefault();
      if(type === 'follow'){
        followFetch(url, follow ? 'post' : 'delete',  { targetUserId: boardItem?.data?._id })
      }
    }

  useEffect(()=>{
    setBoardData(boardItem?.data);
    setCountryDivided(selectedLanguage || defaultLanguage)
    convert(boardItem?.data?.intro);
    setGetDate(boardItem?.data.joinDate);
    setDate(countryResult);
    toggleFollow(boardItem?.data?.isFollowing);
    localStorage.getItem('userid') === boardItem?.data?.screenId && setCheckMe(true)

  },[boardItem, countryResult]);

  useEffect(() => {
    boardDataFetch(`${process.env.API_URL}/myboard/${boardData?.screenId}/${isTab}`, 'get', null);
  }, [isTab, boardData?.screenId]);


  useEffect(() => {
    setMyboardData(boardDataApi?.data)
    boardDataError?.status === 404 && toggle_Modal_Confirm(true)

  }, [boardItem]);

  const navTabArr = [
    {link:'all', title:_allTabs},
    {link:'originals', title:_contentsTabs},
    {link:'secondaryWorks', title:_secondary},
    {link:'bookmarks', title:_bookMarkTabs}
  ]

  return (
    <>
      <Layout>
        <LayoutInner>
          <BackgroundBox>
            <BackgroundImg banner={boardData?.banner?.origin} />
          </BackgroundBox>

          <GradientBox>
            {/* 레이아웃 상단 유저정보 레이아웃 시작 */}
            <UserInformBox>
              <UserPfImgBox>
                <UserPfImg profile={boardData?.profile?.origin} />
              </UserPfImgBox>
              <UserNickName>{boardData?.nickname}</UserNickName>
              {/* 유저 아이디, 가입일 시작 */}
              <UserIdCreateDateBox>
                <UserIdTag>{boardData?.screenId}</UserIdTag>
                <CreateIdDate>
                  {_signDate} {date}
                </CreateIdDate>
              </UserIdCreateDateBox>
              {/* 유저 소개 시작 */}
              <UserIntroduceBox>
                <UserIntroduce>{converted.length === 0 ? `${boardData?.nickname} ${_noIntro}` : converted}</UserIntroduce>
              </UserIntroduceBox>
              {/* 팔로우 버튼 시작 */}
              <FollowsBox>
                  <FollowButton
                    type='following'
                    onClick={()=>{
                      if(!loginOn){
                        setUnAuth(true); 
                        return;
                      }
                      goURL({
                      pathname: '/follows',
                      as:'/follows',
                      query: {
                        follow: 'following',
                        originUser: JSON.stringify(boardData),
                      },
                    })}}>
                    {_followingBtn}
                    <FollowScore>{boardData?.followingCount}</FollowScore>
                  </FollowButton>

                  <FollowButton
                    onClick={()=>{
                      if(!loginOn){setUnAuth(true); return}
                      goURL({
                      pathname: '/follows',
                      as:'/follows',
                      query: {
                        follow: 'follower',
                        originUser: JSON.stringify(boardData),
                      },
                    })
                  }}
                  >
                    {_followBtn}
                    <FollowScore>{boardData?.followerCount}</FollowScore>
                  </FollowButton>
                {!checkMe &&
                  <ButtonWrap>
                    {/* <FollowAddButton data={String(follow)} onClick={toggleFollow}>
                      {follow ? _followingBtn : _followBtn}
                    </FollowAddButton> */}
                  <form 
                  action="" 
                  onSubmit={(e)=>submitHandler(e, 'follow', `${process.env.API_URL}/interaction/follow`)}>
                    <FollowAddButton 
                    styling={follow} 
                    onClick={()=> {
                      if(!loginOn) {
                        setUnAuth(true); return
                      }
                      toggleFollow()
                    }}>
                      {follow ? _followingBtn : _followBtn}
                    </FollowAddButton>
                  </form>
                    {/* <MoreMenuBtn>
                      <MoreMenu />
                    </MoreMenuBtn> */}
                  </ButtonWrap>
                }
              </FollowsBox>
              {/*// 레이아웃 상단 유저정보 레이아웃 끝 */}
            </UserInformBox>
          </GradientBox>
          {/* 네비게이션 시작 */}
          <NavBar show={show}>
            <NavBarInner>
              {
              navTabArr.map((nav, index) => (
                <NavItem 
                key={index}
                styling={isTab === nav.link}
                onClick={()=> {
                  setIsTab(nav.link)
                  goURL({
                  pathname:`/myboard/${boardData?.screenId}`, 
                  as:`/myboard/${boardData?.screenId}`,
                  query:{
                    tab:nav.link
                  }
                  })
                }} >
                  <NavAllButton>{nav.title}</NavAllButton>
                </NavItem>
              ))
              }
            </NavBarInner>
          </NavBar>
          {/* 작품 콘텐츠 시작 */}
          <ContentsBox myboardData={boardDataApi?.data.length}>
            <ContentsInner>
              <Contents type="MYBOARD" boardItem={boardDataApi?.data} />
            </ContentsInner>
          </ContentsBox>
        </LayoutInner>
      </Layout>
      {
      state_Confirm &&
        <Modal visible={state_Confirm} closable={true} maskClosable={true} onClose={() => toggle_Modal_Confirm(false)}>
          <ConfirmPopup handleModal={() => toggle_Modal_Confirm(false)} setAccessConfirm={goURL} type={'REMOVE_USER'}/>
        </Modal>
      }
    </>
  );
};

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
  background:${props => props.profile ? `url(${props.profile}) no-repeat center center / cover` : `${props.theme.color.hoverColor}`}; 
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
  margin-right:${props => props.type === 'following' ? `1.3em` : 0};
  white-space: nowrap;
  cursor: pointer;
  &::before {
    content: '';
    display: ${props => props.type === 'following' ? `inline-block` : `none`};
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
  position:relative;
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
  background: ${(props) => props.styling ? props.theme.color.darkOrange : null};
  border-radius: 25px;
  cursor: pointer;
  margin-right: 1em;
`;

// 더보기 메뉴 버튼
const MoreMenuBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding:0.8em;
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
  z-index:1;
  transition:all .2s .3s ease-in-out;

  @media (max-width:900px){
    top: ${props => props.show ? 53 : 0}px;
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
  background:${props => props.styling && props.theme.color.darkGray};

  &:active {
    background: ${props => props.theme.color.darkGray};
    opacity: 0.5;
  }
`;

// 본문 콘텐츠

const ContentsBox = styled.div`
  display: flex;
  width: 100%;
  height: ${props => props.myboardData < 20 ? `100vh` : `100%`};
  background: ${(props) => props.theme.color.backgroundColor};

`;
const ContentsInner = styled.div`
width: 100%;
height: 100%;
background: ${(props) => props.theme.color.backgroundColor};
`;

