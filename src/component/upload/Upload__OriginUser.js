import React from 'react';
import styled from 'styled-components';

export default function OriginUserForm({ originData }) {
  return (
    <OriginUser>
      <OriginUserInner>
        <ProfileImgBox>
          <OriginUserProfile profile={originData?.writer?.profil?.thumbnail} />
        </ProfileImgBox>

        <OriginUserInfoWrap>
          <OriginUserBox>
            {/* 유저 닉네임 */}
            <OriginUserNick>{originData?.writer?.nickname}</OriginUserNick>
            {/* <UserCheckBox>
              <OriginUserCheck>원작자</OriginUserCheck>
            </UserCheckBox> */}
          </OriginUserBox>
          {/* constents title*/}
          <OriginUserId>{originData?.data?.boardTitle}</OriginUserId>
        </OriginUserInfoWrap>
      </OriginUserInner>
    </OriginUser>
  );
}

/* 원작자 정보 */

//레이아웃
const OriginUser = styled.div`
  width: 100%;
  height: auto;
  background: ${(props) => props.theme.color.whiteColor};
  margin-bottom: 3px;
`;
const OriginUserInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.7em 0.8em;
`;
// 유저 프로필 이미지
const ProfileImgBox = styled.div`
  display: flex;
  min-width: 42px;
  min-height: 42px;
  width: 42px;
  height: 42px;
  max-width: 42px;
  max-height: 42px;
  border-radius: 50%;
  margin: 4px 10px;
  overflow: hidden;
`;
const OriginUserProfile = styled.span`
  background: ${(props) => (props.profile ? `url(${props.profile}) no-repeat center center / cover` : `${props.theme.color.hoverColor}`)};
  width: 100%;
  height: 100%;
`;

// 유저 정보 레이아웃
const OriginUserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

// 유저 정보 닉네임 + 원작 정보

const OriginUserBox = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  user-select: none;
`;

const OriginUserNick = styled.span`
  /* padding-top: 2px; */
  height: 18px;
  padding-right: 4px;
  ${(props) => props.theme.textOneLine};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  line-height: 1.2em;
`;

const UserCheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: auto;
  height: auto;
  border-radius: 25px;
  padding: 3px 8px;
  margin-right: 12px;
  background: ${(props) => props.theme.color.orangeColor};
`;
const OriginUserCheck = styled.span`
  font-size: ${(props) => props.theme.fontSize.font13};
  color: ${(props) => props.theme.color.whiteColor};
  font-weight: ${(props) => props.theme.fontWeight.font500};
`;

// 유저 아이디
const OriginUserId = styled.span`
  ${(props) => props.theme.textTwoLine};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.darkGray};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  /* margin-top: 3px; */
  line-height: 1.4em;
  padding-right: 2.5em;
  user-select: none;
`;
