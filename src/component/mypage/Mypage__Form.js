import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
// 컴포넌트 import
import { LangPush } from '@language/Lang.Common';
import { LangMypageGene, LangMypageInform } from '@language/Lang.Mypage';

// hooks&&reducer
import { MypageContext } from './Mypage';

import { LanguageContext } from '@store/App_Store';

export default function MypageForm(props) {
  const { type, formDatas } = props;

  // contextAPI
  const { LanguageList, interestedList } = useContext(MypageContext);
  const { langState, langPatch } = useContext(LanguageContext);

  const { selectedLanguage, defaultLanguage } = langState;
  const [toggleSet, setToggleSet] = useState(false);
  const [selectData, setSelectData] = useState(selectedLanguage);
  // const [currentData, setCurrentData] = useState();

  // 언어 변수 설정
  const [langTitle, setLangTitle] = useState();
  const [langSubtitle, setLangSubtitle] = useState();
  const [langBtn, setLangBtn] = useState();

  // 언어 변수
  const { notServicePush } = LangPush;

  const { contrySetting, viewLanguage, InterestLanguage, InterestLangDesc, muteSetting, muteSetDesc, changeBtn } = LangMypageGene;

  const { pushSetting, pushSetDesc, generalSetting, generalSetDesc } = LangMypageInform;

  const _contrySetting = contrySetting[selectedLanguage] || contrySetting[defaultLanguage],
    _viewLanguage = viewLanguage[selectedLanguage] || viewLanguage[defaultLanguage],
    _InterestLanguage = InterestLanguage[selectedLanguage] || InterestLanguage[defaultLanguage],
    _InterestLangDesc = InterestLangDesc[selectedLanguage] || InterestLangDesc[defaultLanguage],
    _muteSetting = muteSetting[selectedLanguage] || muteSetting[defaultLanguage],
    _muteSetDesc = muteSetDesc[selectedLanguage] || muteSetDesc[defaultLanguage],
    _changeBtn = changeBtn[selectedLanguage] || changeBtn[defaultLanguage],
    _notServicePush = notServicePush[selectedLanguage] || notServicePush[defaultLanguage],
    _pushSetting = pushSetting[selectedLanguage] || pushSetting[defaultLanguage],
    _pushSetDesc = pushSetDesc[selectedLanguage] || pushSetDesc[defaultLanguage],
    _generalSetting = generalSetting[selectedLanguage] || generalSetting[defaultLanguage],
    _generalSetDesc = generalSetDesc[selectedLanguage] || generalSetDesc[defaultLanguage];

  const dataOnChangeHandler = (e) => {
    setSelectData(Number(e.target.value));
    // for(const [key, value] of Object.entries(countryArray)){
    //   if(e.target.value === key){
    //     setCurrentData(value);
    //   }
    // }
  };

  const sendDataHandler = (e) => {
    if (type === 'language') {
      localStorage.setItem('language', selectData);
      langPatch({ type: 'LANGUAGE_UPDATE', payload: selectData });
      formDatas.submit(e, 'language', selectData);
    } else if (type === 'interest') {
      formDatas.submit(e, 'language', selectData);
    }
    setToggleSet(false);
  };

  const langHandler = () => {
    switch (type) {
      case 'language':
        setLangTitle(_viewLanguage);
        setLangSubtitle(LanguageList[selectData].title);
        setLangBtn(_changeBtn);
        break;
      case 'interest':
        setLangTitle(_InterestLanguage);
        setLangSubtitle(_InterestLangDesc);
        setLangBtn(_changeBtn);
        break;
      case 'mute':
        setLangTitle(_muteSetting);
        setLangSubtitle(_muteSetDesc);
        setLangBtn(_changeBtn);
        break;
      case 'push':
        setLangTitle(_pushSetting);
        setLangSubtitle(_pushSetDesc);
        setLangBtn(_changeBtn);
        break;
      case 'generalset':
        setLangTitle(_generalSetting);
        setLangSubtitle(_generalSetDesc);
        setLangBtn(_changeBtn);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    langHandler();
  }, [selectedLanguage, defaultLanguage]);

  return (
    <ContentsBox>
      {/* 내 언어 설정 */}
      <IdContentInnerBox styling={toggleSet}>
        <TitleWrap onClick={() => setToggleSet(!toggleSet)}>
          <ContentsTitle>{langTitle}</ContentsTitle>
          <ContentsScript>{langSubtitle}</ContentsScript>
        </TitleWrap>

        {toggleSet && (
          <HiddenBox>
            <div>
              <HiddenInner>
                {type === 'language' &&
                  LanguageList?.map((list) => (
                    <ListTxtBox key={list.id}>
                      <TextList>{list.title}</TextList>
                      <ListTxtRadio readOnly id={list.id} name="userLanguage" value={list.state} checked={selectData === list.state} onChange={dataOnChangeHandler} />
                      <ListRadioCustom />
                    </ListTxtBox>
                  ))}
                {type === 'interest' &&
                  interestedList?.map((list) => (
                    <ListCheckLabel key={list.id}>
                      <TextList>{list.title}</TextList>
                      <ListCheck id={list.tagId} value={list.value} />
                      <ListCheckCustom />
                    </ListCheckLabel>
                  ))}
                {type === 'mute' || type === 'push' || type === 'generalset' ? (
                  <HiddenBox>
                    <ServiceNotYet>{_notServicePush}</ServiceNotYet>
                  </HiddenBox>
                ) : null}
              </HiddenInner>
              {type === 'mute' || type === 'push' || type === 'generalset' ? null : (
                <BtnWrap>
                  <PwChangeBtn onClick={sendDataHandler}>{langBtn}</PwChangeBtn>
                </BtnWrap>
              )}
            </div>
          </HiddenBox>
        )}
      </IdContentInnerBox>
      {/* // 내 언어 설정 끝 */}
    </ContentsBox>
  );
}

//공통
const ServiceNotYet = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.pinkColor};
`;

// 레이아웃
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

const IdContentInnerBox = styled.div`
  position: relative;
  width: 100%;
  border: 2px solid ${(props) => (props.styling ? props.theme.color.softOrangeColor : props.theme.color.hoverColor)};
  border-radius: 4px;
  transition: all 0.2s ease;
  box-sizing: border-box;
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
// 콘텐츠 내용
const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 16px;
`;
const ContentsTitle = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.blackColor};
`;

const ContentsScript = styled.span`
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.softBlackColor};
  margin-top: 8px;
`;

// hidden contents 영역 - 레이아웃
const HiddenBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 300px;
  padding: 0 16px 10px 16px;
`;
const HiddenInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.whiteColor};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${(props) => props.theme.color.softOrangeColor};
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;
// hidden contents 영역 - 라디오 버튼
const ListRadioCustom = styled.label`
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.color.hoverColor};
  margin-right: 6px;
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
const ListTxtBox = styled.label.attrs({})`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 2px solid ${(props) => props.theme.color.hoverColor};
  cursor: pointer;
  padding: 12px 0;
  margin-bottom: 4px;
  transition: all 0.2s ease;
  &:hover {
    background: ${(props) => props.theme.color.microOrangeColor};
  }
`;
const TextList = styled.span`
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.blackColor};
  padding: 0 4px;
`;

// hidden contents 영역 - 체크박스
const ListCheckCustom = styled.label`
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.color.hoverColor};
  margin-right: 6px;
`;
const ListCheck = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
  &:checked + ${ListCheckCustom} {
    border: 1px solid ${(props) => props.theme.color.orangeColor};
    &::before {
      content: '';
      position: relative;
      top: -3px;
      left: 4px;
      display: inline-block;
      transform: rotate(45deg);
      height: 9px;
      width: 4px;
      border-bottom: 3px solid ${(props) => props.theme.color.orangeColor};
      border-right: 3px solid ${(props) => props.theme.color.orangeColor};
    }
  }
`;
const ListCheckLabel = styled.label.attrs({})`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 2px solid ${(props) => props.theme.color.hoverColor};
  cursor: pointer;
  padding: 12px 0;
  margin-bottom: 4px;
  transition: all 0.2s ease;
  &:hover {
    background: ${(props) => props.theme.color.microOrangeColor};
  }
`;

// 버튼 부문

const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const PwChangeBtn = styled.button`
  width: auto;
  padding: 6px 16px;
  border-radius: 25px;
  margin: 12px 8px 30px 0;
  background: ${(props) => props.theme.color.softOrangeColor};
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.whiteColor};
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.color.orangeColor};
  }
`;
