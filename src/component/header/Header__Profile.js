import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';

// 컴포넌트 import
import { LangHeaderProfile } from '@language/Lang.Header';
import { LanguageContext, AlertContext, AppDataContext } from '@store/App_Store';

// Hook & Context
import { useToggle } from '@hooks/useToggle';
import { HeaderDataContext } from './Header';
import { useUrlMove } from '@hooks/useUrlMove';
import { useConvertURL } from '@hooks/useConvertURL';
import { useCookie } from '@hooks/useCookie';

// 이미지 import
// import Xbtn from "../../img/X-mark.png";

// 프로필 팝업

const HeaderPfPopup = () => {
  const router = useRouter();

  const [goURL] = useUrlMove();
  const [profileURL, , convertProfileIamge] = useConvertURL();
  //cookie
  const [, testCookieHandle] = useCookie();
  const [, cookieHandle] = useCookie();
  const [cookieValue, getCookie] = useCookie();
  const [testCookieValue, getTestCookie] = useCookie();

  const { alertState, alertPatch } = useContext(AlertContext);
  const { langState } = useContext(LanguageContext);
  const { setLoginOn } = useContext(AppDataContext);

  const { toggleSearchPop, show, profileApi, profileError } = useContext(HeaderDataContext);
  const [isOpen, setIsOpen] = useToggle();

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { profileSet, goToBookMark, policyInform, changeAccount, logOutTab, sessionExpire } = LangHeaderProfile;
  const _profileSet = profileSet[selectedLanguage] || profileSet[defaultLanguage],
    _goToBookMark = goToBookMark[selectedLanguage] || goToBookMark[defaultLanguage],
    _policyInform = policyInform[selectedLanguage] || policyInform[defaultLanguage],
    _changeAccount = changeAccount[selectedLanguage] || changeAccount[defaultLanguage],
    _logOutTab = logOutTab[selectedLanguage] || logOutTab[defaultLanguage],
    _sessionExpire = sessionExpire[selectedLanguage] || sessionExpire[defaultLanguage];

  const logout = () => {
    getTestCookie('GET', 'test');
    getCookie('GET', 'access_token');

    cookieHandle('DELETE', 'access_token');
    testCookieHandle('DELETE', 'test');
    
    if (!cookieValue || !testCookieValue) {
      localStorage.removeItem('loginOn');
      localStorage.removeItem('userNick');
      localStorage.removeItem('userid');
      setLoginOn(false);
      setIsOpen();
      goURL({ pathname: '/login' });
    }
  };

  useEffect(() => {
    if (profileError?.status === 401) {
      router.reload()
      alert(_sessionExpire);
      logout();
    }
  }, [profileError]);

  useEffect(() => {
    toggleSearchPop(false);
    convertProfileIamge(profileApi?.data?.profile?.thumbnail);
  }, [profileApi]);

  const navTabArr = [
    { method: () => [setIsOpen(), goURL({ pathname: `/mypage/profile` })], title: _profileSet, icon: '/static/header/profileIcon.svg' },
    { method: () => [setIsOpen(), goURL({ pathname: `/myboard/${profileApi?.data?.screenId}/bookmarks` })], title: _goToBookMark, icon: '/static/header/headerBookMark.svg' },
    { method: () => [setIsOpen(), goURL({ pathname: `/policy/service` })], title: _policyInform, icon: '/static/header/policyIcon.svg' },
    { method: () => alertPatch({ type: 'NOT_SERVICE', payload: true }), title: _changeAccount, icon: '/static/header/switchIcon.svg' },
    { method: () => logout(), title: _logOutTab, icon: '/static/header/logoutIcon.svg' },
  ];

  return (
    <>
      <ProfileImgBox onClick={() => setIsOpen()}>
        <ProfileImgInner profile={profileURL} />
      </ProfileImgBox>
      {
        isOpen && (
          <PopupLayout id="closemodal" onClick={() => setIsOpen()}>
            <PopUpInner show={show}>
              {/* 유저 프로필 팝업의 헤더 부분 */}
              <PopupAnchorHd>
                <TabWrap onClick={() => goURL({ pathname: `/myboard/${profileApi.data.screenId}` })}>
                  <ProfileImgBox>
                    <ProfileImgInner profile={profileApi?.data?.profile?.thumbnail} />
                  </ProfileImgBox>
                  <TabIdWrap>
                    <ProfileNick>{profileApi?.data?.nickname}</ProfileNick>
                    <ProfileId>{profileApi?.data?.screenId}</ProfileId>
                  </TabIdWrap>
                </TabWrap>
                <ClosedBox>
                  <ClosedBtn onClick={() => setIsOpen()} />
                </ClosedBox>
              </PopupAnchorHd>
              {/* // 유저 프로필 팝업의 헤더 부분 끝 */}

              {/* 프로필 설정 */}
              {
                navTabArr.map((navTab, index) => (
                  <PopupAnchor key={index}>
                    <TabWrap onClick={navTab.method}>
                      <IconImg icon={navTab.icon} />
                      <ProfileTextTab>{navTab.title}</ProfileTextTab>
                    </TabWrap>
                  </PopupAnchor> ))
              }
            </PopUpInner>
          </PopupLayout> )
      }
    </>
  );
};

/* 컴포넌트 스타일링 */
// 공통 부문
const PopupLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999999;
`;

// 레이아웃
const PopUpInner = styled.div`
  position: fixed;
  display: flex;
  flex-flow: column;
  top: 55px;
  right: 100px;
  width: 340px;
  height: auto;
  border-radius: 12px;
  z-index: 99999 !important;
  background: #fff;
  overflow: hidden;
  background: #f7f7f7;
  box-shadow: ${(props) => props.theme.boxshadow.popup};
  outline: none;
  transition: all 0.2s 0.3s ease-in-out;
  @media (max-width: 900px) {
    top: ${(props) => (props.show ? 55 : 0)}px;
    right: 0;
    width: 100%;
    border-radius: 0 0 8px 8px;
  }
`;
/* 팝업 내부 탭 스타일링 */

// 프로필 상단 My 탭 스타일링

const PopupAnchorHd = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 3px;
  background: ${(props) => props.theme.color.whiteColor};
`;

const TabWrap = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  padding: 7px 10px;
  cursor: pointer;
`;

// 프로필 버튼
const ProfileImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  min-width: 42px;
  min-height: 42px;
  width: 42px;
  height: 42px;
  overflow: hidden;
  cursor: pointer;
`;

const ProfileImgInner = styled.span`
  background: ${(props) => (props.profile ? `url(${props.profile}) no-repeat center center / cover` : `${props.theme.color.hoverColor}`)};
  width: 100%;
  height: 100%;
`;

const TabIdWrap = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
  justify-content: center;
  padding-left: 6px;
  padding-right: 120px;
`;

// 닫기 버튼

const ClosedBox = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 1em;
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
//프로필 유저 정보
const ProfileNick = styled.h1`
  height: 18px;
  padding-top: 2px;
  ${(props) => props.theme.textOneLine};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.blackColor};
`;
const ProfileId = styled.span`
  ${(props) => props.theme.textOneLine};
  color: ${(props) => props.theme.color.softBlackColor};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  font-size: ${(props) => props.theme.fontSize.font14};
  margin-top: 2px;
  padding-bottom: 2px;
`;

// 프로필 하단 탭 스타일링
const PopupAnchor = styled(PopupAnchorHd)`
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
`;

const IconImg = styled.svg`
  background: url(${(props) => props.icon}) no-repeat center center / contain;
  margin: 0.2em 0.8em;
  width: 1.5em;
  height: 1.5em;
`;

const ProfileTextTab = styled.span`
  margin: 14px 3px;
  font-weight: ${(props) => props.theme.fontWeight.font500};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
`;

export default HeaderPfPopup;
