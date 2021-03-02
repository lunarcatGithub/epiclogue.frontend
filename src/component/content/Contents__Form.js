import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

// 컴포넌트 import
import { LangMain } from '@language/Lang.Main';

// hooks&reducer
import { LanguageContext } from '@store/App_Store';

export default function MainContent(props){
  const { contentData } = props;
  const { category, originUserId } = contentData;
  const [contents, setContents] = useState();
  const { langState } = useContext(LanguageContext);

  //  props.contentData.board ==> myboard
  useEffect(() => {
      setContents(contentData.board ? contentData.board : contentData)
  }, [contentData]);

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { originTxt, reCreateTxt } = LangMain;
  const _originTxt = originTxt[selectedLanguage] || originTxt[defaultLanguage],
        _reCreateTxt = reCreateTxt[selectedLanguage] || reCreateTxt[defaultLanguage];
    
    return (
    <>
        <ContentBox>
        {/* 유저 콘텐츠 박스*/}
        <Link href={`/viewer/${contents?._id}`}>
            <ImgBox>
                <UserContentImg image={contents?.thumbnail} />
                <CategoryIconBox styling={category === '0' ? 'Illust' : 'Comic'}>
                <CategoryIcon icon={category === '0' ? '/illust_Icon.svg' : '/static/comic_Icon.svg'}/>
                </CategoryIconBox>
            </ImgBox>
        </Link>
        <ContentTxtBox>
        <Link href={`/viewer/${contents?._id}`}>
            <ContentTitle>{contents?.boardTitle}</ContentTitle>
        </Link>
            {/* 유저 정보 및 제목*/}
            <Link href={`/myboard/${contents?.writer?.screenId}/all`}>
                <UserBox>
                <UserPfImgBox><UserPfImg profile={contents?.writer?.profile?.thumbnail}/></UserPfImgBox>
                    <UserNick>{contents?.writer?.nickname}</UserNick>
                    <RecreateType>{originUserId ? _reCreateTxt : _originTxt}</RecreateType>
                    {/* // 유저 정보 및 제목 끝 */}
                </UserBox>
            </Link>
        </ContentTxtBox>
          {/* // 유저 콘텐츠 박스 끝 */}
        </ContentBox>
    </>
);
};

const ContentBox = styled.article`
  display:flex;
  flex-direction: column;
  width:100%;
  height:18em;
  margin-bottom: 1em;
  border-radius: 4px;

  @media (max-width: 480px) {
    /* margin: 4px 2px; */
    height: 17em;
  }
  @media (max-width: 380px) {
    margin: 0.4em 0.1em;
  }

`; 
// overflow 옵션이 사파리에서 이미지를 안나오게 함

const ImgBox = styled.div`
  position: relative;
  display: flex;
  justify-content:center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height:100%;
  margin-bottom: 2px;
  border-radius: 6px 6px 0 0;
  background: ${(props) => props.theme.color.whiteColor};
  cursor:pointer;
`;

const CategoryIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding:1px;
  border-radius: 4px;
  background: ${(props) => (props.styling === 'Illust' ? props.theme.color.darkGray : props.theme.color.darkOrange)};
  opacity: 0.8;
  user-select: none;
`;
const CategoryIcon = styled.span`
  background:url(${props => props.icon}) no-repeat center center / contain;
  width:1.8em;
  height:1.8em;
  z-index:999;
`;

const UserContentImg = styled.span`
  background:url(${props => props.image}) no-repeat center center / cover;
  width: 100%;
  height: 100%;
  user-select: none;
`;

const ContentTxtBox = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  flex-shrink:0;
  border-radius: 0 0 6px 6px;
  padding: 8px 8px;
  background: ${(props) => props.theme.color.whiteColor};
  @media (max-width: 900px) {
    padding: 8px 4px;
  }
`;
const ContentTitle = styled.h1`
  font-weight: ${(props) => props.theme.fontWeight.font700};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
  margin: 0 0.3em 0 0.5em;
  line-height: 1.4em;
  ${(props) => props.theme.textTwoLine};
  cursor: pointer;
  @media (max-width: 900px) {
    line-height: 17px;
    font-size: ${(props) => props.theme.fontSize.font13};
    padding: 0 4px;
    margin: 0 2px;
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  width:100%;
  min-width: 0;
  margin-top: 6px;
  padding: 0 8px;
  @media (max-width: 900px) {
    padding: 0 4px;
  }
`;
const UserPfImgBox = styled.div`
display:flex;
width:1.5em;
height:1.5em;
border-radius:50%;
overflow:hidden;
`

const UserPfImg = styled.span`
background:${props => props.profile ? `url(${props.profile}) no-repeat center center / cover` : `${props.theme.color.hoverColor}`};
width:100%;
height:100%;
`

const UserNick = styled.span`
  line-height: 1.1em;
  ${(props) => props.theme.textOneLine};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.darkGray};
  cursor: pointer;
  margin-left: 0.2em;
  @media (max-width: 900px) {
    
  }
`;

const RecreateType = styled.span`
  position: relative;
  flex-shrink: 0;
  font-weight: ${(props) => props.theme.fontWeight.font300};
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.softBlackColor};
  margin-left: 15px;
  margin-bottom:3px;
  white-space: nowrap;
  user-select: none;
  &::before {
    position: absolute;
    top: 6px;
    left: -10px;
    content: '';
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #2222;
    margin-left: 2px;
  }
`;
