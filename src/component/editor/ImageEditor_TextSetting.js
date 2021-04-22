import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

// 컴포넌트 import
import { EditorText } from '@language/Lang.Editor';

// reducer && context
import { EditorContext } from './Editor_Store';
import { LanguageContext } from '@store/App_Store';

export const EditorTextSetting = () => {
  //토글 버튼
  const [textSetting, toggleTextSetting] = useState(false);

  const { radioBtn, UseRadioBtn, textBold, toggleBold, textSlope, toggleSlope, textUnderbar, toggleUnderbar, textHeight, setTextHeight, textSpace, setTextSpace } = useContext(EditorContext);

  const { langState } = useContext(LanguageContext);
  const { selectedLanguage, defaultLanguage } = langState;
  const { detailText, heightText, spacingText } = EditorText;
  const _detailText = detailText[selectedLanguage] || detailText[defaultLanguage],
    _heightText = heightText[selectedLanguage] || heightText[defaultLanguage],
    _spacingText = spacingText[selectedLanguage] || spacingText[defaultLanguage];

  const popupHandler = (e) => {
    if (!e) return;

    if (e.target.id === 'textSetting' || e.target.id === 'textSettingCtrl') {
      toggleTextSetting(true);
      if (textSetting) toggleTextSetting(false);
    } else {
      toggleTextSetting(false);
    }
  };
  useEffect(() => {
    textSetting && window.addEventListener('click', popupHandler);
    return () => {
      window.removeEventListener('click', popupHandler);
    };
  }, [textSetting]);

  return (
    <>
      <TextSettingWrap>
        <TextSettingBtn id="textSettingCtrl" styling={textSetting} onClick={() => toggleTextSetting(!textSetting)}>
          {_detailText}
        </TextSettingBtn>
        {textSetting && (
          <TextSettingBox id="textSetting">
            <TextSettingInner onClick={(e) => e.stopPropagation()}>
              {/* 글자 높이 */}
              <CtrlBox>
                <CtrlText>{_heightText}</CtrlText>
                <CtrlInputBox>
                  <TextStyleInput onChange={(e) => setTextHeight(Number(e.target.value))} value={textHeight} />
                  <SpaceNumBox>
                    <SpaceNum>{textHeight}</SpaceNum>
                  </SpaceNumBox>
                </CtrlInputBox>
              </CtrlBox>
              {/* 글자 간격 */}
              <CtrlBox>
                <CtrlText>{_spacingText}</CtrlText>
                <CtrlInputBox>
                  <TextSpaceInput onChange={(e) => setTextSpace(Number(e.target.value))} value={textSpace} />
                  <SpaceNumBox>
                    <SpaceNum>{textSpace / 10}</SpaceNum>
                  </SpaceNumBox>
                </CtrlInputBox>
              </CtrlBox>
              {/* 텍스트 스타일링 */}
              <TextStyleWrap>
                <ButtonWrapBold onClick={() => toggleBold(textBold === 'normal' ? 'bold' : 'normal')} styling={textBold}>
                  <TextBold styling={textBold} />
                </ButtonWrapBold>
                <ButtonWrapSlope onClick={() => toggleSlope(textSlope === 'normal' ? 'italic' : 'normal')} styling={textSlope}>
                  <TextSlope styling={textSlope} />
                </ButtonWrapSlope>
                <ButtonWrapUnder onClick={() => toggleUnderbar(!textUnderbar)} styling={textUnderbar}>
                  <TextUnderbar styling={textUnderbar} />
                </ButtonWrapUnder>
                {/* 텍스트 정렬 */}
                <ButtonWrapLeft onClick={(e) => UseRadioBtn(e.target.value)} value="left" styling={radioBtn === 'left'}></ButtonWrapLeft>
                <ButtonWrapCenter onClick={(e) => UseRadioBtn(e.target.value)} value="center" styling={radioBtn === 'center'}></ButtonWrapCenter>
                <ButtonWrapRight onClick={(e) => UseRadioBtn(e.target.value)} value="right" styling={radioBtn === 'right'}></ButtonWrapRight>
              </TextStyleWrap>
            </TextSettingInner>
          </TextSettingBox>
        )}
      </TextSettingWrap>
    </>
  );
};
// 공통

// 레이아웃

const TextSettingWrap = styled.div`
  position: relative;
  display: flex;
  width: auto;
  height: 100%;
  margin: 0 1.2em;
`;

const TextSettingBtn = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 1.3em;
  width: 8em;
  height: 2.2em;
  /* justify-content:flex-start; */

  /* padding:0.3em 1em; */
  border-radius: 6px;
  border: 1px solid ${(props) => (props.styling ? props.theme.color.greenColor : props.theme.color.hoverColor)};
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.blackColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  transition: all 0.2s ease;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: ${(props) => (props.styling ? 0.7 : 0.9)}em;
    right: 0.8em;
    width: 0.4em;
    height: 0.4em;
    border-top: 1px solid ${(props) => (props.styling ? props.theme.color.greenColor : props.theme.color.placeHolderColor)};
    border-right: 1px solid ${(props) => (props.styling ? props.theme.color.greenColor : props.theme.color.placeHolderColor)};
    transform: rotate(${(props) => (props.styling ? `135deg` : `-45deg`)});
    transition: all 0.2s ease;
  }
  @media (max-width: 900px) {
    &::after {
      transform: rotate(${(props) => (props.styling ? `-45deg` : `135deg`)});
      top: ${(props) => (props.styling ? 0.9 : 0.7)}em;
    }
  }
`;
// 텍스트 세팅 팝업
const TextSettingBox = styled.div`
  position: absolute;
  top: 2.6em;
  left: 50%;
  transform: translateX(-50%);
  width: 15em;
  padding: 1.2em 1.5em;
  background: ${(props) => props.theme.color.whiteColor};
  border-radius: 0.5em;
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  z-index: 999;
  @media (max-width: 900px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const TextSettingInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const CtrlBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.2em;
`;

const CtrlText = styled.span`
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.blackColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  margin: 0.3em 0;
`;

const CtrlInputBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const TextStyleInput = styled.input.attrs({
  type: 'range',
  step: 0.01,
  min: 0.01,
  max: 2,
})`
  -webkit-appearance: none;
  width: 100%;
  height: 3px;
  outline: none;
  background: ${(props) => props.theme.color.softGreenColor};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background: rgba(3, 109, 108, 1);
    border: 2px solid #fff;
    z-index: 99;
  }
`;
const TextSpaceInput = styled(TextStyleInput).attrs({
  step: 10,
  min: -100,
  max: 1000,
})``;
// 간격
const SpaceNumBox = styled.div`
  display: flex;
  width: 2.5em;
  height: 1.3em;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid ${(props) => props.theme.color.hoverColor};
  border-radius: 0.2em;
  margin-left: 0.5em;
`;
const SpaceNum = styled.span`
  font-size: ${(props) => props.theme.fontSize.font13};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.blackColor};
`;

// 헤더 - 버튼 영역 - 텍스트 스타일링
const TextStyleWrap = styled.span`
  display: flex;
  width: auto;
  overflow: hidden;
  margin-top: 1.3em;
`;
const ButtonWrapBold = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => (props.styling === 'bold' ? props.theme.color.greenColor : props.theme.color.hoverColor)};
  border-radius: 4px 0 0 4px;
  padding: 0.3em 0;
  margin-right: -1px;
  cursor: pointer;
`;
const ButtonWrapSlope = styled(ButtonWrapBold)`
  border: 1px solid ${(props) => (props.styling === 'italic' ? props.theme.color.greenColor : props.theme.color.hoverColor)};

  border-radius: 0;
`;
const ButtonWrapUnder = styled(ButtonWrapBold)`
  border: 1px solid ${(props) => (props.styling ? props.theme.color.greenColor : props.theme.color.hoverColor)};

  border-radius: 0;
`;
const ButtonWrapLeft = styled(ButtonWrapBold)`
  display: flex;
  border: 1px solid ${(props) => (props.styling ? props.theme.color.greenColor : props.theme.color.hoverColor)};
  z-index: ${(props) => props.styling && 9};
  border-radius: 0;
  z-index: 9;

  &::before {
    content: '';
    background: url(${(props) => (props.styling ? `/static/editor/wordLeftOn.svg` : `/static/editor/wordLeft.svg`)}) no-repeat center center / contain;
    width: 1.4em;
    height: 1.4em;
  }
`;
const ButtonWrapCenter = styled(ButtonWrapLeft)`
  &::before {
    content: '';
    background: url(${(props) => (props.styling ? `/static/editor/wordCenterOn.svg` : `/static/editor/wordCenter.svg`)}) no-repeat center center / contain;
  }
`;
const ButtonWrapRight = styled(ButtonWrapLeft)`
  border-radius: 0 4px 4px 0;
  margin-right: 0;
  &::before {
    content: '';
    background: url(${(props) => (props.styling ? `/static/editor/wordRightOn.svg` : `/static/editor/wordRight.svg`)}) no-repeat center center / contain;
  }
`;

// 텍스트 굵기
const TextBold = styled.svg`
  background: url(${(props) => (props.styling === 'bold' ? `/static/editor/boldOn.svg` : `/static/editor/bold.svg`)}) no-repeat center center / contain;
  width: 1.3em;
  height: 1.3em;
`;

// 텍스트 기울기
const TextSlope = styled(TextBold)`
  background: url(${(props) => (props.styling === 'italic' ? `/static/editor/italicOn.svg` : `/static/editor/italic.svg`)}) no-repeat center center / contain;
`;

// 텍스트 밑줄
const TextUnderbar = styled(TextBold)`
  background: url(${(props) => (props.styling ? `/static/editor/underbarOn.svg` : `/static/editor/underbar.svg`)}) no-repeat center center / contain;
  width: 1.4em;
  height: 1.4em;
`;
