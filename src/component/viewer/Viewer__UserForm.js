import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

// Hooks&&reducer
import { useToggle } from '@hooks/useToggle';
import { useUrlMove } from '@hooks/useUrlMove';
import { AppDataContext } from '@store/App_Store';
import { useConvertTags } from '@hooks/useConvertTags';
import { useTimeCalculation } from '@hooks/useTimeCalculation';
import useAxiosFetch from '@hooks/useAxiosFetch';
import useDebounce from '@hooks/useDebounce';

export default function ViewerUserForm(props) {
  const { type, externalSource, userLang, profile, userData, boardUid, followOnLang, followLang, removedContents, checkMoreMenuType } = props;

  const { loginOn, setUnAuth } = useContext(AppDataContext);

  //fetch
  const [followLoding, followApi, followError, followFetch] = useAxiosFetch();

  const [goURL] = useUrlMove();
  const [kindContent, setKindContent] = useState();
  const [screenId, setScreenId] = useState();
  const [originUserData, setOriginUserData] = useState();
  const [title, setTitle] = useState();
  const [user_id, setUser_id] = useState();

  // follow
  const [follow, toggleFollow] = useToggle();
  const [followMe, setFollowMe] = useState();
  const [indicateDate] = useTimeCalculation(userData?.writeDate);
  const [converted, convert] = useConvertTags();
  // debounce 처리
  const [followDebounce, getValue] = useDebounce();
  const changeHandler = () => {
    const localScreenId = localStorage.getItem('userid');

    switch (type) {
      case 'NOSECOND':
        setKindContent(<UserUploadInfoImg image={externalSource ? '/static/linkIcon.svg' : '/static/originWrite.svg'} />);
        setScreenId(userData?.writer?.screenId);
        setFollowMe(localScreenId !== userData?.screenId);
        toggleFollow(userData?.writer?.following);
        setTitle(userData?.boardTitle);
        convert(userData?.boardBody);
        setUser_id(userData?._id)
        break;

      case 'SECOND':
        setKindContent(<UserUploadInfoImg image={'/static/trans.svg'} />);
        setScreenId(userData?.writer?.screenId);
        setFollowMe(localScreenId !== userData?.screenId);
        toggleFollow(userData?.writer?.following);
        setTitle(userData?.boardTitle);
        convert(userData?.boardBody);
        setUser_id(userData?._id)

        break;

      case 'ORIGIN':
        setKindContent(<UserUploadInfoImg image={externalSource ? '/static/linkIcon.svg' : '/static/originWrite.svg'} />);
        setScreenId(userData?.originUserId?.screenId);
        setOriginUserData(userData?.originBoardId);
        setFollowMe(localScreenId !== userData?.originUserId?.screenId);
        toggleFollow(userData?.originUserId?.following);
        setTitle(userData?.originBoardId?.boardTitle);
        convert(userData?.originBoardId?.boardBody);
        setUser_id(userData?.originUserId?._id)

        break;
      default:
        break;
    }
  };
  const submitHandler = () => {
    if (!loginOn) return;
    const URL = `${process.env.API_URL}/interaction/follow`;
    followFetch(URL, followDebounce ? 'delete' : 'post', { targetUserId: user_id });
  };

  useEffect(() => {
    if (!loginOn) return;
    getValue(follow)
  }, [follow])

  useEffect(() => {
    changeHandler();
  }, [type, externalSource, userData]);

  return (
    <>
      <UserForm>
        <UserProfileWrap>
          {kindContent}
          {externalSource ? (
            <SourceLink href={`${externalSource}`} target="_blank">
              {externalSource}
            </SourceLink>
          ) : (
            <UserUploadInfo>{userLang}</UserUploadInfo>
          )}
        </UserProfileWrap>
        <ProfileImgContent>
          {/* 프로필 박스 */}
          <ProfileImgBox>
            <ProfileImg profile={profile} />
          </ProfileImgBox>
          {/* 유저 프로필 콘텐츠 박스 */}
          <UserProfileContentsBox>
            {/* 유저 아이디 등 프로필 */}
            <UserProfileInfo>
              {/* 유저 닉네임 팔로잉 */}
              <UserNickInfo onClick={() => goURL({ pathname: `/myboard/[id]?tab=all`, as: `/myboard/${screenId}` })}>
                {type === 'ORIGIN' ? userData?.originUserId?.nickname : userData?.nickname}
              </UserNickInfo>
              {
                followMe && loginOn && (
                    <UserFollowTxt
                      styling={follow}
                      onClick={()=>{
                        if (!loginOn) { setUnAuth(true); return; }
                            toggleFollow();
                            submitHandler();
                      }}
                    >{follow ? followOnLang : followLang}</UserFollowTxt>
                )
              }
            </UserProfileInfo>
            {/* 유저 아이디 */}
            <UserProfileId>
              <UserIdInfo onClick={() => goURL({ pathname: `/myboard/[id]?tab=all`, as: `/myboard/${screenId}` })}>{screenId}</UserIdInfo>
            </UserProfileId>
            {/* 메뉴 더보기 */}
            <FdMoreMenuAnchor onClick={checkMoreMenuType}>
              <MoreMenuDot />
            </FdMoreMenuAnchor>
            {/* 콘텐츠 */}
            <OriginalContent>{title}</OriginalContent>
            <TextContent>{converted}</TextContent>
            <BottomWrap>
              { type !== 'ORIGIN' && <PostedTime>Posted by {indicateDate}</PostedTime> }
              {userData?.edited && <ModifyText>{'_modified'}</ModifyText>}
            </BottomWrap>
            {originUserData && (
              <ContentImgWrap styling={originUserData}>
                {
                  originUserData ? (
                    <ContentImgBox onClick={() => goURL({ pathname: `/viewer/${originUserData._id}` })}>
                      <ContentImg thumNail={originUserData.boardImg[0]} />
                    </ContentImgBox>
                  ) : (
                    <ContentImgBox>
                      <NullContent>{removedContents}</NullContent>
                    </ContentImgBox>
                  )
                }
              </ContentImgWrap>
            )}
          </UserProfileContentsBox>
        </ProfileImgContent>
      </UserForm>
    </>
  );
}

//공통 스타일링
const FdMoreMenuAnchor = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 24px;
  right: 12px;
  ${(props) => props.theme.ImgButtonHover};
`;
const MoreMenuDot = styled.div`
  display: flex;
  ${(props) => props.theme.moreMenu};
`;

// 일반 스타일링
const UserForm = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 12px 6px;
  width: 100%;
  height: auto;
  /* max-height: 400px; */
  margin-bottom: 5px;
  background: ${(props) => props.theme.color.whiteColor};
`;
// 유저 헤더
const UserProfileWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 3px;
  user-select: none;
`;
const UserUploadInfoImg = styled.svg`
  background: url(${(props) => props.image}) no-repeat center center / contain;
  margin-left: 1.6em;
  width: 1.2em;
  height: 1.2em;
  min-width: 1.2em;
`;
const UserTransImg = styled(UserUploadInfoImg)`
  width: 1.1em;
  height: 1.1em;
`;

const UserUploadInfo = styled.span`
  margin-left: 3px;
  font-weight: ${(props) => props.theme.fontWeight.font100};
  font-size: ${(props) => props.theme.fontSize.font13};
  color: ${(props) => props.theme.color.softBlackColor};
  max-width: 25em;
`;
// 외부 출처가 있을 경우
const SourceLink = styled.a`
  margin-left: 0.6em;
  font-weight: ${(props) => props.theme.fontWeight.font100};
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.orangeColor};
  /* max-width:24em; */
  padding-right: 4em;
  line-height: 1.4em;
  ${(props) => props.theme.textTwoLine};
  cursor: pointer;
`;

// 유저 프로필 && 콘텐츠
const ProfileImgContent = styled.div`
  display: flex;
`;
// 유저 프로필 이미지
const ProfileImgBox = styled.div`
  display: flex;
  min-width: 42px;
  min-height: 42px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin: 4px 10px;
  overflow: hidden;
`;
const ProfileImg = styled.span`
  background: ${(props) => (props.profile ? `url(${props.profile}) no-repeat center center / cover` : `${props.theme.color.hoverColor}`)};
  width: 100%;
  height: 100%;
`;
// 유저 프로필 콘텐츠
const UserProfileContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  width: 100%;
`;

const UserProfileInfo = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
`;
const UserProfileId = styled.div`
  display: flex;
  align-items: center;
  min-height: 0;
`;

// 유저 닉네임
const UserNickInfo = styled.span`
  display: flex;
  word-break: break-all;
  line-height: 19px;
  ${(props) => props.theme.textTwoLine};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  margin-right: 0.6em;
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
  cursor: pointer;
`;
//

const UserFollowTxt = styled.button.attrs({
  type: 'submit',
})`
  white-space: nowrap;
  margin-right: 4em;;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  font-size: ${(props) => props.theme.fontSize.font15};
  color:${props => props.styling ? props.theme.color.orangeColor : props.theme.color.popupColor};
  transition: color .2s ease;
  cursor: pointer;
`;

// 유저 아이디
const UserIdInfo = styled.span`
  ${(props) => props.theme.textOneLine};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.darkGray};
  height: 18px;
  margin-right: 60px;

  cursor: pointer;
`;

const OriginalContent = styled.span`
  margin-top: 0.6em;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
`;
const PostedTime = styled.span`
  font-weight: ${(props) => props.theme.fontWeight.font100};
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.softBlackColor};
`;
const ContentImgWrap = styled.div`
  display: flex;
  width: 100%;
`;

const ContentImgBox = styled.div`
  display: flex;
  width: 100%;
  height: 140px;
  overflow: hidden;
  border-radius: 12px;
  margin: 0 26px 6px 0;
  border: 3px solid ${(props) => (props.styling ? props.theme.color.semiOrangeColor : props.theme.color.softGrayColor)};
  background: ${(props) => (props.styling ? '' : `${(props) => props.theme.color.hoverColor}`)};
  cursor: pointer;
`;

const ContentImg = styled.span`
  display: flex;
  background: url(${(props) => props.thumNail}) no-repeat center center / cover;
  width: 100%;
  height: 100%;
`;
const NullContent = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.color.hoverColor};
  width: 100%;
  height: 100%;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  font-size: ${(props) => props.theme.fontSize.font18};
  color: ${(props) => props.theme.color.darkGray};
`;

const TextContent = styled.span`
  padding-top: 0.5em;
  padding-right: 3em;
  @media (max-width: 900px) {
    padding-right: 2em;
  }
`;

// 수정 여부
const BottomWrap = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  flex-direction: row;
  margin: 0.8em 0 0.5em 0;
`;
const ModifyText = styled.span`
  margin-left: 8px;
  padding: 4px 8px;
  border-radius: 25px;
  background: ${(props) => props.theme.color.orangeColor};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  font-size: ${(props) => props.theme.fontSize.font13};
  color: ${(props) => props.theme.color.whiteColor};
`;
