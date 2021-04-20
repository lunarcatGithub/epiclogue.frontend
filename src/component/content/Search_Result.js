import React, { useContext, useEffect} from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// 컴포넌트 import
import Contents from './Contents';
import { LangSearchResult } from '@language/Lang.Main';

// hooks&reducer
import AutoHiding from '@utils/autoHiding';
import { useUrlMove } from '@hooks/useUrlMove';
import { LanguageContext, AppDataContext } from '@store/App_Store';

const SearchResult = ({query}) => {

  const { setParamsData, paramsData, setRenderList } = useContext(AppDataContext);
  const { langState } = useContext(LanguageContext);
  const router = useRouter();
  const { text, type } = router.query;
  const [goURL] = useUrlMove();

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { popularTab, latestTab, userTab } = LangSearchResult;
  const _popularTab = popularTab[selectedLanguage] || popularTab[defaultLanguage],
    _latestTab = latestTab[selectedLanguage] || latestTab[defaultLanguage],
    _userTab = userTab[selectedLanguage] || userTab[defaultLanguage];

  // 헤더 스크롤용
  const show = AutoHiding();

  const navArr = [
    { data: 'trend', lang: _popularTab },
    { data: 'latest', lang: _latestTab },
    { data: 'users', lang: _userTab },
  ];


  useEffect(() => {
    type && setParamsData(type)
    goURL({ pathname: `/search/[type]`, as: `/search/${type}/${text}`, query: { type, text: text } })
  }, [type, text])

  return (
    <BodyLayout>
      <ContentInner show={show}>
        <MypageTabBox>
          {
            navArr.map((nav, i) => (
              <NavItems key={i} styling={nav.data === type} onClick={() => goURL({ pathname: `/search/[type]`, as: `/search/${nav.data}/${text}`, query: { type: nav.data, text: text } })}>
                <SearchTab styling={nav.data === type} onClick={() => setParamsData(nav.data)}>
                  {nav.lang}
                </SearchTab>
              </NavItems>
            ))
          }
        </MypageTabBox>
      </ContentInner>
      <BookmarkContents>
        <Contents searchType={paramsData || type} type="SEARCH" />
      </BookmarkContents>
    </BodyLayout>
  );
};
/* 마이페이지 스타일링 */
// 전체 레이아웃
const BodyLayout = styled.div`
  display: flex;
  width: 100%;
  background: ${(props) => props.theme.color.backgroundColor};
`;

const ContentInner = styled.div`
  position: fixed;
  top: 38px;
  left: 0;
  display: flex;
  width: 100%;
  height: 56px;
  background: #fff;
  margin-top: 16px;
  z-index: 9;
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  transition: all 0.2s 0.3s ease-in-out;
  @media (max-width: 900px) {
    top: ${(props) => (props.show ? 54 : 0)}px;
    margin-top: 0;
    height: 46px;
  }
`;

// 마이페이지 탭 영역
const MypageTabBox = styled.section`
  display: flex;
  width: 100%;
`;
// NavLink 스타일 ****
const SearchTab = styled.button`
  width: 100%;
  height: 100%;
  font-weight: ${(props) => (props.styling ? props.theme.fontWeight.font700 : props.theme.fontWeight.font500)};
  color: ${(props) => (props.styling ? props.theme.color.darkOrange : props.theme.color.softBlackColor)};
  font-size: ${(props) => props.theme.fontSize.font15};
  cursor: pointer;
`;

const NavItems = styled.span`
  display: flex;
  width: 100%;
  max-width: 8em;
  height: 100%;
  transition: all 0.05s ease-in-out;
  background: ${(props) => props.styling && props.theme.color.microOrangeColor};
  border-bottom: ${(props) => props.styling && `2px solid ${props.theme.color.darkOrange}`};

  &:active {
    background: ${(props) => props.theme.color.darkGray};
    opacity: 0.5;
  }
`;

// 콘텐츠 영역
const BookmarkContents = styled.section`
  display: flex;
  width: 100%;
  margin-top: 68px;
`;

export default SearchResult;
