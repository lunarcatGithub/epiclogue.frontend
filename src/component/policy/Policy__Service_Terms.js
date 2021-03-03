import React,{useContext} from 'react';
import styled from 'styled-components';

import { LanguageContext } from '@store/App_Store';
import {
  serviceReason,
  serviceDefine,
  aboutSignUp,
  serveAbout,
  serviceAbort,
  serviceLeave,
  notification,
  personalInformation,
  ourResponsibility,
  membershipObligation,
  memberInformation,
  removePost,
  serviceUtilization,
  conditionsEstablishment,
  attributionCopyright,
  advertisingPolicy,
  termsRevised,
  caseOfImmunity,
  disputeOccurrence
} from '@language/Policy/Lang.PolicyService';

const ServicePolicy = () => {
  const { langState } = useContext(LanguageContext);

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { reason1, definition1 } = serviceReason;
  const { reason2, definition2 } = serviceDefine;
  const { reason3, definition3 } = aboutSignUp;
  const { reason4, definition4 } = serveAbout;
  const { reason5, definition5 } = serviceAbort;
  const { reason6, definition6 } = serviceLeave;
  const { reason7, definition7 } = notification;
  const { reason8, definition8 } = personalInformation;
  const { reason9, definition9 } = ourResponsibility;
  const { reason10, definition10 } = membershipObligation;
  const { reason11, definition11 } = memberInformation;
  const { reason12, definition12 } = removePost;
  const { reason13, definition13 } = serviceUtilization;
  const { reason14, definition14 } = conditionsEstablishment;
  const { reason15, definition15 } = attributionCopyright;
  const { reason16, definition16 } = advertisingPolicy;
  const { reason17, definition17 } = termsRevised;
  const { reason18, definition18 } = caseOfImmunity;
  const { reason19, definition19 } = disputeOccurrence;

  const _reason1 = reason1[selectedLanguage] || reason1[defaultLanguage],
      _definition1 = definition1[selectedLanguage] || definition1[defaultLanguage],
      _reason2 = reason2[selectedLanguage] || reason2[defaultLanguage],
      _definition2 = definition2[selectedLanguage] || definition2[defaultLanguage],
      _reason3 = reason3[selectedLanguage] || reason3[defaultLanguage],
      _definition3 = definition3[selectedLanguage] || definition3[defaultLanguage],
      _reason4 = reason4[selectedLanguage] || reason4[defaultLanguage],
      _definition4 = definition4[selectedLanguage] || definition4[defaultLanguage],
      _reason5 = reason5[selectedLanguage] || reason5[defaultLanguage],
      _definition5 = definition5[selectedLanguage] || definition5[defaultLanguage],
      _reason6 = reason6[selectedLanguage] || reason6[defaultLanguage],
      _definition6 = definition6[selectedLanguage] || definition6[defaultLanguage],
      _reason7 = reason7[selectedLanguage] || reason7[defaultLanguage],
      _definition7 = definition7[selectedLanguage] || definition7[defaultLanguage],
      _reason8 = reason8[selectedLanguage] || reason8[defaultLanguage],
      _definition8 = definition8[selectedLanguage] || definition8[defaultLanguage],
      _reason9 = reason9[selectedLanguage] || reason9[defaultLanguage],
      _definition9 = definition9[selectedLanguage] || definition9[defaultLanguage],
      _reason10 = reason10[selectedLanguage] || reason10[defaultLanguage],
      _definition10 = definition10[selectedLanguage] || definition10[defaultLanguage],
      _reason11 = reason11[selectedLanguage] || reason11[defaultLanguage],
      _definition11 = definition11[selectedLanguage] || definition11[defaultLanguage],
      _reason12 = reason12[selectedLanguage] || reason12[defaultLanguage],
      _definition12 = definition12[selectedLanguage] || definition12[defaultLanguage],
      _reason13 = reason13[selectedLanguage] || reason13[defaultLanguage],
      _definition13 = definition13[selectedLanguage] || definition13[defaultLanguage],
      _reason14 = reason14[selectedLanguage] || reason14[defaultLanguage],
      _definition14 = definition14[selectedLanguage] || definition14[defaultLanguage],
      _reason15 = reason15[selectedLanguage] || reason15[defaultLanguage],
      _definition15 = definition15[selectedLanguage] || definition15[defaultLanguage],
      _reason16 = reason16[selectedLanguage] || reason16[defaultLanguage],
      _definition16 = definition16[selectedLanguage] || definition16[defaultLanguage],
      _reason17 = reason17[selectedLanguage] || reason17[defaultLanguage],
      _definition17 = definition17[selectedLanguage] || definition17[defaultLanguage],
      _reason18 = reason18[selectedLanguage] || reason18[defaultLanguage],
      _definition18 = definition18[selectedLanguage] || definition18[defaultLanguage],
      _reason19 = reason19[selectedLanguage] || reason19[defaultLanguage],
      _definition19 = definition19[selectedLanguage] || definition19[defaultLanguage];

      const langArr = [
        {a:_reason1, b: _definition1},
        {a:_reason2, b:_definition2},
        {a:_reason3, b:_definition3},
        {a:_reason4, b:_definition4},
        {a:_reason5, b:_definition5},
        {a:_reason6, b:_definition6},
        {a:_reason7, b:_definition7},
        {a:_reason8, b:_definition8},
        {a:_reason9, b:_definition9},
        {a:_reason10, b:_definition10},
        {a:_reason11, b:_definition11},
        {a:_reason12, b:_definition12},
        {a:_reason13, b:_definition13},
        {a:_reason14, b:_definition14},
        {a:_reason15, b:_definition15},
        {a:_reason16, b:_definition16},
        {a:_reason17, b:_definition17},
        {a:_reason18, b:_definition18},
        {a:_reason19, b:_definition19}
        ]
  return (
    <>
    {
      langArr.map((i, index) => {
        return(
        <CategoryWrap key={index}>
        <CategoryTitleWrap>
          <CategoryTitle>{i.a}</CategoryTitle>
        </CategoryTitleWrap>
        <CategoryTxtWrap>
          {i.b}
        </CategoryTxtWrap>
      </CategoryWrap>
      )
      })
      }
    </>
  );
};

/* 스타일링 시작 */

// 조항 내용
const CategoryWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: 2%;
  margin-bottom: 3px;
  background: ${(props) => props.theme.color.whiteColor};
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const CategoryTitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35%;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
const CategoryTitle = styled.h2`
  font-size: 28px;
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.darkGray};
  @media (max-width: 900px) {
    font-size: 18px;
    margin-top: 8px;
  }
`;
const CategoryTxtWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  padding: 20px 160px 20px 20px;
  @media (max-width: 900px) {
    width: 100%;
    padding: 10px;
  }
`;

export default ServicePolicy;
