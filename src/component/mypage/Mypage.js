import React,{useContext} from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';

// 컴포넌트 import
import MypageProfile from './Mypage__Profile';
import MypageInform from './Mypage__Inform';
import MypageGeneral from './Mypage__General';
import { LangMypage } from '@language/Lang.Mypage';

// Hooks&&reducer import
import {LanguageContext, AppDataContext} from '@store/App_Store';
import { useUrlMove } from '@hooks/useUrlMove';

export const MypageContext = React.createContext();

const Mypage = () => {
 const {langState} = useContext(LanguageContext);
 const {loginOn} = useContext(AppDataContext);
 const router = useRouter();
 const { tab } = router.query;
 const [goURL] = useUrlMove();

 //언어 변수
  const {selectedLanguage, defaultLanguage} = langState;

  const { 
    settingProfile,
    profileTab,
    pushSetTab,
    generalSetTab
   } = LangMypage;

   const _settingProfile = settingProfile[selectedLanguage] || settingProfile[defaultLanguage],
        _profileTab = profileTab[selectedLanguage] || profileTab[defaultLanguage],
        _pushSetTab = pushSetTab[selectedLanguage] || pushSetTab[defaultLanguage],
        _generalSetTab = generalSetTab[selectedLanguage] || generalSetTab[defaultLanguage];

  const list = [
    { id: 1, title: 'profile', contents: <MypageProfile/> },
    { id: 2, title: 'inform', contents: <MypageInform/> },
    { id: 3, title: 'setting', contents: <MypageGeneral/> },
  ];
  // 현재 언어 설정
  const LanguageList = [
    {id:1, title:'한국어', value:'korean', state:0},
    {id:2, title:'日本語', value:'japnese', state:1},
    {id:3, title:'English', value:'english', state:2},
    // {id:4, title:'中国-简体', value:'simpleChinese', state:'zh-cn'},
    // {id:5, title:'中国-繁體', value:'traditionChinese', state:'zh'},
]
  // 언어 변경
  const countryArray = {0:'한국어(Korean)', 1:'日本語(Japanese)', 2:'English'}
  // 관심 언어 설정
  const interestedList = [
    {id:1, title:'한국어', value:'korean', tagId:"korean"},
    {id:2, title:'日本語', value:'japanese', tagId:"japanese"},
    {id:3, title:'English', value:'english', tagId:"english"},
    // {id:4, title:'中国-简体', value:'simpleChinese', tagId:"simpleChinese"},
    // {id:5, title:'中国-繁體', value:'traditionChinese', tagId:"traditionChinese"},
  ]
  
  const navArr = [
    {name:'profile', lang:_profileTab},
    {name:'inform', lang:_pushSetTab},
    {name:'setting', lang:_generalSetTab}    
  ]

  return (
    <MypageContext.Provider value={{LanguageList, countryArray, interestedList}}>
      <Container>
        <ProfileLayout>
          <ProfileInner>
            <TopMenuTitleBox>
              <TopMenuTitle>{loginOn ? _settingProfile : _generalSetTab}</TopMenuTitle>
            </TopMenuTitleBox>
            {
              loginOn ? 
              <TabMenuWrap>
                {
                  navArr.map((tab, i)=>(
                  <NavItem key={i} onClick={()=> goURL({pathname:`/mypage/${tab.name}`})} >
                    <TabSelect> {tab.lang} </TabSelect>
                  </NavItem>
                  ))
                }
              </TabMenuWrap>
              : null
            }
            {
              loginOn ? list.map(({id, title, contents}) => {
                if(tab === title) return <div key={id}>{contents}</div>
              })
              :
              <MypageGeneral />
            }
          </ProfileInner>
        </ProfileLayout>
      </Container>
      </MypageContext.Provider>
  );
};


  /* 프로필 디자인 컴포넌트 */

// 애니메이션 영역
//공통

// 프로필 레이아웃
const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ProfileLayout = styled.div`
  max-width: 600px;
  width: 100%;
  height: auto;
  min-height: 800px;
  overflow: hidden;
  background: ${(props) => props.theme.color.whiteColor};
`;
const ProfileInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 34px 20px 180px 20px;
  @media (max-width: 900px) {
    padding: 20px 6px 200px 6px;
  }
`;

// 탑 메뉴
const TopMenuTitleBox = styled.div`
  display: flex;
  width: 100%;
`;
const TopMenuTitle = styled.h2`
  padding: 4px 10px;
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.blackColor};
`;

const TabMenuWrap = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;
const TabSelect = styled.button`
  padding: 12px 28px;
  margin-top: 6px;
  width: 100%;
  white-space: nowrap;
  color: ${(props) => props.theme.color.softBlackColor};
  border-bottom: 3px solid ${(props) => props.theme.color.softGrayColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  transition: all 0.2s ease-out;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.orangeColor};
    border-bottom: 3px solid ${(props) => props.theme.color.softOrangeColor};
  }
`;

// NavLink 스타일 ****
const activeClassName = 'nav-item-active';
const NavItem = styled.span`
  display: flex;
  width: 100%;

  &.${activeClassName} {
    ${TabSelect} {
      color: ${(props) => props.theme.color.orangeColor};
      border-bottom: 3px solid ${(props) => props.theme.color.softOrangeColor};
      font-weight: ${(props) => props.theme.fontWeight.font700};
    }
  }
`;
export default Mypage;
