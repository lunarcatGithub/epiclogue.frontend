import React, { useContext } from 'react';
import styled from 'styled-components';

//컴포넌트 import
import {LangHeaderSearch} from '@language/Lang.Header';
import {LanguageContext} from '@store/App_Store';

//아이콘 import
// import Xbtn from '../../img/X-mark.png';

import { HeaderDataContext } from './Header';

const SearchPopup = () => {
  const {languageState} = useContext(LanguageContext);

  const { searchBody, toggleSearchPop } = useContext(HeaderDataContext);
  //언어 변수
  const {selectedLanguage, defaultLanguage} = languageState;
  const {
    searchHd,
    searchTags,
    searchUsers
    } = LangHeaderSearch;
    const _searchHd = searchHd[selectedLanguage] || searchHd[defaultLanguage],
          _searchTags = searchTags[selectedLanguage] || searchTags[defaultLanguage],
          _searchUsers = searchUsers[selectedLanguage] || searchUsers[defaultLanguage];
  
      return (
      <SearchModal onClick={() => toggleSearchPop()}>
        <SearchBox>
          <SearchInner>
            <SearchTabHdBox>
              <span>"</span>
            <SearchTabHd>{searchBody}</SearchTabHd>
            <span>"</span>
           <SearchTxtTag>{_searchHd}</SearchTxtTag> 

            </SearchTabHdBox>
            <ClosedBtn onClick={() => toggleSearchPop()}></ClosedBtn>
            <SearchResultInner>
              {/* 일반 검색 결과 */}
              <SearchWrap>
                <TxtSearchBtn>테스트용</TxtSearchBtn>
                <TxtSearchBtn>테스트용</TxtSearchBtn>
                <TxtSearchBtn>테스트용</TxtSearchBtn>
                <TxtSearchBtn>테스트용</TxtSearchBtn>
              </SearchWrap>
              {/* // 일반 검색 결과 끝 */}

              {/* 태그 검색 결과  */}
              <SearchWrap>
                <HeaderWrapContainer>
                  <HeaderImg />
                  <HeaderWrap>{_searchTags}</HeaderWrap>
                </HeaderWrapContainer>
                <TagSearchBtn>#Test</TagSearchBtn>
                <TagSearchBtn>#Test</TagSearchBtn>
              </SearchWrap>

              {/* // 태그 검색 결과 끝  */}
              {/* 유저 검색 결과  */}
              <SearchWrap>
                <HeaderWrapContainer>
                  <HeaderImg />
                  <HeaderWrap>{_searchUsers}</HeaderWrap>
                </HeaderWrapContainer>
                <UserResultTab>
                  <ImgBox>
                    <UserPfImg />
                  </ImgBox>
                  <UserInformBox>
                    <SearchUserNick>UserNickName</SearchUserNick>
                    <SearchUserId>@UserId</SearchUserId>
                  </UserInformBox>
                </UserResultTab>
                <UserResultTab>
                  <ImgBox>
                    <UserPfImg />
                  </ImgBox>
                  <UserInformBox>
                    <SearchUserNick>UserNickName</SearchUserNick>
                    <SearchUserId>@UserId</SearchUserId>
                  </UserInformBox>
                </UserResultTab>
              </SearchWrap>
              {/* // 유저 검색 결과 끝 */}
            </SearchResultInner>
          </SearchInner>
        </SearchBox>
      </SearchModal>
  );
};


  /* 검색창 팝업 스타일링 */

// 레이아웃
const SearchModal = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999999;
`;
const SearchBox = styled.div`
  position: fixed;
  top: 54px;
  left: 62px;
  min-width: 600px;
  width: calc(100% - 840px);
  height: 100%;
  max-height: 400px;
  overflow: hidden;
  border-radius: 0 0 8px 8px;
  box-shadow: ${(props) => props.theme.boxshadow.popup};
  z-index: 9999;
  background: ${(props) => props.theme.color.backgroundColor};

  @media (max-width: 900px) {
    min-width: 100%;
    height: 45%;
    left: 0;
  }
`;

const SearchInner = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
`;

// 상단 영역
const SearchTabHdBox = styled.button`
position: relative;
display:flex;
min-width:0;
height: auto;
padding: 13px 20px;
margin-bottom: 3px;
cursor: pointer;
background: ${(props) => props.theme.color.whiteColor};

`

const SearchTabHd = styled.span`
  padding-right:3px;
  ${props => props.theme.textOneLine};

  font-weight: ${(props) => props.theme.fontWeight.font500};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
`;

const SearchTxtTag = styled.span`
flex-shrink: 0;
padding:0 50px 0 3px;
font-weight: ${(props) => props.theme.fontWeight.font500};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};

`

const HeaderWrapContainer = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 5px 18px;
  margin-bottom: 3px;
  cursor: pointer;
  background: ${(props) => props.theme.color.whiteColor};
`;

const HeaderWrap = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.darkGray};
`;

  /* 닫기 버튼 */

// const ClosedBtn2 = styled.button.attrs({ type: 'button' })`
//   position: absolute;
//   top: 4px;
//   right: 20px;
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   cursor: pointer;
//   transition: all 0.2s ease;
//   &::before {
//     content: '';
//     background: url(${Xbtn}) no-repeat center / cover;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 22px;
//     height: 22px;
//   }
//   &:hover {
//     background: ${(props) => props.theme.color.hoverColor};
//   }
// `;
const ClosedBtn = styled.button.attrs({ type: 'button' })`
  ${props => props.theme.closeBtn};
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
`;
const SearchResultInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.whiteColor};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${(props) => props.theme.color.softOrangeColor};
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;
const SearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3px;
`;
const SearchResultTab = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  background: ${(props) => props.theme.color.whiteColor};
  margin-bottom: 2px;
`;

const HeaderImg = styled.span`
  background: url('/static/searchMove.svg') no-repeat center / contain;
  width: 13px;
  height: 13px;
  margin-right: 5px;
`;
// 일반 검색 결과 폼
const TxtSearchBtn = styled.button`
  display: flex;
  width: 100%;
  font-weight: ${(props) => props.theme.fontWeight.font500};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
  background: ${(props) => props.theme.color.whiteColor};
  padding: 6px 20px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
`;
// 태그 검색 결과 폼
const TagSearchBtn = styled(TxtSearchBtn)`
  color: ${(props) => props.theme.color.skyColor};
  padding: 6px 20px;
  background: ${(props) => props.theme.color.whiteColor};
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
`;

// 유저 검색 결과 폼
const UserResultTab = styled(SearchResultTab)`
  display: flex;
  align-content: center;
  padding: 4px 18px;
  margin-bottom: 2px;
`;
const ImgBox = styled.div`
  display: flex;
`;
const UserPfImg = styled.img`
  width: 42px;
  height: 42px;
`;
const UserInformBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;
const SearchUserNick = styled.span`
  font-weight: ${(props) => props.theme.fontWeight.font500};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
`;
const SearchUserId = styled.span`
  font-weight: ${(props) => props.theme.fontWeight.font300};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.softBlackColor};
  margin-top: 4px;
`;

export default SearchPopup;
