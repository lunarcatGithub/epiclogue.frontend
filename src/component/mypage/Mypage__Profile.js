import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

// 컴포넌트 import
import { useChange } from '@hooks/useChange';
import { useUrlMove } from '@hooks/useUrlMove';
import { LangMypageProfile } from '@language/Lang.Mypage';
import { LanguageContext, AlertContext } from '@store/App_Store';
import Modal from '@utils/Modal';
import ConfirmPopup from '@utils/ConfirmPopup';
import useAxiosFetch from '@hooks/useAxiosFetch';
import useFetchData from '@hooks/useFetchData';

// hooks&&reducer
import { useModal } from '@hooks/useModal';


const MypageProfile = () => {
  const { alertBool } = useContext(AlertContext);
  const { langState } = useContext(LanguageContext);

  const [goUrl] = useUrlMove();

  
  // toggle Nav
  const [idTab, toggleIdTab] = useState(0);
  const [nickTab, toggleNickTab] = useState(0);
  const [pwTab, togglePwTab] = useState(0);
  const [outTab, toggleOutTab] = useState(0);

  // set InitData and handle Data
  const [bannerURL, setBannerURL] = useState();
  const [profileURL, setProfileURL] = useState();

  const [inituserIntro, setUserIntro] = useState();
  const [userIntro, handleUserIntro] = useChange('');
  const [inituserNick, setUserNick] = useState();
  const [userNick, handleUserNick, ] = useChange('');

  const [initscreenId, setScreenId] = useState();
  const [screenId, handleScreenId, ] = useChange('');

  const [email, setEmail] = useState();

  // handle password
  const [userPw, handleUserPw] = useChange();
  const [userPwNew, handleuserPwNew] = useChange();
  const [userPwNewRe, handleUserPwNewRe] = useChange();

  // handle error
  const [validationError, setValidationError] = useState();
  const [pwNotMatch, setPwNotMatch] = useState();
  const [noPassword, setNoPassword] = useState();
  const [imgSize, setImgSize] = useState();

  // 일단 임시로 넣어둠
  const [userCountry, setUserCountry] = useState();

  // confirm popup
  const [state_Confirm, toggle_Modal_Confirm] = useModal();
  const [accessConfirm, setAccessConfirm] = useState(false);

// fetch useAxiosFetch
const [myProfileLoding, myProfileApi, myProfileError, myProfileFetch] = useAxiosFetch();
const [imageLoding, imageApi, imageError, imageFetch] = useFetchData();
const [pwLoding, pwApi, pwError, pwFetch] = useAxiosFetch();
const [leaveLoding, leaveApi, leaveError, leaveFetch] = useAxiosFetch();
const [initialLoding, initialApi, initialError, initialFetch] = useAxiosFetch();

  // 언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const {
    introPlaceHoder,
    errorintro,
    setChange,
    profileEmail,
    nickChange,
    idChange,
    pwChange,
    originPw,
    newPassword,
    confirmPw,
    widthDrawl,
    widthDrawlBtn,
    widthDrawlAlert,
    changeSmallBtn,
    changeNickError,
    changeIdError,
    alreadyId,
    originPwError,
    changePwError,
    valiPwError,
    sizeError,
  } = LangMypageProfile;

  const _introPlaceHoder = introPlaceHoder[selectedLanguage] || introPlaceHoder[defaultLanguage],
    _errorintro = errorintro[selectedLanguage] || errorintro[defaultLanguage],
    _setChange = setChange[selectedLanguage] || setChange[defaultLanguage],
    _profileEmail = profileEmail[selectedLanguage] || profileEmail[defaultLanguage],
    _nickChange = nickChange[selectedLanguage] || nickChange[defaultLanguage],
    _idChange = idChange[selectedLanguage] || idChange[defaultLanguage],
    _pwChange = pwChange[selectedLanguage] || pwChange[defaultLanguage],
    _originPw = originPw[selectedLanguage] || originPw[defaultLanguage],
    _newPassword = newPassword[selectedLanguage] || newPassword[defaultLanguage],
    _confirmPw = confirmPw[selectedLanguage] || confirmPw[defaultLanguage],
    _widthDrawl = widthDrawl[selectedLanguage] || widthDrawl[defaultLanguage],
    _widthDrawlBtn = widthDrawlBtn[selectedLanguage] || widthDrawlBtn[defaultLanguage],
    _widthDrawlAlert = widthDrawlAlert[selectedLanguage] || widthDrawlAlert[defaultLanguage],
    _changeSmallBtn = changeSmallBtn[selectedLanguage] || changeSmallBtn[defaultLanguage],
    _changeNickError = changeNickError[selectedLanguage] || changeNickError[defaultLanguage],
    _changeIdError = changeIdError[selectedLanguage] || changeIdError[defaultLanguage],
    _alreadyId = alreadyId[selectedLanguage] || alreadyId[defaultLanguage],
    _originPwError = originPwError[selectedLanguage] || originPwError[defaultLanguage],
    _changePwError = changePwError[selectedLanguage] || changePwError[defaultLanguage],
    _valiPwError = valiPwError[selectedLanguage] || valiPwError[defaultLanguage],
    _sizeError = sizeError[selectedLanguage] || sizeError[defaultLanguage];


  const validationIDandNick = (e) => {
    // 아이디 -> 띄워쓰기x, min2 max15, 영문만, 중복x, 첫글자 @
    // 닉네임 -> 띄워쓰기x, min2 max30
    const error = {};
    const checkLength = (value, min, max) => {
      return value.length < min || value.length > max;
    };

    //id
    if (screenId !== '') {
      if (
        // checkSpace(screenId) === true ||
        checkLength(screenId, 2, 15) === true
        // checkFrontAtandUs(screenId) === false
      ) {
        error.id = `아이디 에러`;
        setValidationError(_changeIdError);
      }
    }
    //nickname
    if (userNick === localStorage.getItem('userNick')) error.nickname = '닉네임 에러'
    if (userNick !== '') {
      if (
        checkLength(userNick, 2, 30) === true
        // checkSpace(userNick) === true
      ) {
        error.nickname = '닉네임 에러';
        setValidationError(_changeNickError);
      }
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkValidate = Object.keys(validationIDandNick());
    if (checkValidate.length > 0) return;

    if (checkValidate.length === 0) {
      let profileData = new FormData();
      profileData.append('profile', profileURL);
      profileData.append('banner', bannerURL);

      profileData.append('screenId', `${screenId ? screenId : ''}`);

      profileData.append('userNick', userNick.replace(/(\s*)/g, ''));
      profileData.append('userCountry', userCountry);
      profileData.append('userIntro', userIntro);

      myProfileFetch(`${process.env.API_URL}/user/editProfile`, 'post', null, profileData);
    }
  };

  useEffect(() => {
    if(myProfileApi?.result !== 'ok') return;
    localStorage.setItem('userNick', myProfileApi?.data.nickname);
    localStorage.setItem('userid', myProfileApi?.data.screenId);
    alertBool({ type: 'PROFILE_UPDATE', payload: true });
    toggleTab(0, 0, 0, 0);
    setUserNick(myProfileApi?.data.nickname);
    setScreenId(myProfileApi?.data.screenId);
  }, [myProfileApi?.result])

  const handleSubmitUserPw = (e) => {
    e.preventDefault();
    setValidationError('');
    setPwNotMatch('');
    setNoPassword('');
    pwFetch(`${process.env.API_URL}/user/changePass`, 'patch', { userPw, userPwNew, userPwNewRe }, null)
  };

  useEffect(() => {
    if(pwApi?.result === 'ok'){
      alertBool({ type: 'PASSWORD_UPDATE', payload: true });
    } else {
      if(pwError){
        if(pwError?.data.message === "비밀번호 규칙을 확인해주세요."){
        setValidationError(_changePwError);
      } else if(pwError?.data.message === "비밀번호과 재입력이 다릅니다."){
        setPwNotMatch(_valiPwError);
      } else{
        setNoPassword(_originPwError);
      }}
    }
  }, [pwApi, pwError])
  
  const sizeErrorAlert = (e) => {
    //handlePreview에서 검증
    let sumByte = e.target.files[0].size;
    if (sumByte > 10485760){
      setImgSize(_sizeError);
      return;
    }
  }

  const imageDataAppend = (e, type) => {
    //handlePreview에서 분류
    let profileData = new FormData();
    let imageUrl = window.URL.createObjectURL(e.target.files[0])
    type === 'banner' ? setBannerURL(imageUrl) : setProfileURL(imageUrl)
    profileData.append(type, e.target.files[0]);
    return profileData
  }

  const handlePreview = (e, type) => {
    sizeErrorAlert(e)
    const profileData = imageDataAppend(e, type);
    imageFetch(`${process.env.API_URL}/user/editProfile`, 'post', null, profileData, null);
  };

  const toggleTab = (id, nick, pw, out) => {
    // reset no send data
    toggleIdTab(id);
    toggleNickTab(nick);
    togglePwTab(pw);
    toggleOutTab(out);
    setValidationError();
  };

  // 탈퇴 유효성 검사
  const deleteConfirm = (e)=> {
    e.preventDefault();
    if(userPw){
      if (userPw.length > 7) {
      toggle_Modal_Confirm(true);
      }else {
        setValidationError(_changePwError);
      }
      }else {
        setValidationError(_changePwError);
    }
  }
  
  const deleteUser = () => {
      setValidationError('');
      leaveFetch(`${process.env.API_URL}/user`, 'delete', { userPw: userPw }, null)
  };

  useEffect(() => {
    if(leaveApi?.result === 'ok'){
      localStorage.removeItem('loginOn', false);
      localStorage.removeItem('userNick');
      localStorage.removeItem('userid');
      setAccessConfirm(false)
      goUrl('/login');  
    }

    if(leaveError?.status === 400){
      setValidationError(_originPwError);
    }
  }, [leaveApi, leaveError])
  
  // 삭제 확인 이후 실행
  useEffect(()=>{
    accessConfirm && deleteUser()
  },[accessConfirm])

  
  useEffect(() => {
    initialFetch(`${process.env.API_URL}/user/editProfile`, 'get', null, null)
  }, []);

  useEffect(() => {
  const profileData = initialApi?.data;
  setBannerURL(profileData?.banner?.origin);
  setProfileURL(profileData?.profile?.origin);
  setUserIntro(profileData?.intro);
  setUserNick(profileData?.nickname);
  setScreenId(profileData?.screenId);
  setUserCountry(profileData?.country);
  setEmail(profileData?.email);
  // alert(res.data.reason);
}, [initialApi]);

  return (
      <Container>
          <BannerAllContainer>
          <BannerImgSet id="bannerImg" onChange={(e)=>handlePreview(e, 'banner')} accept=".jpg, .jpeg, .png" />
            {/* banner Image */}
            <BannerImgSetBox>
              <BannerImgSetLabel styling={bannerURL} />
            </BannerImgSetBox>
            {/* max size */}
            <SizeErrorWrap><SIzeError>{imgSize && imgSize}</SIzeError></SizeErrorWrap>
             {/* profile Image */}
            <ProfileImgSet id="profileImg" onChange={(e)=>handlePreview(e, 'profile')} accept=".jpg, .jpeg, .png" />
            <ProfileImgSetBox>
              <ProfileImgSetLabel styling={profileURL} />
            </ProfileImgSetBox>
          </BannerAllContainer>
          
          <SendForm action="" method="post" onSubmit={handleSubmit} autoComplete="off">
          <InfoContent maxLength="300" name="userIntro" defaultValue={inituserIntro} onChange={handleUserIntro} placeholder={_introPlaceHoder} />
          {
          userIntro.length > 300 &&
            <ErrorTextWrap>
              <ErrorText>{_errorintro}</ErrorText>
            </ErrorTextWrap>
          }
          <BtnWrap>
            <ChangeBtn disabled={userIntro ? false : true}>{_setChange}</ChangeBtn>
          </BtnWrap>
        </SendForm>
        <ProfileWrap>
          <ContentsBox>
            {/* 이메일 */}
            <EmailInnerBox>
              <TitleWrap>
                <ContentsTitle>{_profileEmail}</ContentsTitle>
                <ContentsScript>{email}</ContentsScript>
              </TitleWrap>
            </EmailInnerBox>
            {/* // 이메일 끝 */}
          </ContentsBox>
          <ContentsBox>
            {/* 닉네임 변경 */}

            <IdContentInnerBox styling={nickTab}>
              <TitleWrap id="nickTab" onClick={() => toggleTab(0, 2, 0, 0)}>
                <ContentsTitle>{_nickChange}</ContentsTitle>
                <ContentsScript>{inituserNick}</ContentsScript>
              </TitleWrap>
              {nickTab === 2 ? (
                <HiddenBox>
                  <SendForm id="editNicknameForm" action="" method="post" onSubmit={handleSubmit} autoComplete="off">
                    <HiddenInput id="userNick" name="userNick" onChange={handleUserNick} />
                    <HiddenBtn disabled={userNick ? false : true}>{_changeSmallBtn}</HiddenBtn>
                  </SendForm>
                  {validationError && (
                    <ErrorTextWrap>
                      <ErrorText>{validationError}</ErrorText>
                    </ErrorTextWrap>
                  )}
                </HiddenBox>
              ) : null}
            </IdContentInnerBox>
            {/* // 닉네임 변경 끝 */}
          </ContentsBox>

          <ContentsBox>
            {/* 아이디 변경 */}

            <IdContentInnerBox styling={idTab}>
              <TitleWrap id="idTab" onClick={() => toggleTab(1, 0, 0, 0)}>
                <ContentsTitle>{_idChange}</ContentsTitle>
                <ContentsScript>{initscreenId}</ContentsScript>
              </TitleWrap>
              {idTab === 1 ? (
                <HiddenBox>
                  <SendForm id="editScreenIdForm" action="" method="post" onSubmit={handleSubmit} autoComplete="off">
                    <HiddenInput id="screenId" name="screenId" onChange={handleScreenId} />
                    <HiddenBtn disabled={screenId ? false : true}>{_changeSmallBtn}</HiddenBtn>
                  </SendForm>
                  {validationError && (
                    <ErrorTextWrap>
                      <ErrorText>{validationError}</ErrorText>
                    </ErrorTextWrap>
                  )}
                </HiddenBox>
              ) : null}
            </IdContentInnerBox>
            {/* // 아이디 변경 끝 */}
          </ContentsBox>

          <ContentsBox>
            {/* 비밀번호 변경 */}

            <PwContentInnerBox styling={pwTab}>
              <TitleWrap id="pwTab" onClick={() => toggleTab(0, 0, 3, 0)}>
                <ContentsTitle>{_pwChange}</ContentsTitle>
              </TitleWrap>
              {pwTab === 3 ? (
                <HiddenBox>
                  <SendForm id="changePassForm" action="" method="post" onSubmit={handleSubmitUserPw}>
                    <InputWrap>
                      <InputText htmlFor="userPw">{_originPw}</InputText>
                      <HiddenPwInput name="userPw" onChange={handleUserPw} />
                      {noPassword && <ErrorTextWrap><ErrorText>{noPassword}</ErrorText></ErrorTextWrap>}
                    </InputWrap>
                    <InputWrap>
                      <InputText htmlFor="userPwNew">{_newPassword}</InputText>
                      <HiddenPwInput name="userPwNew" onChange={handleuserPwNew} />
                      {validationError && <ErrorTextWrap><ErrorText>{validationError}</ErrorText></ErrorTextWrap>}
                    </InputWrap>
                    <InputWrap>
                      <InputText htmlFor="userPwNewRe">{_confirmPw}</InputText>
                      <HiddenPwInput name="userPwNewRe" onChange={handleUserPwNewRe} />
                    </InputWrap>
                    {pwNotMatch && <ErrorTextWrap><ErrorText>{pwNotMatch}</ErrorText></ErrorTextWrap>}
                    <BtnWrap>
                      {/* {validationError && (
                        <ErrorTextWrap>
                          <ErrorText>{validationError}</ErrorText>
                        </ErrorTextWrap>
                      )} */}

                      <ChangeBtn>{_setChange}</ChangeBtn>
                    </BtnWrap>
                  </SendForm>
                </HiddenBox>
              ) : null}
            </PwContentInnerBox>
          </ContentsBox>

          {/* // 비밀번호 변경 끝 */}

          <ContentsBox>
            {/* 회원탈퇴 */}
            <OutContentInnerBox styling={outTab}>
              <TitleWrap id="outTab" onClick={() => toggleTab(0, 0, 0, 4)}>
                <ContentsTitle>{_widthDrawl}</ContentsTitle>
              </TitleWrap>
              {outTab === 4 ? (
                <HiddenBox>
                  <SendForm action="" method="post">
                    <InputWrap>
                      <InputText htmlFor="userPw">{_confirmPw}</InputText>

                      <HiddenPwInput name="userPw" onChange={handleUserPw} />
                    </InputWrap>
                    <ErrorTextWrap>
                    <ErrorText>{_widthDrawlAlert}</ErrorText>
                    </ErrorTextWrap>
                    
                    <BtnWrap postion={validationError}>
                      {validationError && (
                        <ErrorTextWrap>
                          <ErrorText>{validationError}</ErrorText>
                        </ErrorTextWrap>
                      )}

                      <ChangeBtn styling={outTab} onClick={deleteConfirm}>
                        {_widthDrawlBtn}
                      </ChangeBtn>
                    </BtnWrap>
                  </SendForm>
                </HiddenBox>
              ) : null}
            </OutContentInnerBox>
          </ContentsBox>
          {/* // 회원탈퇴 끝 */}
        </ProfileWrap>
        {/* confirm popup */}
        {state_Confirm &&
        <Modal visible={state_Confirm} closable={true} maskClosable={true} onClose={() => toggle_Modal_Confirm(false)}>
          <ConfirmPopup handleModal={() => toggle_Modal_Confirm(false)} setAccessConfirm={setAccessConfirm} type={'INACTIVE'}/>
        </Modal>
          }
      </Container>
  );
};


  /* 프로필 디자인 컴포넌트 */

// 애니메이션 영역

//공통
const ErrorTextWrap = styled.div`
  margin-top: 8px;
`;
const ErrorText = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.pinkColor};
  line-height:19px;
`;

// 프로필 레이아웃
const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ContentsBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 16px;
`;

const EmailInnerBox = styled.div`
  position: relative;
  width: 100%;
  border: 2px solid ${(props) => (props.styling ? props.theme.color.softOrangeColor : props.theme.color.hoverColor)};
  border-radius: 4px;
  transition: all 0.2s ease;
  box-sizing: border-box;
`;
const IdContentInnerBox = styled(EmailInnerBox)`
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 27px;
    right: 20px;
    width: 7px;
    height: 7px;
    border-top: 2px solid ${(props) => (props.styling ? props.theme.color.orangeColor : props.theme.color.placeHolderColor)};
    border-right: 2px solid ${(props) => (props.styling ? props.theme.color.orangeColor : props.theme.color.placeHolderColor)};
    transform: rotate(${(props) => (props.styling ? `135deg` : `45deg`)});
    transition: all 0.2s ease;
  }
  &:focus {
    &::after {
      border-top: 2px solid ${(props) => props.theme.color.orangeColor};
      border-right: 2px solid ${(props) => props.theme.color.orangeColor};
      transform: rotate(135deg);
    }
  }
`;
const PwContentInnerBox = styled(IdContentInnerBox)`
  &::after {
    top: 18px;
  }
`;
const OutContentInnerBox = styled(IdContentInnerBox)`
  &::after {
    top: 18px;
  }
`;
const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const SendForm = styled.form``;

  /*배너 및 프로필 이미지 영역*/

const BannerAllContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 80px;
`;
const BannerImgSetBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.color.softGrayColor};
  width: 100%;
  height: 140px;
  overflow: hidden;
  cursor: pointer;
`;

const BannerImgSet = styled.input.attrs({
  type: 'file',
})`
  display: none;
`;
const BannerImgSetLabel = styled.label.attrs({
  htmlFor: 'bannerImg',
})`
  background: url(${(props) => props.styling}) no-repeat center center / cover;
  display: flex;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const SizeErrorWrap = styled.div`
position:relative;
display:flex;
justify-content:flex-end;
`
const SIzeError = styled.span`
position:absolute;
top:0.5em;
right:0;
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.pinkColor};

`
// 프로필 이미지

const ProfileImgSetBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 70px;
  left: 14px;
  width: 160px;
  height: 160px;
  border-radius: 50%;

  overflow: hidden;
  background: ${(props) => props.theme.color.softGrayColor};
  border: 6px solid ${(props) => props.theme.color.whiteColor};
  cursor: pointer;
`;
const ProfileImgSet = styled(BannerImgSet)``;

const ProfileImgSetLabel = styled.label.attrs({
  htmlFor: 'profileImg',
})`
  background: url(${(props) => props.styling}) no-repeat center center / cover;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ModifyBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.font13};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.orangeColor};
  cursor: pointer;
`;

// 자기소개 영역
const InfoContent = styled.textarea.attrs({})`
  width: 100%;
  min-height: 120px;
  height: auto;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 8px;
  resize: none;
  border: 2px solid ${(props) => props.theme.color.hoverColor};
  margin-top: 20px;
  &:focus {
    border: 2px solid ${(props) => props.theme.color.softOrangeColor};
  }
  &::placeholder {
    color: ${(props) => props.theme.color.softBlackColor};
    font-weight: ${(props) => props.theme.fontWeight.font300};
    font-size: ${(props) => props.theme.fontSize.font14};
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ErrorLayout = styled.div`
  display: flex;
`;

// 콘텐츠 내용
const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 15px 16px;
`;
const ContentsTitle = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.blackColor};
`;

const ContentsScript = styled.span`
  ${(props) => props.theme.textTwoLine};
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.softBlackColor};
  padding-right: 30px;
  margin-top: 4px;
  line-height: 17px;
  height: 19px;
  padding-top: 2px;
`;

// hidden contents 영역
const HiddenBox = styled.div`
  position: relative;
  width: 100%;
  padding: 0 16px 10px 16px;
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 3px;
`;
const InputText = styled.label`
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.darkGray};
  padding: 10px 0;
`;

const HiddenInput = styled.input.attrs({ type: 'text' })`
  width: 100%;
  padding: 10px 12px;
  background: ${(props) => props.theme.color.microOrangeColor};
`;
const HiddenPwInput = styled(HiddenInput).attrs({ type: 'password' })``;
const HiddenBtn = styled.button.attrs({
  type: 'submit',
})`
  position: absolute;
  top: 11px;
  right: 30px;
  font-size: ${(props) => props.theme.fontSize.font13};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => (props.disabled ? props.theme.color.softOrangeColor : props.theme.color.orangeColor)};
  cursor: ${(props) => (props.disabled ? 'defalut' : 'pointer')};
`;
const BtnWrap = styled.div`
  display: flex;
  justify-content: ${(props) => (props.postion ? 'space-between' : 'flex-end')};
`;
const ChangeBtn = styled.button.attrs({
  type: 'submit',
})`
  width: auto;
  padding: 6px 16px;
  border-radius: 25px;
  margin: 12px 8px 24px 0;
  background: ${(props) => (props.styling === 4 ? props.theme.color.softPinkColor : props.theme.color.softOrangeColor)};
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.whiteColor};
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background: ${(props) => (props.styling === 4 ? props.theme.color.pinkColor : props.theme.color.orangeColor)};
  }
`;
export default MypageProfile;
