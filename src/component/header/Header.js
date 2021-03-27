import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

// 컴포넌트 import
import HeaderPfPopup from './Header__Profile';
import UserInform from './Header__Inform';
import SearchPopup from './Header__Search';
import { LangHeader } from '@language/Lang.Header';
import AdminFeedback from '@component/develop/AdminFeedback';
import { LangFeedbackMain } from '@language/Lang.Common';
import HeaderUnauth from './Header__Unauth';

// import Xbtn from '../../img/X-mark.png';
// utils
import AutoHiding from '@utils/autoHiding';
import Modal from '@utils/Modal';

// Hooks&&reducer import
import { useChange } from '@hooks/useChange';
import { useModal } from '@hooks/useModal';
import { useUrlMove } from '@hooks/useUrlMove';
import useAxiosFetch from '@hooks/useAxiosFetch';
import { LanguageContext, AlertContext, AppDataContext } from '@store/App_Store';

export const HeaderDataContext = React.createContext();

const Header = () => {
  const router = useRouter();
  const pathname = router.asPath;

  // 경고용 푸시
  const { alertPatch } = useContext(AlertContext);

  //언어 변경
  const { langState, langPatch } = useContext(LanguageContext);
  const { setSearchData, setClickedComic, setClickedIllust, clickedComic, clickedIllust, loginOn, setUnAuth, paramsData } = useContext(AppDataContext);

  // 팝업용
  const [isOpen, toggleIsOpen] = useModal();
  const [searchPopup, toggleSearchPop] = useModal();
  const [category, toggleCategory] = useModal();
  const [isNotification, toggleNoti] = useModal();

  const [searchBody, handleChange] = useChange();

  // 유저 프로필
  const [goURL] = useUrlMove();

  // 헤더 스크롤용
  const show = AutoHiding();

  // 알림
  const [read, setRead] = useState();

  // fetch
  const [profileLoding, profileApi, profileError, profileFetch] = useAxiosFetch();
  const [readLoding, readApi, readError, readFetch] = useAxiosFetch();

  // 헤더 막기
  const [preventHeader, setPreventHeader] = useState();

  //언어 변수
  const { fbBtn } = LangFeedbackMain;
  const { selectedLanguage, defaultLanguage } = langState;
  const { followsButton, searchPlaceholder } = LangHeader;
  const _followsButton = followsButton[selectedLanguage] || followsButton[defaultLanguage],
    _searchPlaceholder = searchPlaceholder[selectedLanguage] || searchPlaceholder[defaultLanguage],
    _fbBtn = fbBtn[selectedLanguage] || fbBtn[defaultLanguage];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchBody === ' ' || searchBody === undefined || searchBody === null) return;
    setSearchData(searchBody);

    if (searchBody[0]?.match('@')) {
      goURL({ pathname: `/search/[type]`, as: `/search/users/${searchBody}`, query: { type: 'users', text: searchBody } });
    } else {
      goURL({
        pathname: `/search/[type]`,
        as: `/search/${paramsData === undefined ? 'latest' : paramsData}/${searchBody}`,
        query: { type: 'latest', text: searchBody },
      });
    }
  };

  useEffect(() => {
    if (profileApi?.status === 401) {
      goURL({ pathname: `/login` });
    }
  }, [profileApi]);

  // 헤더 코믹/일러스트 필터링
  const selectFilterComic = () => {
    setClickedComic(!clickedComic);
    if (!clickedComic || !clickedIllust) {
      setClickedComic(true);
      setClickedIllust(true);
    }
  };

  const selectFilterIllust = () => {
    setClickedIllust(!clickedIllust);
    if (!clickedComic || !clickedIllust) {
      setClickedComic(true);
      setClickedIllust(true);
    }
  };

  // 유저 알림 Read 여부
  const readObserver = () => {
    setRead(readApi?.data?.notiCount);
  };
  console.log(readApi?.data);
  useEffect(() => {
    if (!loginOn) return;
    readFetch(`${process.env.NEXT_PUBLIC_API_URL}/notification/check`, 'get', null, null, null);
  }, [pathname, read]);

  useEffect(() => {
    readObserver();
  }, [pathname]);

  // 유저 프로필 API
  useEffect(() => {
    if (!loginOn) return;
    profileFetch(`${process.env.NEXT_PUBLIC_API_URL}/user/editProfile`, 'get', null, null, null);
  }, [loginOn]);

  useEffect(() => {
    if (profileApi) {
      localStorage.setItem('language', profileApi.data.displayLanguage);
      langPatch({ type: 'LANGUAGE_UPDATE', payload: profileApi.data.displayLanguage });
    }
  }, [profileApi]);

  useEffect(() => {
    ['/epiclogueadmin', '/welcome', '/login', '/login/'].includes(pathname) || pathname.match('/editor/') || pathname.match('/findPass') ? setPreventHeader(false) : setPreventHeader(true);
  }, [pathname]);

  return (
    <HeaderDataContext.Provider value={{ searchBody, toggleSearchPop, toggleIsOpen, toggleNoti, profileApi, profileError }}>
      {/* 헤더 레이아웃 */}
      {preventHeader && (
        <>
          <MainHeader id="header">
            <HeaderOutter show={show} pathname={pathname.match('/upload') && 'none'}>
              <HeaderInner pathname={pathname.match('/viewer') && 'none'}>
                <LogoWrap
                  onClick={() => {
                    toggleSearchPop(false);
                    goURL({ pathname: '/' });
                  }}
                >
                  <LogoImg />
                </LogoWrap>
                {/* form box 스타일링*/}
                <FormBox id="searchForm" onSubmit={handleSearch} autoComplete="off">
                  <SearchWrap>
                    {/* 검색 input 영역 */}
                    <SerchBar name="searchBody" onChange={handleChange} placeholder={_searchPlaceholder} />
                    <SerchButtonA />
                  </SearchWrap>
                </FormBox>
                {/* 코믹 / 일러스트 토글 버튼 */}
                <CategoryWrap onClick={toggleCategory}>
                  <CategoryButton />
                </CategoryWrap>
                <Dummy />
                {/* 팔로우 작품 및 프로필 버튼 영역 */}
                {loginOn ? (
                  <>
                    <ProfileWrap>
                      <FollowBtn onClick={() => alertPatch({ type: 'NOT_SERVICE', payload: true })}>
                        <ProfileFollow />
                        <FollowTxt>{_followsButton}</FollowTxt>
                      </FollowBtn>
                      {/* </NavItem> */}
                      <HeaderPfPopupWrap>
                        {/* header profile */}
                        <HeaderPfPopup />
                      </HeaderPfPopupWrap>
                    </ProfileWrap>
                    <Dummy />
                    {/* 옵션 set 영역 */}
                    <OptionWrap>
                      <OptionBtn onClick={() => alertPatch({ type: 'NOT_SERVICE', payload: true })}>
                        <OptionDm />
                      </OptionBtn>
                      {/* 알림 */}
                      <OptionBtn
                        onClick={() => {
                          toggleNoti();
                          setRead(0);
                        }}
                      >
                        <OptionInfomation styling={isNotification} />
                        {read > 0 && <InformIconRing />}
                      </OptionBtn>

                      {/* setting */}
                      <OptionBtn onClick={() => goURL({ pathname: `/mypage/profile` })}>
                        <OptionSetting styling={['/mypage/profile', '/mypage/inform', '/mypage/setting'].includes(pathname)} />
                      </OptionBtn>
                    </OptionWrap>
                  </>
                ) : (
                  <HeaderUnauth />
                )}
              </HeaderInner>
              {/* 뷰어 모바일 전용 뒤로가기 헤더 탭*/}
              <MbHeaderInner pathname={pathname.match('/viewer') ? 'flex' : 'none'}>
                <MbHeader>
                  <BackIcon onClick={() => router.back()} />
                </MbHeader>
              </MbHeaderInner>
            </HeaderOutter>
            {/*모바일 영역*/}
            <MobileHeader show={show}>
              <MobileHdInner>
                {/* DM */}
                <MbOptionWrap onClick={() => alertPatch({ type: 'NOT_SERVICE', payload: true })}>
                  <MbOptionDm />
                </MbOptionWrap>
                {/* Notification */}
                <MbOptionWrap>
                  <MbOptionInfo
                    onClick={() => {
                      if (!loginOn) {
                        setUnAuth(true);
                        return;
                      }
                      toggleNoti();
                    }}
                  />
                  {read > 0 && <InformIconRing />}
                </MbOptionWrap>
                {/* Upload */}
                {loginOn ? (
                  <MbOptionWrap onClick={() => goURL({ pathname: '/upload' })}>
                    <MbOptionUpload />
                  </MbOptionWrap>
                ) : (
                  <MbOptionWrap onClick={() => setUnAuth(true)}>
                    <MbOptionUpload />
                  </MbOptionWrap>
                )}

                {/* category select */}
                <MbOptionWrap>
                  <MbCategory onClick={toggleCategory} />
                </MbOptionWrap>

                {/* feedback */}
                <MbOptionWrap>
                  <MbFeedback onClick={toggleIsOpen} />
                </MbOptionWrap>
              </MobileHdInner>
            </MobileHeader>
            {/* // 모바일 영역 끝 */}
          </MainHeader>
          {/*관리자 피드백 버튼*/}
          <AdminFeedbackBtn onClick={toggleIsOpen} pathname={pathname.length < 2 ? 'flex' : 'none'}>
            <FeedbackTitle>{_fbBtn}</FeedbackTitle>
          </AdminFeedbackBtn>
        </>
      )}
      {category ? (
        <CategoryBox>
          <CategoryHeader>
            <HeaderTxt>Filter</HeaderTxt>
            <ClosedBox>
              <ClosedBtn onClick={() => toggleCategory()} />
            </ClosedBox>
          </CategoryHeader>
          <CategoryInner>
            <MbCategoryComic styling={clickedComic} onClick={() => selectFilterComic()}>
              Comic
            </MbCategoryComic>
            <MbCategoryIllust styling={clickedIllust} onClick={() => selectFilterIllust()}>
              Illust
            </MbCategoryIllust>
          </CategoryInner>
        </CategoryBox>
      ) : null}

      {searchPopup ? <SearchPopup /> : ''}
      {isNotification && (
        <Modal visible={isNotification} closable={true} maskClosable={true} onClose={() => toggleNoti(false)}>
          <UserInform />
        </Modal>
      )}
      {isOpen && (
        <Modal visible={isOpen ? true : false} closable={true} maskClosable={true} onClose={() => toggleIsOpen(false)}>
          <AdminFeedback toggleIsOpen={() => toggleIsOpen(false)} />
        </Modal>
      )}
    </HeaderDataContext.Provider>
  );
};
/* 컴포넌트 스타일링 */
// 공통
const PositionCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Button = css`
  width: 100%;
  min-width: 128px;
  height: 42px;
  border-radius: 25px;
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  cursor: pointer;
`;
const Dummy = styled.div`
  margin: 0 0.6em;
  width: 4px;
  height: 36px;
  border-radius: 25px;
  background: ${(props) => props.theme.color.hoverColor};

  @media (max-width: 900px) {
    display: none;
  }
`;

// 헤더 부문
const MainHeader = styled.div`
  display: block;
  width: 100%;
  height: 50px;
`;

const HeaderOutter = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 54px;
  background: ${(props) => props.theme.color.whiteColor};
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  transition: all 0.2s 0.3s ease-in-out;
  z-index: 999;
  @media (max-width: 900px) {
    display: ${(props) => props.pathname};
    top: ${(props) => (props.show ? 0 : -60)}px;
  }
`;

const HeaderInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  @media (max-width: 900px) {
    display: ${(props) => props.pathname};
  }
`;

// 로고 부문
const LogoWrap = styled.div`
  margin: 0 16px 0 16px;
  @media (max-width: 900px) {
    margin: 0 9px 0 9px;
  }
`;

const LogoImg = styled.svg`
  background: url('/static/Logo.svg') no-repeat center center / contain;
  display: block;
  width: 2.5em;
  height: 2.5em;
  user-select: none;
  cursor: pointer;
`;

// 검색부문
const FormBox = styled.form.attrs({})`
  width: 100%;
  box-sizing: border-box;
`;

const SearchWrap = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 42px;
  border-radius: 25px;
  background: ${(props) => props.theme.color.softGrayColor};
  padding-left: 24px;
  @media (max-width: 900px) {
    padding-left: 18px;
  }
`;
const SerchBar = styled.input.attrs({})`
  width: 100%;
  height: 100%;
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font15};

  padding-right: 50px;
  &::placeholder {
    color: ${(props) => props.theme.color.softBlackColor};
    font-weight: ${(props) => props.theme.fontWeight.font700};
    font-size: ${(props) => props.theme.fontSize.font15};
    opacity: 0.5;
    user-select: none;
  }
  @media (max-width: 900px) {
    &::placeholder {
      font-size: ${(props) => props.theme.fontSize.font13};
    }
  }
`;
// 검색 버튼 부문
const SerchButtonA = styled.button.attrs({
  type: 'submit',
})`
  position: absolute;
  top: 7px;
  right: 14px;
  width: 26px;
  height: 26px;
  background: url(${(props) => (props.event ? '/static/src_1.svg' : '/static/src.svg')}) no-repeat center / cover;

  cursor: pointer;
`;

// 카테고리 버튼 분류 버튼
const CategoryWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8em;
  /* margin-left: 0.3em; */
  margin: 0 0.1em 0 0.8em;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
  @media (max-width: 900px) {
    display: none;
  }
`;
const CategoryButton = styled.button`
  background: url('/static/filter.svg') no-repeat center center / contain;
  width: 2em;
  height: 2em;
  cursor: pointer;
`;
// 프로필 분류

const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  user-select: none;
`;

const HeaderPfPopupWrap = styled.div`
  display: flex;
  width: auto;
  margin: 0 6px;
`;

const ProfileFollow = styled.button`
  background: url('/static/follow.svg') no-repeat center / contain;
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const FollowTxt = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.softBlackColor};
  padding-left: 7px;
  white-space: nowrap;
  @media (max-width: 1080px) {
    display: none;
  }
`;

const FollowBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: 8px 14px;
  border-radius: 30px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

// 옵션 아이콘
const OptionWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 12em;
  height: 46px;
  margin: 0 12px 0 6px;
  @media (max-width: 1080px) {
    width: 160px;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;
const OptionBtn = styled.div`
  position: relative;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }

  @media (max-width: 900px) {
    margin-right: 12px;
  }
`;

const OptionDm = styled.button`
  background: url('/static/dm.svg') no-repeat center / contain;
  width: 28px;
  height: 26px;
  cursor: pointer;
  ${PositionCenter};
`;
const OptionInfomation = styled.button`
  background: url(${(props) => (props.styling ? '/static/informOn.svg' : '/static/inform.svg')}) no-repeat center / contain;
  width: 25px;
  height: 29px;
  cursor: pointer;
  ${PositionCenter};
`;
const OptionSetting = styled.button`
  background: url(${(props) => (props.styling ? '/static/setOn.svg' : '/static/set.svg')}) no-repeat center / contain;
  width: 28px;
  height: 28px;
  cursor: pointer;
  ${PositionCenter};
`;

// 알림오면 푸른 벨
const InformIconRing = styled.span`
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => props.theme.color.skyColor};
`;
// 모바일 뷰어 헤더
const MbHeaderInner = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: ${(props) => props.pathname};
    width: 100%;
    height: 100%;
    padding: 0.5em 1em;
  }
`;
const MbHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;
const BackIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  border-radius: 50%;
  &::after {
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    border-top: 0.2em solid ${(props) => props.theme.color.popupColor};
    border-right: 0.2em solid ${(props) => props.theme.color.popupColor};
    transform: rotate(-135deg);
  }
`;

// 모바일 전용 헤더
const MobileHeader = styled.div`
  display: none;
  position: fixed;
  /* bottom: 15px; */
  left: 50%;
  border-radius: 25px;
  transform: translate(-50%, 0);
  width: 300px;
  height: auto;
  background: ${(props) => props.theme.color.whiteColor};
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  transition: all 0.2s 0.3s ease-in-out;
  z-index: 999;
  @media (max-width: 900px) {
    display: block;
    bottom: ${(props) => (props.show ? 15 : -60)}px;
  }
`;

const MobileHdInner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.2em 1em;
`;

const MbOptionWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MbOptionDm = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3em;
  &::before {
    content: '';
    background: url('/static/dm.svg') no-repeat center / contain;
    width: 2em;
    height: 2em;
  }
`;

const MbOptionInfo = styled(MbOptionDm)`
  &::before {
    background: url('/static/inform.svg') no-repeat center center / contain;
  }
`;

const MbOptionUpload = styled(MbOptionDm)`
  &::before {
    background: url('/static/upload-1.svg') no-repeat center center / contain;
    width: 2.2em;
    height: 2.2em;
  }
`;

const MbFollows = styled(MbOptionDm)`
  &::before {
    background: url('/static/follow.svg') no-repeat center center / contain;
  }
`;
const MbFeedback = styled(MbOptionDm)`
  &::before {
    background: url('/static/feedback_0.svg') no-repeat center center / contain;
    width: 2.2em;
    height: 2.2em;
  }
`;
const MbCategory = styled(MbOptionDm)`
  padding: 0.3em 0.3em 0.1em 0.3em;
  &::before {
    background: url('/static/filter.svg') no-repeat center center / contain;
    width: 1.8em;
    height: 1.8em;
  }
`;

// NavLink 스타일 ****
const NavItem = styled.span``;

// 카테고리 영역
const CategoryBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 3.8em;
  right: 20em;
  width: 28em;
  border-radius: 0.4em;
  overflow: hidden;
  z-index: 99999;
  background: ${(props) => props.theme.color.backgroundColor};
  box-shadow: ${(props) => props.theme.boxshadow.popup3};
  @media (max-width: 900px) {
    top: initial;
    bottom: 0;
    left: 0;
    right: initial;
    width: 100%;
    border-radius: 0.4em 0.4em 0 0;
  }
`;
const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 1em 0.3em;
  margin-bottom: 0.2em;
  background: ${(props) => props.theme.color.whiteColor};
`;
const CategoryInner = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.color.whiteColor};
  padding: 1.1em 2.5em;
`;
const HeaderTxt = styled.span`
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.softBlackColor};
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font15};
  }
`;
const MbCategoryComic = styled.button`
  display: flex;
  justify-content: center;
  line-height: 38px;
  padding: 0 5px;
  ${Button};
  border: 2px solid ${(props) => props.theme.color.orangeColor};
  color: ${(props) => (props.styling ? props.theme.color.whiteColor : props.theme.color.orangeColor)};
  background: ${(props) => (props.styling ? props.theme.color.orangeColor : props.theme.color.whiteColor)};
  margin-right: 4px;
`;

const MbCategoryIllust = styled(MbCategoryComic)`
  border: 2px solid ${(props) => props.theme.color.darkGray};
  color: ${(props) => (props.styling ? props.theme.color.whiteColor : props.theme.color.darkGray)};
  background: ${(props) => (props.styling ? props.theme.color.darkGray : props.theme.color.whiteColor)};
  margin-top: 6px;
`;
// 닫기 버튼

const ClosedBox = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0.4em;
  right: 1.5em;
  border-radius: 50%;
  width: 3em;
  height: 3em;
  overflow: hidden;
`;

const ClosedBtn = styled.span`
  ${(props) => props.theme.closeBtn};
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
`;
// 피드백 버튼
const AdminFeedbackBtn = styled.div`
  position: fixed;
  bottom: 11em;
  right: 5.2em;
  display: ${(props) => props.pathname};
  justify-content: center;
  align-items: center;
  border-radius: 2em;
  padding: 0.8em 1.2em;
  background: ${(props) => props.theme.color.skyColor};
  box-shadow: ${(props) => props.theme.boxshadow.popup};
  cursor: pointer;
  user-select: none;
  z-index: 9999;
  @media (max-width: 900px) {
    display: none;
  }
`;
const FeedbackTitle = styled.span`
  color: ${(props) => props.theme.color.whiteColor};
  font-size: 16px;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  @media (max-width: 900) {
    font-size: 14px;
  }
`;

export default Header;
