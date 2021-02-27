import React from 'react'
import styled from 'styled-components';
import Link from 'next/link';

// Hooks&&reducer import

export default function ContentsUserForm(props) {
  const {banner, comicCount, illustCount, intro, nickname, profile, screenId} = props.searchData

  return (
      <BodyLayout>
          <ContentInner banner={banner}>
            <GradientBox>
            <UserProfileWrap><UserProfile profile={profile}/></UserProfileWrap>
            <Link href={`/myboard/${screenId}/all`}>
            <NickAndIdWrap >
              <NickName>{nickname}</NickName>
              <IdNDateWrap>
              <UserId>{screenId}</UserId>
              </IdNDateWrap>
            </NickAndIdWrap>
            </Link>
            <UserIntroWrap>
                <UserIntro>{intro}</UserIntro>
            </UserIntroWrap>
            <Link href={`/myboard/${screenId}/all`}>
                <ContentsNumBox>
                <AllContentsBox>
                <ComicIconBox><ComicIcon/></ComicIconBox>
                <ContentsNum>{comicCount}</ContentsNum>
                </AllContentsBox>
                <IllustIconBox><IllustIcon/></IllustIconBox>
                <ContentsNum>{illustCount}</ContentsNum>
                </ContentsNumBox>
            </Link>
          </GradientBox>
          </ContentInner>
      </BodyLayout>
  )
}

// 전체 레이아웃
const BodyLayout = styled.div`
  display: flex;
  max-width:18em;
  width:100%;
  height:15em;
  border-radius:0.8em;
  background:${props => props.theme.color.whiteColor};
  overflow:hidden;
  box-shadow:${props => props.theme.boxshadow.nav};
  margin-right:1em;
  margin-bottom:1em;
  @media (max-width:420px){
    max-width:100%;
    margin-right:0;

  }
`;

const ContentInner = styled.div`
background:url(${props => props.banner? props.banner.thumbnail : null}) no-repeat center top / cover;
display:flex;
width:100%;
height:100%;
flex-direction:column;
align-items:center;
justify-content:center;
`;

// 그라디언트 적용 박스
const GradientBox = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:100%;
height:100%;
background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.2) 90%), linear-gradient(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.3) 70%),
linear-gradient(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.9) 100%);
padding:0.6em;
`;

// 유저 프로필 이미지
const UserProfileWrap = styled.div`
display:flex;
width:4em;
height:4em;
border:0.2em solid rgba(0,0,0,0.1);
border-radius:50%;
overflow:hidden;
margin-bottom:0.5em;
background:#fff;
`
const UserProfile = styled.svg`
background:url(${props => props?.profile && props.profile.thumbnail}) no-repeat center center / cover;
width:100%;
height:100%;
`

// 닉네임
const NickAndIdWrap = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:100%;
cursor:pointer;
`

const NickName = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.whiteColor};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  margin-bottom: 0.5em;
  line-height:1.3em;
  word-wrap:wrap;
  ${props => props.theme.textTwoLine};
  @media (max-width:900px){
  font-size: ${(props) => props.theme.fontSize.font14};
}
`

// 유저 아이디 & 가입일

const IdNDateWrap = styled.div`
display:flex;
width:100%;
justify-content:center;
flex-direction:row;
flex-wrap:wrap;
@media (max-width:420px){
  flex-direction:column;
  justify-content:center;
  align-items:center;
}
`
const UserId = styled.span`
  font-size:${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.whiteColor};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  line-height:0.7em;
@media (max-width:900px){
  font-size: ${(props) => props.theme.fontSize.font13};
}
@media (max-width:420px){
  margin-bottom:0.3em;
}
`
const IdNDateDummyWrap = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:1.2em;
height:100%;

`
const IdNDateDummy = styled.span`
display:inline-block;
width:0.2em;
height:0.2em;
border-radius:50%;
background:#999;
margin-top:0.2em;
@media (max-width:420px){
display:none;
}
`

const UserCreateDate = styled(UserId)`
  font-size:${(props) => props.theme.fontSize.font13};
white-space:nowrap;
`
// 자기소개
const UserIntroWrap = styled.div`
display:flex;
justify-content:center;
width:100%;
height:auto;
margin:0.6em 0;
`

const UserIntro = styled(UserId)`
line-height:1.3em;
font-weight: ${(props) => props.theme.fontWeight.font300};
${props => props.theme.textTwoLine};
padding:0 1.2em;
${props => props.theme.textTwoLine};
`
// 작품 수

const ContentsNumBox = styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:row;
width:100%;
height:auto;

`

const ContentsNum = styled(UserId)`
 font-weight: ${(props) => props.theme.fontWeight.font300};
`
const AllContentsBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-right:1.2em;
`

const IllustIconBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-right:0.4em;
border-radius: 0.2em;
background: ${props => (props.theme.color.darkGray)};
opacity:0.8;
`
const IllustIcon = styled.svg`
background:url('/static/illust_Icon.svg') no-repeat center center / contain;
width:1.6em;
height:1.6em;
`
const ComicIconBox = styled(IllustIconBox)`
background: ${props => (props.theme.color.darkOrange)};

`
const ComicIcon = styled(IllustIcon)`
background:url('/static/comic_Icon.svg') no-repeat center center / contain;
`