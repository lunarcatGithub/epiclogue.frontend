import React,{useContext} from 'react';
import styled from 'styled-components';

import { LanguageContext } from '@store/App_Store';
import { 
  personalInform,
  reasonCollection,
  collectionItem,
  consentStatus,
  informModification,
  informationPeriod,
  destructionInformation,
  sharingInformation,
  informationProtection,
  childInformation,
  infringementInformation,
  besidesThat
    } from '@language/Policy/Lang.PolicyPrivacy';

const PrivacyPolicy = () => {
  const { langState } = useContext(LanguageContext);

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { reason1, definition1 } = personalInform;
  const { reason2, definition2 } = reasonCollection;
  const { reason3, definition3 } = collectionItem;
  const { reason4, definition4 } = consentStatus;
  const { reason5, definition5 } = informModification;
  const { reason6, definition6 } = informationPeriod;
  const { reason7, definition7 } = destructionInformation;
  const { reason8, definition8 } = sharingInformation;
  const { reason9, definition9 } = informationProtection;
  const { reason10, definition10 } = childInformation;
  const { reason11, definition11 } = infringementInformation;
  const { reason12, definition12 } = besidesThat;

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
      _definition12 = definition12[selectedLanguage] || definition12[defaultLanguage];

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
        {a:_reason12, b:_definition12}
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

export default PrivacyPolicy;
