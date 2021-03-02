import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

//컴포넌트 import
import { LangCommon } from '@language/Lang.Common';
import { ReplyListContext } from './Viewer';

// hooks&reducer
import { useUrlMove } from '@hooks/useUrlMove';
import { LanguageContext, AlertContext } from '@store/App_Store';

const ReportsPopup = (props) => {
  const { alertState, alertBool } = useContext(AlertContext);
  const { toggle_Modal_MoreMenu } = useContext(ReplyListContext);
  const { langState } = useContext(LanguageContext);
  const [goURL] = useUrlMove();

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { closeBtn } = LangCommon;
  const _closeBtn = closeBtn[selectedLanguage] || closeBtn[defaultLanguage];

  const list = [
    {
      title: '스팸',
      desc: '상업성 및 반복적으로 게시되는 콘텐츠',
      value: 'spam',
    },
    {
      title: '음란물',
      desc: '민감한 부분의 노출 및 노골적인 성적 콘텐츠',
      value: 'obscene',
    },
    {
      title: '혐오유발',
      desc: '비위생적인 내용 혹은 생리적인 혐오',
      value: 'disgust',
    },
    {
      title: '폭력성',
      desc: '폭력을 조장하거나 반사회적인 내용',
      value: 'violence',
    },
    {
      title: '거짓정보',
      desc: '신체에 해가 될 수 있는 정보',
      value: 'untruth',
    },
    {
      title: '분쟁유발',
      desc: '분란을 야기할 수 있는 음해, 모욕, 정치, 사상 등의 내용을 내포하는 콘텐츠',
      value: 'dispute',
    },
    {
      title: '불법 콘텐츠',
      desc: '저작권을 준수하지 않은 콘텐츠',
      value: 'illegality',
    },
  ];

  const reportSub = (e) => {
    e.preventDefault();
    alertBool({ type: 'REPORT_SUBMIT', payload: true });
    props.closeModal();
    toggle_Modal_MoreMenu(false);
  };

  return (
    <ContentPopupInner>
      <SendForm action="" method="post" onSubmit={reportSub}>
        <BtnWrap onClick={(e) => e.stopPropagation()}>
          <ContentTitleBox>신고하기</ContentTitleBox>
          <PwChangeBtn>제출</PwChangeBtn>
        </BtnWrap>
        <ReportTabBox onClick={(e) => e.stopPropagation()}>
          {list.map((item, index) => (
            <ReportTab key={index}>
              <ReportTxtWrap>
                <ReportTxt>{item.title}</ReportTxt>
                <ReportScript>{item.desc}</ReportScript>
              </ReportTxtWrap>
              <ListTxtRadio name="report" value={item.value} defaultChecked={index === 0} />
              <ListRadioCustom />
            </ReportTab>
          ))}
            <ReportTab onClick={()=>goURL({pathname:"/report"})}>
              <ReportTxtWrap>
                <ReportTxt>내 저작물 침해</ReportTxt>
              </ReportTxtWrap>
            </ReportTab>
        </ReportTabBox>
      </SendForm>
      <PopupClose
        onClick={() => {
          props.closeModal();
        }}
      >
        {_closeBtn}
      </PopupClose>
    </ContentPopupInner>
  );
};

// 콘텐츠 작품 팝업 레이아웃

const PopupLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: inherit;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  @media (max-width: 900px) {
    top: 54px;
  }
`;
const PositionCenter = css`
  position: fixed;
  z-index: 100000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ContentPopupInner = styled.div`
  ${PositionCenter}
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  overflow: hidden;
  max-width:480px;
  width:100%;
  min-width: 360px;
  height: auto;
  border-radius: 12px;
  background: ${(props) => props.theme.color.backgroundColor};
  box-shadow: ${(props) => props.theme.boxshadow.popup};
`;


/* 유저 팝업 */
//헤더 탭
const ContentTitleBox = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0 15px 25px;
  width: 100%;
  margin-bottom: 3px;
  font-size: ${(props) => props.theme.fontWeight.font18};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.blackColor};
  background: ${(props) => props.theme.color.whiteColor};

  @media (max-width: 900px) {
    padding: 10px 0 10px 20px;
    margin-bottom: 3px;
  }
`;
const ReportTabBox = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`;

// 선택영역
const ListRadioCustom = styled.label`
  position: relative;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.color.hoverColor};
  margin-right: 16px;
  margin-left: 8px;
`;
const ListTxtRadio = styled.input.attrs({ type: 'radio' })`
  display: none;
  &:checked + ${ListRadioCustom} {
    border: 1px solid ${(props) => props.theme.color.orangeColor};

    &::before {
      content: '';
      position: absolute;
      top: 1px;
      left: 1px;
      display: inline-block;
      height: 14px;
      width: 14px;
      border-radius: 50%;
      background: ${(props) => props.theme.color.orangeColor};
    }
  }
`;

const ReportTab = styled.label.attrs({})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: ${(props) => props.theme.color.whiteColor};
  cursor: pointer;
  padding: 12px 0;
  margin-bottom: 4px;
  transition: all 0.2s ease;
  &:hover {
    background: ${(props) => props.theme.color.microOrangeColor};
  }
  @media (max-width: 900px) {
    padding: 8px 0;
  }
`;

const ReportTxtWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReportTxt = styled.span`
  font-size: ${(props) => props.theme.fontWeight.font14};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.blackColor};
  padding-left: 20px;
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font13};
  }
`;
const ReportScript = styled(ReportTxt)`
  color: ${(props) => props.theme.color.softBlackColor};
  margin-top: 5px;
  @media (max-width: 900px) {
    margin-top: 3px;
  }
`;

// 버튼
const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3px;
  background: ${(props) => props.theme.color.whiteColor};
`;
const PwChangeBtn = styled.button`
  width: auto;
  width: 88px;
  height: 34px;
  border-radius: 25px;
  margin: 8px 24px 12px 0;
  background: ${(props) => props.theme.color.softOrangeColor};
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.whiteColor};
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.color.orangeColor};
  }
`;
const PopupClose = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px 0;
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.softBlackColor};
  cursor: pointer;
  @media (max-width: 900px) {
    padding: 6px 0;
    font-size: ${(props) => props.theme.fontSize.font13};
  }
`;

const SendForm = styled.form``;

export default ReportsPopup;
