import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';

// import 컴포넌트

// hooks&reducer
import { useToggle } from '../Hook/useToggle';
import { useUrlMove } from '../Hook/useUrlMove';
import { LangCommon } from '../Languge/Lang.Common';
import { LanguageContext } from '../../Component/Store/App_Store';
import useAxiosFetch from '../Hook/useAxiosFetch';

// 아이콘 import
import Logo from '../../svg/Logo.svg';

const MyBoardFollowList = (props) => {
  const { languageState } = useContext(LanguageContext);
  const [goURL] = useUrlMove();
  const [_follow, toggleFollow] = useToggle();
  const [userData, setUserData] = useState();
//fetch
const [followListLoding, followListApi, followListError, followListFetch] = useAxiosFetch();

  const followSubmit = (e) => {
    e.preventDefault();
    followListFetch(
      `${process.env.REACT_APP_API_URL}/interaction/follow`,
      _follow ? 'post' : 'delete',
      { targetUserId: userData?._id },
      null,
      null
    )
  };

  useEffect(() => {
    props.type === 'follower' ? setUserData(props.data.userId) : setUserData(props.data.targetUserId)
  }, [props])

  useEffect(() => {
    toggleFollow(props.data.following);
  }, [])
  
  //언어 변수
  const { selectedLanguage, defaultLanguage } = languageState;
  const { followBtn, followingBtn } = LangCommon;
  const _followingBtn = followingBtn[selectedLanguage] || followingBtn[defaultLanguage],
        _followBtn = followBtn[selectedLanguage] || followBtn[defaultLanguage];
        return (
    <ContentInner>
      <UserIconNickBox onClick={()=>goURL(`/myboard/${userData?.screenId}/all`)}>
      <UserIconBox>
        <UserIcon profile={userData?.profile?.thumbnail} />
      </UserIconBox>
      <UserPfContentBox>
        <FollowUserNick>{userData?.nickname}</FollowUserNick>
        <FollowUserId>{userData?.screenId}</FollowUserId>
        <FollowUserTxt>{userData?.intro}</FollowUserTxt>
        </UserPfContentBox>
        </UserIconNickBox>
        
        {
          userData?.screenId !== localStorage.getItem('userid') ?
            <FollowBox>
          <form action="" method="post" onSubmit={followSubmit}>
            <FollowBtn onClick={()=>toggleFollow()} styling={_follow}>
            {_follow ? _followingBtn : _followBtn }
            </FollowBtn>
            </form>
          </FollowBox>
          :
          null
      }
    </ContentInner>
  );
};
const ContentInner = styled.div`
  display: flex;
  justify-content:space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${(props) => props.theme.color.hoverColor};
  cursor: pointer;
  transition: all 0.2s ease-out;
  &:hover {
    background: ${(props) => props.theme.color.softGrayColor};
  }
`;
const UserIconNickBox = styled.div`
display:flex;
min-width:0;

`

// 본문 - 유저 아이콘
const UserIconBox = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  width: 42px;
  height: 42px; 
  border-radius: 50%;
 overflow:hidden;
 border: 1px solid ${(props) => props.theme.color.hoverColor};
`;
const UserIcon = styled.span`
  background:url(${props => props.profile ? props.profile : Logo}) no-repeat center center / cover;
  width:100%;
  height:100%;
`;
// 본문 - 유저 프로필
const UserPfContentBox = styled.div`
  display:flex;
  flex-direction:column;
  min-width:0;
  margin-left: 12px;
`;
const FollowUserNick = styled.span`
  height: 19px;
  padding-right:15px;
  padding-top:2px;
  ${props => props.theme.textOneLine};
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
`;

const FollowUserId = styled(FollowUserNick)`
  padding-right:15px;
  ${props => props.theme.textOneLine};
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font300};
`;
const FollowUserTxt = styled.span`
 ${props => props.theme.textTwoLine};
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  margin-top: 4px;
  line-height: 20px;
`;
// 본문 - 팔로잉 버튼
const FollowBox = styled.div`
flex-shrink: 0;

`
const FollowBtn = styled.button`
  width: auto;
  height: 32px;
  border: 1px solid ${(props) => (props.styling ? props.theme.color.orangeColor : props.theme.color.blackColor)};
  border-radius: 25px;
  padding: 0 10px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  color: ${(props) => (props.styling ? props.theme.color.whiteColor : props.theme.color.blackColor)};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  background: ${(props) => props.styling && props.theme.color.orangeColor};
`;
export default MyBoardFollowList;
