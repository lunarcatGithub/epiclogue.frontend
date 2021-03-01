import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {useRouter} from 'next/router';

//component
import MobileHeader from '@component/header/Header__Mobile';
import Modal from '@utils/Modal';

// hooks && reduce
import useForm from '@hooks/useForm';
import {AppDataContext} from '@store/App_Store';

export default function Header() {
    const router = useRouter();

    const { 
      setSearchData, 
      setClickedComic, 
      setClickedIllust, 
      clickedComic, clickedIllust, 
      loginOn, 
      setUnAuth, 
      paramsData
    } = useContext(AppDataContext);

    const [category, setCategory] = useState();

    const [values, errors, submitting, handleChange, handleSubmit] = useForm({
      type:'search',
      initialValues: {search:''},
      onSubmit: ()=> searchSubmit()
    })

    const searchSubmit = () => {
      e.preventDefault();
      if(values === ' ' || values === undefined || values === null) return;
        setSearchData(searchBody);
        
        if(searchBody[0]?.match('@')){
          goURL({values:`/search/users/${values}`, state:{type:'users'}});
        }else {
          goURL({values:`/search/${paramsData === undefined ? 'latest' : paramsData}/${searchBody}`, state:{type:'latest'}});
        }
    }

    // 헤더 코믹/일러스트 필터링
    const selectFilter = (type) => {
      if(type === 'comic'){
        setClickedComic(!clickedComic);
        if (!clickedComic || !clickedIllust) {
          setClickedComic(true);
          setClickedIllust(true);
        }
      } else {
        setClickedIllust(!clickedIllust);
        if (!clickedComic || !clickedIllust) {
          setClickedComic(true);
          setClickedIllust(true);
        }
      }
    };


    return (
      <>
        <MainHeader>
        <HeaderOutter>
        <HeaderInner>
            <Link href="/main">
                <LogoWrap>
                    <LogoImg />
                </LogoWrap>
            </Link>
            {/* form box 스타일링*/}
            <FormBox autoComplete="off" onSubmit={searchSubmit}>
              <SearchWrap>
                {/* 검색 input 영역 */}
                <SerchBar 
                name='search' 
                value={values.search} 
                onChange={handleChange} 
                placeholder={'_searchPlaceholder'} />
                <SearchSubmitBtn/>
              </SearchWrap>
            </FormBox>
            {/* 코믹 / 일러스트 토글 버튼 */}
            <CategoryWrap onClick={() => setCategory(!category)} >
              <CategoryButton/>
            </CategoryWrap>
            <Dummy />
            
            {/* 팔로우 작품 및 프로필 버튼 영역 */}
            <>
              <ProfileWrap>
                <FollowBtn >
                  <ProfileFollow />
                  <FollowTxt>{'Follow'}</FollowTxt>
                </FollowBtn>
              {/* </NavItem> */}
              <HeaderPfPopupWrap>
                {/* header profile */}
              {/* <HeaderPfPopup /> */}
              </HeaderPfPopupWrap>
            </ProfileWrap>
            <Dummy />
            {/* 옵션 set 영역 */}
            <OptionWrap>
            <OptionBtn >
                <OptionDm />
            </OptionBtn>
              {/* 알림 */}
            <OptionBtn>
                <OptionInfomation />
            </OptionBtn>
              {/* setting */}
            <Link
                href={`/mypage/profile`} 
                isActive={() => ['/mypage/profile', '/mypage/inform', '/mypage/setting'].includes(pathname)}>
              <OptionBtn>
                <OptionSetting />
              </OptionBtn>
            </Link>
            </OptionWrap>
            </>
            {/* <HeaderUnauth/> */}
            
        </HeaderInner>
        {/* 뷰어 모바일 전용 뒤로가기 헤더 탭*/}
            <MbHeaderInner >
              <MbHeader>
                <BackIcon />
              </MbHeader>
            </MbHeaderInner>
        </HeaderOutter>
        {/*모바일 영역*/}
          <MobileHeader/>
        {/* // 모바일 영역 끝 */}
    </MainHeader>
    {
      category &&
          <CategoryBox>
            <CategoryHeader>
              <HeaderTxt>Filter</HeaderTxt>
              <ClosedBtn onClick={() => setCategory(!category)} />
            </CategoryHeader>
            <CategoryInner>
              <MbCategoryComic styling={clickedComic} onClick={() => selectFilter('comic')}>
                Comic
              </MbCategoryComic>
              <MbCategoryIllust styling={clickedIllust} onClick={() => selectFilter('illust')}>
                Illust
              </MbCategoryIllust>
            </CategoryInner>
          </CategoryBox>
      }
      </>
    )
}

/* 컴포넌트 스타일링 */
// 공통


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
  display:flex;
  width: 100%;
  height: 4em;
`;

const HeaderOutter = styled.div`
  display:flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.5em;
  background: ${(props) => props.theme.color.whiteColor};
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  transition: all 0.2s 0.3s ease-in-out;
  z-index: 999;
  @media (max-width: 900px) {
    display:${props => props.pathname};
    top: ${(props) => (props.show ? 0 : -60)}px;
  }`;
  
const HeaderInner = styled.div`
  display:flex;
  width: 100%;
  height: 100%;
  align-items: center;
  @media (max-width: 900px) {
    display:${props => props.pathname};
  }
`;

// 로고 부문
const LogoWrap = styled.div`
  margin: 0 0.6em;
  @media (max-width: 900px) {
    margin: 0 0.3em;
  }
`;

const LogoImg = styled.svg`
  background: url('/static/Logo.svg') no-repeat center center / contain;
  display: block;
  width: 44px;
  height: 36px;
  user-select: none;
`;

// 검색부문
const FormBox = styled.form.attrs({
})`
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
const SearchSubmitBtn = styled.button.attrs({
  type: 'submit',
})`
  position: absolute;
  top: 0.6em;
  right: 1.3em;
  width: 1.9em;
  height: 1.9em;
  background: url('/static/Src.svg') no-repeat center center / cover;
  cursor: pointer;
`;

// 카테고리 버튼 분류 버튼
const CategoryWrap = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  padding: 0.8em;
  /* margin-left: 0.3em; */
  margin: 0 0.1em 0 0.8em;
  border-radius:50%;
  cursor:pointer;

  &:hover{
    background:${props => props.theme.color.hoverColor};
  }
  @media (max-width:900px){
    display: none;
  }
`
const CategoryButton = styled.button`
background: url('/static/filter.svg') no-repeat center center / contain;
width: 2em;
height: 2em;
cursor:pointer;
`
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
  background: url('/static/follow.svg') no-repeat center center / contain;
  width: 2em;
  height: 2em;
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
  max-width:12em;
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
  background: url('/static/dm.svg') no-repeat center center / contain;
  width: 2em;
  height: 2em;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const OptionInfomation = styled(OptionDm)`
  background: url('/static/inform.svg') no-repeat center center / contain;
  width: 1.9em;
  height: 1.9em;
`;
const OptionSetting = styled(OptionDm)`
  background: url('/static/set.svg') no-repeat center center / contain;
  
`;

// 알림오면 푸른 벨
const InformIconRing = styled.span`
position:absolute;
bottom:-1px;
left:50%;
transform:translateX(-50%);
width:8px;
height:8px;
border-radius:50%;
background:${props => props.theme.color.skyColor};
`
// 모바일 뷰어 헤더
const MbHeaderInner = styled.div`
  display:none;
  @media (max-width: 900px) {
  display:${props => props.pathname};
  width:100%;
  height:100%;
  padding:0.5em 1em;
  }
`
const MbHeader = styled.div`
display:flex;
justify-content:flex-start;
width:100%;
height:100%;
`
const BackIcon = styled.span`
  display: flex;
  justify-content:center;
  align-items:center;
  padding:1em;
  border-radius: 50%;
  &::after {
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    border-top: 0.2em solid ${props => props.theme.color.popupColor};
    border-right: 0.2em solid ${props => props.theme.color.popupColor};;
    transform: rotate(-135deg);
  }
`

// 피드백 버튼
const AdminFeedbackBtn = styled.div`
  position: fixed;
  bottom: 11em;
  right: 5.2em;
  display: ${props => props.pathname};
  justify-content: center;
  align-items: center;
  border-radius: 2em;
  padding:0.8em 1.2em;
  background: ${(props) => props.theme.color.skyColor};
  box-shadow: ${(props) => props.theme.boxshadow.popup};
  cursor: pointer;
  user-select: none;
  z-index:9999;
  @media (max-width: 900px) {
    display:none;
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

// 카테고리 영역
const CategoryBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top:3.8em;
  right: 20em;
  width: 28em;
  border-radius:0.4em;
  overflow: hidden;
  z-index: 99999;
  background: ${(props) => props.theme.color.backgroundColor};
  box-shadow:${(props) => props.theme.boxshadow.popup3};
@media(max-width:900px){
  top:initial;
  bottom: 0;
  left: 0;
  right:initial;
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
  @media (max-width:900px){
    font-size: ${(props) => props.theme.fontSize.font15};
  }
`;


const MbCategoryComic = styled.button`
  display: flex;
  justify-content: center;
  line-height: 38px;
  padding: 0 5px;
  width: 100%;
  min-width: 128px;
  height: 42px;
  border-radius: 25px;
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  cursor: pointer;
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
const ClosedBtn = styled.button.attrs({ type: 'button' })`
    position: absolute;
    top: 0.5em;
    right: 1.1em;
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    &::before {
    content: '';
    background: url() no-repeat center / cover;
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
