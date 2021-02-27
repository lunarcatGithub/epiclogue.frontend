import React, { useContext, useEffect } from "react";
import styled from "styled-components";

// 컴포넌트 import
import { LangHeaderProfile } from "../Languge/Lang.Header";
import {LanguageContext, AlertContext, AppDataContext} from '../../store/App_Store';

// Hook & Context
import { useToggle } from "../Hook/useToggle";
import { HeaderDataContext } from "./Header";
import { useUrlMove } from '../Hook/useUrlMove';
import { useConvertURL } from '../Hook/useConvertURL';

// 이미지 import
import Xbtn from "../../img/X-mark.png";
import profileIcon from '../../svg/header/profileIcon.svg';
import bookmarkIcon from '../../svg/header/headerBookMark.svg';
import policyIcon from '../../svg/header/policyIcon.svg';
import switchIcon from '../../svg/header/switchIcon.svg';
import logoutIcon from '../../svg/header/logoutIcon.svg';


// 프로필 팝업

const HeaderPfPopup = () => {
  const [goURL] = useUrlMove();
  const [profileURL, , convertProfileIamge] = useConvertURL();

  const { alertBool } = useContext(AlertContext);
  const { languageState } = useContext(LanguageContext);
  const { setLoginOn } = useContext(AppDataContext);

  const { toggleSearchPop, show, profileApi, profileError } = useContext(HeaderDataContext);
  const [isOpen, setIsOpen] = useToggle();

  //언어 변수
  const { selectedLanguage, defaultLanguage } = languageState;
  const {
    profileSet,
    goToBookMark,
    policyInform,
    changeAccount,
    logOutTab,
  } = LangHeaderProfile;
  const _profileSet =
      profileSet[selectedLanguage] || profileSet[defaultLanguage],
    _goToBookMark =
      goToBookMark[selectedLanguage] || goToBookMark[defaultLanguage],
    _policyInform =
      policyInform[selectedLanguage] || policyInform[defaultLanguage],
    _changeAccount =
      changeAccount[selectedLanguage] || changeAccount[defaultLanguage],
    _logOutTab = logOutTab[selectedLanguage] || logOutTab[defaultLanguage];

  const logout = () => {
    localStorage.removeItem("loginOn");
    localStorage.removeItem("userNick");
    localStorage.removeItem("userid");
    setLoginOn(false)
    setIsOpen();
    goURL('/login')
  };

  useEffect(() => {
    // if(profileError){
    //   logout()
    //   goURL('/main')
    // }
  }, []) 

  useEffect(() => {
    toggleSearchPop(false);
    convertProfileIamge(profileApi?.data?.profile?.thumbnail)
  }, [profileApi]);

  const navTabArr = [
    {method:()=>[ setIsOpen(), goURL({pathname:`/mypage/profile`})], title:_profileSet, icon:profileIcon},
    {method:()=>[ setIsOpen(), goURL({pathname:`/myboard/${profileApi?.data?.screenId}/bookmarks`})], title:_goToBookMark, icon:bookmarkIcon},    
    {method:()=>[ setIsOpen(), goURL({pathname:`/policy/service`})], title:_policyInform, icon:policyIcon},    
    {method:()=> alertBool({ type: "NOT_SERVICE", payload: true }), title:_changeAccount, icon:switchIcon},    
    {method:()=> logout(), title:_logOutTab, icon:logoutIcon}
  ];

  return (
    <>
      <ProfileImgBox onClick={() => setIsOpen()}>
        <ProfileImgInner
          profile={profileURL}
        />
      </ProfileImgBox>
      {
      isOpen && (
        <PopupLayout id="closemodal" onClick={() => setIsOpen()}>
          <PopUpInner show={show}>
            {/* 유저 프로필 팝업의 헤더 부분 */}
            <PopupAnchorHd>
                <TabWrap onClick={() => goURL({pathname:`/myboard/${profileApi.data.screenId}/all`})}>
                  <ProfileImgBox>
                    <ProfileImgInner profile={profileApi?.data?.profile?.thumbnail} />
                  </ProfileImgBox>
                  <TabIdWrap>
                    <ProfileNick>{profileApi?.data?.nickname}</ProfileNick>
                    <ProfileId>{profileApi?.data?.screenId}</ProfileId>
                  </TabIdWrap>
                </TabWrap>
              <ClosedBtn onClick={() => setIsOpen()} />
            </PopupAnchorHd>
            {/* // 유저 프로필 팝업의 헤더 부분 끝 */}

            {/* 프로필 설정 */}
            {
              navTabArr.map((navTab, index) => (
                <PopupAnchor key={index}>
                  <TabWrap
                    onClick={navTab.method}>
                  <IconImg icon={navTab.icon} />
                  <ProfileTextTab>{navTab.title}</ProfileTextTab>
                  </TabWrap>
                </PopupAnchor>
              ))
            }
          </PopUpInner>
        </PopupLayout>
      )}
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
  transition:all .2s .3s ease-in-out;
  @media (max-width: 900px) {
    top: ${props => props.show ? 55 : 0}px;
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
  cursor:pointer;
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
  background:${props => props.profile ? `url(${props.profile}) no-repeat center center / cover` : `${props.theme.color.hoverColor}`}; 
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
const ClosedBtn = styled.button.attrs({ type: "button" })`
  position: absolute;
  top: 6px;
  right: 13px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  &::before {
    content: "";
    background: url(${Xbtn}) no-repeat center / cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 22px;
    height: 22px;
  }
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
  background: url(${props => props.icon}) no-repeat center center / contain;
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
