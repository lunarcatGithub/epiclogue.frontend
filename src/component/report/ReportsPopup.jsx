import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ReportLanguage from './Report_Language';

//컴포넌트 import
// hooks&reducer
import { useUrlMove } from '@hooks/useUrlMove';
import { AlertContext } from '@store/App_Store';
import useAxiosFetch from '@hooks/useAxiosFetch';

const ReportsPopup = ({closeModal, reportType, reportUserId, boardUid}) => {
  console.log(reportUserId, boardUid)
  // fetch Data
  const [ , reportData, , reportFetch] = useAxiosFetch();

  const { alertPatch } = useContext(AlertContext);
  // const { toggle_Modal_MoreMenu } = useContext(ReplyListContext);
  const [goURL] = useUrlMove();

  // type
  const [currentReportType, setCurrentReportType] = useState();

  // 선택한 값
  const [selectValue, setSelectValue] = useState(0);

  // 언어 import
  const {
        _closeBtn,
        _infringementlReport,
        _doReport,
        _reportSubReport,
        // 신고 리스트
        reportList
        } = ReportLanguage();

    const reportSub = (e) => {
    e.preventDefault();
    
    
    alertPatch({ type: 'REPORT_SUBMIT', payload: true });
    // const URL = `${process.env.NEXT_PUBLIC_API_URL}/interaction/${type}`;
    let bodyData = {
      reportType:selectValue,
      suspectUserId:reportUserId,
      contentId:boardUid,
      contentType:currentReportType
    };

    if(reportType === 'Board'){
      console.log(bodyData)
      reportFetch(`${process.env.NEXT_PUBLIC_API_URL}/report`, 'post', bodyData, null);
    } else if(reportType === 'Fb' || reportType === 'popupFb'){
      return;
    } else {
      return;
    }

    closeModal();
    // toggle_Modal_MoreMenu(false);
  };

  useEffect(()=> {

    if(reportType === 'Board'){
      setCurrentReportType('Board');
    } else if(reportType === 'Fb' || reportType === 'popupFb'){
      setCurrentReportType('Feedback');
    } else {
      setCurrentReportType('Reply');
    }
    
  }, [reportType]);

  return (
    <ContentPopupInner>
      <SendForm action="" method="post" onSubmit={reportSub}>
        <BtnWrap onClick={(e) => e.stopPropagation()}>
          <ContentTitleBox>{_doReport}</ContentTitleBox>
          <PwChangeBtn>{_reportSubReport}</PwChangeBtn>
        </BtnWrap>
        <ReportTabBox onClick={(e) => e.stopPropagation()}>
          {
            reportList.map((item, index) => (
              <ReportTab key={item.id}>
                <ReportTxtWrap>
                  <ReportTxt>{item.title}</ReportTxt>
                  <ReportScript>{item.desc}</ReportScript>
                </ReportTxtWrap>
                <ListTxtRadio 
                name="report" 
                value={item.id} 
                defaultChecked={index === 0}
                onChange={e => setSelectValue(e.target.value)}
                />
                <ListRadioCustom />
              </ReportTab>
            ))
          }
          <ReportTab onClick={() => goURL({ pathname: '/report' })}>
            <ReportTxtWrap>
              <ReportTxt>{_infringementlReport}</ReportTxt>
            </ReportTxtWrap>
          </ReportTab>
        </ReportTabBox>
      </SendForm>
      <PopupClose
        onClick={() => {
          closeModal();
        }}
      >
        {_closeBtn}
      </PopupClose>
    </ContentPopupInner>
  );
};

// 콘텐츠 작품 팝업 레이아웃

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
  max-width: 480px;
  width: 100%;
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
