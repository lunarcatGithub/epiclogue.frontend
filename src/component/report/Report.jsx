import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// 컴포넌트 import
import ReportLanguage from './Report_Language';

// hooks&reducer
import useAxiosFetch from '@hooks/useAxiosFetch';

const Report = () => {
  const router = useRouter();

  // fetch Data
  const [ , reportData, , reportFetch] = useAxiosFetch();
  const { targetUserId, contentId, contentType } = router?.query;

  // 언어 import
  const { 
        _privateAgree,
        _swearAgree,
        _privateAlert,
        _swearAlert,
        _copyrightReportTitle,
        _remindCopyright,
        _reporterInfo,
        _infringedConfirm,
        _filloutContents,
        _proofOrigin,
        _violationsDeal,
        _processDesc,
        _agreeAbove,
        _signatureFill,
        _beforeSubmit,
        copyRightinformArr,
        agreeList,
        _reportSubReport,
      } = ReportLanguage();

  const [userData, setUserData] = useState({
    name: '',
    company: '',
    contact: '',
    email: '',
    country: '',
  });

  //침해받은 저작물
  const [linkData, setLinkData] = useState([]);

  const [infringement, setInfringement] = useState();
  const [originForm, setOriginForm] = useState([
    {id:0, title:''}, {id:1, title:''}, {id:2, title:''}
  ]);
  const [descript, setDescript] = useState('');
  const [agreeCheck, setAgreeCheck] = useState(agreeList);
  const [signitrue, setSignitrue] = useState('');


  const handleChangeValue = (e, type) => {
    const { value } = e.target;
    if (type === 'checkBox') {
      let selectArr = agreeList;
      selectArr.forEach((list) => {

        if (list.id === e.target.id) {
          console.log(e.target.id === list.id)
          list.isChecked = e.target.checked;
        } else {
          list.isChecked = e.target.checked;
        }
      } );
      setAgreeCheck(selectArr);

    } else {
      setUserData({ ...userData, [type]: value });
    }
  };

  const reportSubmit = (e) => {
    e.preventDefault();

    if (agreeCheck[0].isChecked === false) {
      alert(_privateAlert);
    } else if (agreeCheck[1].isChecked === false){
      alert(_swearAlert);
    } 
      const { name, company, contact, email } = userData;
      const bodyData = {
        reportType:7,
        suspectUserId: targetUserId,
        contentId,
        contentType,
        reportBody:{
          reporterName:name,
          reporterCompany:company,
          tel:contact,
          reporterEmail:email,
          originLink:linkData,
          contentSubject:descript,
          isAgreePolicy:agreeCheck[0]?.isChecked,
          isAgreeCorrect:agreeCheck[1]?.isChecked,
          signature:signitrue,
        }
      };
      const URL = `${process.env.NEXT_PUBLIC_API_URL}/report/copyright`;
      reportFetch(URL, 'post', bodyData, null);
  };

  const linkHandler = (e, id) => {
    originForm[id].title = e.target.value;
    let arr = []
    for(let value in originForm){
      arr.push(originForm[value].title)

    }
    setLinkData(arr);
  }
  
  return (
    <Layout>
      <LayoutInner>
        <Header>
          <ArrowBtn onClick={() => router.back()} />
        </Header>
        <ReportBox onSubmit={(e) => reportSubmit(e)}>
          {/* 저작권 신고 상단 파트 */}
          <ReportTop>
            <ReportTitle>{_copyrightReportTitle}</ReportTitle>
            <ReportTxt>*{_remindCopyright}</ReportTxt>
            <Dummy />

            <ReportSubTitle>{_reporterInfo}</ReportSubTitle>
            {
              copyRightinformArr?.map( ( { id, title, name, required } ) => (
                <InputWrap key={id}>
                  <ReportTxt>{title}</ReportTxt>
                  <TxtInput
                    name={name}
                    onChange={ e => handleChangeValue(e, name) }
                    required={required}
                  />
                </InputWrap> ) )
            }

            {/* // 저작권 신고 상단 파트 끝 */}
          </ReportTop>
          <Dummy />
          {/* 침해받은 저작물 중간 파트 */}
          <ReportMiddle>
            <InputWrap>
              <ReportSubTitle>{_infringedConfirm}</ReportSubTitle>
              <TxtInput value={infringement} onChange={(e) => setInfringement(e.target.value)} />
            </InputWrap>
            <InputWrap>
              <ReportTxt>{_filloutContents}</ReportTxt>
              { originForm?.map( ( { id } ) => 
              <TxtInput 
              key={id} 
              id={id} 
              placeholder={'ex) https://'}
              onChange={ e => linkHandler(e, id) }
              /> ) }
            </InputWrap>
            <InputWrap>
              <ReportTxt>{_proofOrigin}</ReportTxt>
              <TextDescript value={descript} onChange={(e) => setDescript(e.target.value)} />
            </InputWrap>
            {/* // 침해받은 저작물 중간 파트 끝 */}
          </ReportMiddle>
          <Dummy />
          {/* 처리방침 및 발송 마지막 파트 */}
          <ReportEnd>
            <InputWrap>
              <ReportSubTitle>{_violationsDeal}</ReportSubTitle>
              <ReportTxt>{_processDesc}</ReportTxt>

              {/* // 처리방침 및 발송 마지막 파트 끝 */}
            </InputWrap>
            <InputWrap>
              <ReportSubTitle>{_agreeAbove}</ReportSubTitle>
              {
                agreeList?.map( ( { id, title } ) => (
                  <AgreeBoxWrap key={id}>
                    <PvAgreeBox id={id} onChange={ e => handleChangeValue(e, 'checkBox')} />
                    <PvAgreeBoxLabel htmlFor={id}>{title}</PvAgreeBoxLabel>
                  </AgreeBoxWrap>
                ) )
              }
            </InputWrap>
            <InputWrap>
              <ReportSubTitle>{_signatureFill}</ReportSubTitle>
              <TxtInput value={signitrue} onChange={(e) => setSignitrue(e.target.value)} />
            </InputWrap>
            <ReConfirm>* {_beforeSubmit} </ReConfirm>
            <SubmitBtn>{_reportSubReport}</SubmitBtn>
          </ReportEnd>
        </ReportBox>
      </LayoutInner>
    </Layout>
  );
};

{
  /* 신고하기 폼 디자인 */
}
// 공통

const Dummy = styled.div`
  width: 100%;
  height: 3px;
  background: ${(props) => props.theme.color.hoverColor};
  margin: 20px 0;
`;
// 공통 - 텍스트
const ReportTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSize.font20};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.blackColor};
  margin-bottom: 12px;
`;
const ReportSubTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.blackColor};
  margin-bottom: 14px;
`;
const ReportTxt = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.blackColor};
  line-height: 20px;
`;
// 공통 - Input
const TxtInput = styled.input.attrs({
  type: 'text',
})`
  width: 100%;
  height: 38px;
  border: 2px solid ${(props) => props.theme.color.hoverColor};
  border-radius: 8px;
  padding: 5px 12px;
  margin-top: 6px;
  &::placeholder {
    color: ${(props) => props.theme.color.placeHolderColor};
  }
`;

//레이아웃
const Layout = styled.div`
  display: flex;
  justify-content: center;
`;
const LayoutInner = styled.div`
  width: calc(100% - 65%);
  min-width: 35em;
  height: 100%;
  background: ${(props) => props.theme.color.whiteColor};

  overflow: hidden;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: 1px;
  left: 0;
  width: 100%;
  height: 52px;
  padding: 4px;
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  z-index: 9;
`;

const ReportBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 120px;
  padding: 30px;
`;

const InputWrap = styled.div`
  width: 100%;
  height: auto;
  margin: 0.3em 0;
`;

// 저작권 신고 상단 파트
const ReportTop = styled.article`
  display: flex;
  flex-direction: column;
`;
const ArrowBtn = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-left: 8px;
  cursor: pointer;
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    margin-left: 8px;
    border-top: 3px solid ${(props) => props.theme.color.darkGray};
    border-right: 3px solid ${(props) => props.theme.color.darkGray};
    transform: rotate(-135deg);
  }
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
`;
// 침해받은 저작물 중간 파트
const ReportMiddle = styled(ReportTop)``;
const TextDescript = styled.textarea`
  width: 100%;
  height: 120px;
  border: 2px solid ${(props) => props.theme.color.hoverColor};
  border-radius: 8px;
  margin: 12px 0;
`;

// 처리방침 및 발송 마지막 파트
const ReportEnd = styled(ReportTop)``;
const AgreeBoxWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 14px 0;
`;
const PvAgreeBox = styled.input.attrs({
  type: 'checkbox',
})`
  margin-right: 10px;
`;
const PvAgreeBoxLabel = styled.label``;

const ReConfirm = styled.span`
  font-size: ${(props) => props.theme.fontSize.font13};
  margin-top: 60px;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 42px;
  border-radius: 25px;
  background: ${(props) => props.theme.color.orangeColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.whiteColor};
  margin-top: 16px;
`;

export default Report;
