import React, { useContext } from 'react';
import styled from 'styled-components';
import { LangFeedbackMain } from '@language/Lang.Common';
import { Develop201116, Develop201126, Develop201130, Develop201210, Develop201212 } from '@language/Lang.Develop';
import { LanguageContext } from '@store/App_Store';

export default function DevelopNote() {
  const { langState } = useContext(LanguageContext);
  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { developTitle201116, developSub201116 } = Develop201116,
    { developTitle201126, developSub201126 } = Develop201126,
    { developTitle201130, developSub201130 } = Develop201130,
    { developTitle201210, developSub201210 } = Develop201210,
    { developTitle201212, developSub201212 } = Develop201212,
    _developTitle201116 = developTitle201116[selectedLanguage] || developTitle201116[defaultLanguage],
    _developSub201116 = developSub201116[selectedLanguage] || developSub201116[defaultLanguage],
    // 20-11-26
    _developTitle201126 = developTitle201126[selectedLanguage] || developTitle201126[defaultLanguage],
    _developSub201126 = developSub201126[selectedLanguage] || developSub201126[defaultLanguage],
    // 20-11-30
    _developTitle201130 = developTitle201130[selectedLanguage] || developTitle201130[defaultLanguage],
    _developSub201130 = developSub201130[selectedLanguage] || developSub201130[defaultLanguage],
    // 20-12-10
    _developTitle201210 = developTitle201210[selectedLanguage] || developTitle201210[defaultLanguage],
    _developSub201210 = developSub201210[selectedLanguage] || developSub201210[defaultLanguage],
    // 20-12-12
    _developTitle201212 = developTitle201212[selectedLanguage] || developTitle201212[defaultLanguage],
    _developSub201212 = developSub201212[selectedLanguage] || developSub201212[defaultLanguage];

  const List = [
    { top: 'Patch 1.4.01 notes', title: _developTitle201212, desc: _developSub201212, date: '2020-12-12' },
    { top: 'Patch 1.3.01 notes', title: _developTitle201210, desc: _developSub201210, date: '2020-12-10' },
    { top: 'Patch 1.2.01 notes', title: _developTitle201130, desc: _developSub201130, date: '2020-11-30' },
    { top: 'Patch 1.1.01 notes', title: _developTitle201126, desc: _developSub201126, date: '2020-11-26' },
    { top: 'Patch 1.0.01 notes', title: _developTitle201116, desc: _developSub201116, date: '2020-11-20' },
  ];

  return (
    <PopupInner>
      <PopupTab>
        {List.map((i, key) => (
          <TabWrap key={key}>
            <TabTitleWrap>
              <TabTitle>{i.top}</TabTitle>
              <TabDay>{i.date}</TabDay>
            </TabTitleWrap>
            <TabDpTitle>
              <DpTitle>{i.title}</DpTitle>
            </TabDpTitle>
            <TabSubWrap>
              <TabSub>{i.desc}</TabSub>
            </TabSubWrap>
          </TabWrap>
        ))}
      </PopupTab>
    </PopupInner>
  );
}

// 레이아웃
const PopupInner = styled.div`
  overflow-x: scroll;
  overflow-x: hidden;
  height: 100%;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.whiteColor};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${(props) => props.theme.color.orangeColor};
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;
const PopupTab = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 18px;
  width: 100%;
  height: auto;
  margin-bottom: 3px;
  background: ${(props) => props.theme.color.whiteColor};
`;
//  (개발 버전 타이틀)
const TabWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1em 0;
`;

const TabTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;
const TabTitle = styled.span`
  color: ${(props) => props.theme.color.darkGray};
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font700};
`;
const TabDay = styled.span`
  color: ${(props) => props.theme.color.darkGray};
  font-size: ${(props) => props.theme.fontSize.font14};
`;
// 개발 내용 타이틀
const TabDpTitle = styled.div`
  margin-bottom: 12px;
`;
const DpTitle = styled.div`
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font700};
`;
// 개발 설명
const TabSubWrap = styled.div``;
const TabSub = styled.span`
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  line-height: 1.6em;
`;
