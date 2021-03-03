import React, {useContext} from 'react';
import styled from 'styled-components';

import { LanguageContext } from '@store/App_Store';
import { 
      copyrightGuide, 
      reasonCollection,
      collectionItem,
      consentStatus,
      informModification,
    } from '@language/Policy/Lang.PolicyCopyright';


const Copyright = () => {
  const { langState } = useContext(LanguageContext);

  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { reason1, definition1 } = copyrightGuide;
  const { reason2, definition2 } = reasonCollection;
  const { reason3, definition3 } = collectionItem;
  const { reason4, definition4 } = consentStatus;
  const { reason5, definition5 } = informModification;

  const _reason1 = reason1[selectedLanguage] || reason1[defaultLanguage],
      _definition1 = definition1[selectedLanguage] || definition1[defaultLanguage],
      _reason2 = reason2[selectedLanguage] || reason2[defaultLanguage],
      _definition2 = definition2[selectedLanguage] || definition2[defaultLanguage],
      _reason3 = reason3[selectedLanguage] || reason3[defaultLanguage],
      _definition3 = definition3[selectedLanguage] || definition3[defaultLanguage],
      _reason4 = reason4[selectedLanguage] || reason4[defaultLanguage],
      _definition4 = definition4[selectedLanguage] || definition4[defaultLanguage],
      _reason5 = reason5[selectedLanguage] || reason5[defaultLanguage],
      _definition5 = definition5[selectedLanguage] || definition5[defaultLanguage];

      const langArr = [
        {a:_reason1, b: _definition1},
        {a:_reason2, b:_definition2},
        {a:_reason3, b:_definition3},
        {a:_reason4, b:_definition4},
        {a:_reason5, b:_definition5}
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
export default Copyright;
