import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

// 컴포넌트 import
import { LangConfirm } from '@language/Lang.Confirm';
import { useUrlMove } from '@hooks/useUrlMove';
import { signUpError } from '@language/Lang.Login';

// hooks & reducer
import { LanguageContext, AlertContext } from '@store/App_Store';
import { useChange } from '@hooks/useChange';
import useAxiosFetch from '@hooks/useAxiosFetch';

export default function ConfirmPopup({ handleModal, setAccessConfirm, type }) {
  const { alertPatch } = useContext(AlertContext);
  const router = useRouter();

  const { langState } = useContext(LanguageContext);
  const [goURL] = useUrlMove();

  // 유저 정보
  const { email, token } = router.query;
  const [userPwNew, handleuserPwNew] = useChange();
  const [userPwNewRe, handleUserPwNewRe] = useChange();

  // 유효성
  const [valiPw, setValiPw] = useState('');
  const [valiRePw, setValiRePw] = useState('');

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;

  const {
    inactTopTitle,
    deleteTitle,
    deleteCommanTitle,
    pwChangeTitle,
    nonPubTitle,
    deletedOriginTitle,
    deleteContents,
    deleteCommanContents,
    inactiveUser,
    pwChangeTop,
    nonPubTop,
    removedTop,
    noneSecondTop,
    noneSecondTitle,
    removedUser,
    inactiveDesc,
    confirmDeleteBtn,
    confirmInactiveBtn,
    newPwChange,
    newPwConfirm,
    pwChangeBtn,
    confirmTxt,
    goBackBtn,
    cancleBtn,
  } = LangConfirm;
  const { pwError, rePwError } = signUpError;
  const _inactTopTitle = inactTopTitle[selectedLanguage] || inactTopTitle[defaultLanguage],
    _deleteTitle = deleteTitle[selectedLanguage] || deleteTitle[defaultLanguage],
    _deleteCommanTitle = deleteCommanTitle[selectedLanguage] || deleteCommanTitle[defaultLanguage],
    _pwChangeTitle = pwChangeTitle[selectedLanguage] || pwChangeTitle[defaultLanguage],
    _nonPubTitle = nonPubTitle[selectedLanguage] || nonPubTitle[defaultLanguage],
    _deletedOriginTitle = deletedOriginTitle[selectedLanguage] || deletedOriginTitle[defaultLanguage],
    _deleteContents = deleteContents[selectedLanguage] || deleteContents[defaultLanguage],
    _deleteCommanContents = deleteCommanContents[selectedLanguage] || deleteCommanContents[defaultLanguage],
    _inactiveUser = inactiveUser[selectedLanguage] || inactiveUser[defaultLanguage],
    _pwChangeTop = pwChangeTop[selectedLanguage] || pwChangeTop[defaultLanguage],
    _nonPubTop = nonPubTop[selectedLanguage] || nonPubTop[defaultLanguage],
    _removedTop = removedTop[selectedLanguage] || nonPubTop[defaultLanguage],
    _noneSecondTop = noneSecondTop[selectedLanguage] || noneSecondTop[defaultLanguage],
    _noneSecondTitle = noneSecondTitle[selectedLanguage] || noneSecondTitle[defaultLanguage],
    _removedUser = removedUser[selectedLanguage] || removedUser[defaultLanguage],
    _inactiveDesc = inactiveDesc[selectedLanguage] || inactiveDesc[defaultLanguage],
    _confirmDeleteBtn = confirmDeleteBtn[selectedLanguage] || confirmDeleteBtn[defaultLanguage],
    _confirmInactiveBtn = confirmInactiveBtn[selectedLanguage] || confirmInactiveBtn[defaultLanguage],
    _newPwChange = newPwChange[selectedLanguage] || newPwChange[defaultLanguage],
    _newPwConfirm = newPwConfirm[selectedLanguage] || newPwConfirm[defaultLanguage],
    _pwChangeBtn = pwChangeBtn[selectedLanguage] || pwChangeBtn[defaultLanguage],
    _confirmTxt = confirmTxt[selectedLanguage] || confirmTxt[defaultLanguage],
    _goBackBtn = goBackBtn[selectedLanguage] || goBackBtn[defaultLanguage],
    _cancleBtn = cancleBtn[selectedLanguage] || cancleBtn[defaultLanguage],
    _pwError = pwError[selectedLanguage] || pwError[defaultLanguage],
    _rePwError = rePwError[selectedLanguage] || rePwError[defaultLanguage];

  const [topTitle, setTopTitle] = useState();
  const [title, setTitle] = useState();
  const [descript, setDescript] = useState();
  const [confirmBtn, setConfirmBtn] = useState();
  // fetch
  const [, pwConfirmApi, , pwConfirmFetch] = useAxiosFetch();

  const changePopup = () => {
    // 차후 인증 메일 재발송 팝업, 삭제된 게시물 팝업, 존재하지 않는 회원 팝업 추가하기
    switch (type) {
      // 게시글 삭제 여부
      case 'CONFIRM':
        setTopTitle(_deleteTitle);
        setTitle(_deleteContents);
        setDescript(null);
        setConfirmBtn(_confirmDeleteBtn);
        break;
      // 댓글 삭제 여부
      case 'COMMANT':
        setTopTitle(_deleteCommanTitle);
        setTitle(_deleteCommanContents);
        setDescript(null);
        setConfirmBtn(_confirmDeleteBtn);
        break;
      // 계정 잃어버렸을 때
      case 'PWCHANGE':
        setTopTitle(_pwChangeTitle);
        setTitle(_pwChangeTop);
        setDescript(null);
        setConfirmBtn(_pwChangeBtn);
        break;
      // 계정 비활성화 여부
      case 'INACTIVE':
        setTopTitle(_inactTopTitle);
        setTitle(_inactiveUser);
        setDescript(_inactiveDesc);
        setConfirmBtn(_confirmInactiveBtn);
        break;
      // 작품 비공개 상태
      case 'GOBACK':
        setTopTitle(_nonPubTitle);
        setTitle(_nonPubTop);
        setDescript(null);
        setConfirmBtn(_goBackBtn);
        break;
      // 삭제된 게시물
      case 'REMOVE':
        setTopTitle('😯 Not Found');
        setTitle(_removedTop);
        setDescript(null);
        setConfirmBtn(_goBackBtn);
        break;
      // 탈퇴한 회원
      case 'REMOVE_USER':
        setTopTitle('🚫 User Not Found');
        setTitle(`${_removedUser}`);
        setDescript(null);
        setConfirmBtn(_goBackBtn);
        break;
      // 2차 창작 비허용
      case 'TRANS':
        setTopTitle(`🚫 ${_noneSecondTop}`);
        setTitle(_noneSecondTitle);
        setDescript(null);
        setConfirmBtn(_confirmTxt);
        break;
      case 'REMOVEORIGIN':
        setTopTitle(`🚫 ${_deletedOriginTitle}`);
        setTitle(_noneSecondTitle);
        setDescript(null);
        setConfirmBtn(_confirmTxt);
        break;

      default:
        break;
    }
  };
  const passwordChange = () => {
    let pattern1 = /[0-9]/; // 숫자
    let pattern2 = /[a-zA-Z]/; // 영문
    let pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    setValiPw('');
    setValiRePw('');
    if (!pattern1.test(userPwNew) || !pattern2.test(userPwNew) || !pattern3.test(userPwNew) || userPwNew.length < 8) {
      setValiPw(_pwError);
      return;
    } else if (userPwNew !== userPwNewRe) {
      setValiRePw(_rePwError);
      return;
    }

    pwConfirmFetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/findPass`, 'patch', { userPwNew, userPwNewRe, email, token }, null, null);
  };

  useEffect(() => {
    if (!pwConfirmApi) return;
    alertPatch({ type: 'SUCCESS_PWCHANGE', payload: true });
    goURL({ pathname: '/login' });
  }, [pwConfirmApi]);

  useEffect(() => {
    changePopup();
  }, []);

  return (
    <>
      <ConfirmInner>
        <TitleTab>{topTitle}</TitleTab>
        <TabBox>
          <TabBoxInner>
            {/* 팝업 타이틀 및 내용 */}
            <ContentsTitle>{title}</ContentsTitle>
            <ContentsDesc>
              <form action="" mehod="post" onSubmit={passwordChange}>
                {descript}
                {/* 비밀번호 변경 시 */}
                {
                  type === 'PWCHANGE' && (
                    <>
                      <PasswordInput placeholder={_newPwChange} onChange={handleuserPwNew} />
                      {valiPw && <PlaceHolderTxt>{valiPw}</PlaceHolderTxt>}
                      <PasswordInput placeholder={_newPwConfirm} onChange={handleUserPwNewRe} />
                      {valiRePw && <PlaceHolderTxt>{valiRePw}</PlaceHolderTxt>}
                    </> )
                }
              </form>
            </ContentsDesc>
            <ButtonWrap>
              {/* 비밀번호 변경, 비공개 작품, 삭제된 작품, 탈퇴유저, 2차 창작 금지, 원작글 삭제가 아닐 경우 [취소] 버튼 나타남 */}
              {
                type !== 'PWCHANGE' && type !== 'GOBACK' && type !== 'REMOVE' && type !== 'REMOVE_USER' && type !== 'TRANS' && type !== 'REMOVEORIGIN' && (
                  <CancelBtn
                    onClick={() => {
                      handleModal();
                    }}
                  >
                    {_cancleBtn}
                  </CancelBtn> )
              }
              {/*  비공개 작품, 삭제된 작품, 탈퇴유저일 경우 [메인으로 가기] 버튼이 됨 */}
              {
                type === 'GOBACK' || type === 'REMOVE' || type === 'REMOVE_USER' ? (
                  <ConfirmBtn
                    onClick={() => {
                      setAccessConfirm({ pathname: '/' });
                    }}
                  >
                    {confirmBtn}
                  </ConfirmBtn>
                ) : null
              }
              {
                type === 'INACTIVE' || type === 'COMMANT' || type === 'CONFIRM' ? (
                  <ConfirmBtn
                    onClick={() => {
                      handleModal();
                      setAccessConfirm(true);
                    }}
                  >
                    {/*  확인 버튼으로 클릭시 true 값 반환 */}
                    {confirmBtn}
                    {/* 비밀번호 변경시 나타나는 버튼 */}
                  </ConfirmBtn>
                ) : null
              }
              {/* 의미 없이 팝업만 닫을 때 사용 */}
              {
                type === 'TRANS' || type === 'REMOVEORIGIN' ? 
                  <ConfirmBtn
                    onClick={() => {
                      handleModal();
                    }}
                  >
                    {confirmBtn}
                  </ConfirmBtn>
                : null
              }
              {/* 비밀번호 변경시 나타나는 버튼 */}
              {
                type === 'PWCHANGE' ? (
                  <ConfirmBtn
                    onClick={() => {
                      passwordChange();
                    }}
                  >
                    {confirmBtn}
                  </ConfirmBtn>
                ) : null
              }
            </ButtonWrap>
          </TabBoxInner>
        </TabBox>
      </ConfirmInner>
    </>
  );
}

const PositionCenter = css`
  position: fixed;
  z-index: 100000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ConfirmInner = styled.div`
  ${PositionCenter};
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  overflow: hidden;
  width: 420px;
  height: auto;
  border-radius: 12px;
  background: ${(props) => props.theme.color.backgroundColor};
  box-shadow: ${(props) => props.theme.boxshadow.popup};
  @media (max-width: 900px) {
    width: 360px;
  }
`;

//유저 헤더 탭
const TitleTab = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1.5em;
  width: 100%;
  height: 42px;
  margin-bottom: 3px;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.blackColor};
  background: ${(props) => props.theme.color.whiteColor};
  font-size: ${(props) => props.theme.fontSize.font18};
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font15};
    padding-left: 0.8em;
  }
`;
const TabBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const TabBoxInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.4em 2em;
  background: ${(props) => props.theme.color.whiteColor};
`;

const ContentsTitle = styled.span`
  font-size: ${(props) => props.theme.fontSize.font18};
  color: ${(props) => props.theme.color.blackColor};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  line-height: 1.5em;
  /* padding:0.1em 0; */
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font15};
    font-weight: ${(props) => props.theme.fontWeight.font500};
  }
`;

const ContentsDesc = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  padding: 1em 0;
  line-height: 1.5em;

  @media (max-width: 900px) {
    font-weight: ${(props) => props.theme.fontWeight.font300};
  }
`;
// 비밀번호 입력창
const PasswordInput = styled.input.attrs({ type: 'password' })`
  width: 100%;
  padding: 1em;
  background: ${(props) => props.theme.color.backgroundColor};
  border-radius: 0.5em;
  margin-bottom: 0.8em;
  &::placeholder {
    color: ${(props) => props.theme.color.placeholder};
    font-size: ${(props) => props.theme.fontSize.font15};
  }
`;
const PlaceHolderTxt = styled.div`
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.pinkColor};
  font-size: ${(props) => props.theme.fontSize.font14};
  margin-bottom: 0.3em;
`;
// 확인 취소 버튼
const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0.5em 0;
`;
const ConfirmBtn = styled.button`
  padding: 0.5em 0.9em;
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.whiteColor};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  background: ${(props) => props.theme.color.pinkColor};
  border-radius: 0.5em;
  margin-left: 2em;
  cursor: pointer;
`;

const CancelBtn = styled(ConfirmBtn)`
  background: ${(props) => props.theme.color.blackOpacity};
`;
