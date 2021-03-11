import React, { useContext } from 'react';
import styled from 'styled-components';

// reducer && context
import { EditorContext } from './Editor_Store';

export const EditorOutline = (props) => {
  const { textOutline, toggleTextOutline, setOutlineWidth, outlineWidth, setOutlineColor, outlineColor, useEyeDropper, setUseEyeDropper, setEyeDropMode } = useContext(EditorContext);

  return (
    <OutlineAllWrap>
      <OutlineWrap>
        <OutlineTxt>{props.outlineTxt}</OutlineTxt>
        <OutlineToggle onClick={() => toggleTextOutline()} styling={textOutline}>
          <OutlineTama styling={textOutline} />
        </OutlineToggle>
        {/* <Outline
                     id="checkOutline"
                      className="checkbox"
                    />
                 <OutlineLabel onClick={()=>toggleTextOutline()}/> */}
      </OutlineWrap>
      {textOutline && (
        <>
          <OutlineBox>
            <OutlineBoxInnder>
              {/* <OutlineTitle>Outline</OutlineTitle> */}
              <OutlineInput onChange={(e) => setOutlineWidth(Number(e.target.value))} value={outlineWidth} />
              <WidthNumBox>
                <WidthNum>{outlineWidth}</WidthNum>
              </WidthNumBox>
              <OutlineColorLabel styling={outlineColor}>
                <OutlineColor onChange={(e) => setOutlineColor(e.target.value)} value={outlineColor} />
              </OutlineColorLabel>
              <EyedropperBox
                onClick={() => {
                  setUseEyeDropper(!useEyeDropper);
                  setEyeDropMode('outline');
                }}
                styling={useEyeDropper}
              >
                <EyedropperImg styling={useEyeDropper} />
              </EyedropperBox>
            </OutlineBoxInnder>
          </OutlineBox>
        </>
      )}
    </OutlineAllWrap>
  );
};
// 레이아웃 및 상단 버튼 영역
const OutlineAllWrap = styled.div`
  display: flex;
  /* height:100%; */
`;

const OutlineWrap = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  margin-left: 0.3em;
`;

const OutlineTxt = styled.span`
  white-space: nowrap;
  font-size: ${(props) => props.theme.fontSize.font13};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.blackColor};
`;
const OutlineToggle = styled.span`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.styling ? `flex-end` : `flex-start`)};
  width: 2em;
  border-radius: 25px;
  height: 1em;
  border: 1px solid ${(props) => (props.styling ? props.theme.color.softGreenColor : props.theme.color.hoverColor)};
  margin: 4px 0 2px 0;
  transition: all 0.3s ease-in-out;
`;
const OutlineTama = styled.span`
  display: flex;
  width: 0.7em;
  height: 0.7em;
  margin: 0 1px;
  border-radius: 50%;
  background: ${(props) => (props.styling ? props.theme.color.greenColor : props.theme.color.hoverColor)};
  transition: all 0.3s ease-in-out;
`;

const OutlineLabel = styled.label.attrs({ htmlFor: 'checkOutline' })`
  position: relative;
  width: 2em;
  height: 0.9em;
  border-radius: 25px;
  margin: 4px 0 2px 0;
  border: 1px solid ${(props) => props.theme.color.hoverColor};
  box-sizing: content-box;
  cursor: pointer;
  &:before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 10px;
    height: 10px;
    background: ${(props) => props.theme.color.popupColor};
    border-radius: 50%;
  }
`;
const Outline = styled.input.attrs({ type: 'checkbox' })`
  display: none;
  &:checked + ${OutlineLabel} {
    border: 1px solid ${(props) => props.theme.color.softGreenColor};
    opacity: 0.8;
    background: ${(props) => props.theme.color.greenColor};

    &:before {
      left: initial;
      right: 1px;
      background: ${(props) => props.theme.color.whiteColor};
    }
  }
`;
// 토글 사이드 메뉴 영역
const OutlineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  border-radius: 0.3em;
  margin-left: 1em;
  background: ${(props) => props.theme.color.backgroundColor};
`;
const OutlineBoxInnder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 0.3em;
  border-radius: 0.3em;
  margin-left: 1em;
`;

const OutlineInput = styled.input.attrs({
  type: 'range',
  min: '0',
  max: '30',
})`
  -webkit-appearance: none;
  width: 8em;
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
// 굵기
const WidthNumBox = styled.div`
  display: flex;
  width: 2.2em;
  height: 1.3em;
  align-items: center;
  justify-content: center;
  background: #fff;
  /* border:1px solid ${(props) => props.theme.color.hoverColor}; */
  border-radius: 0.2em;
  margin-left: 0.5em;
`;
const WidthNum = styled.span`
  font-size: ${(props) => props.theme.fontSize.font13};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.blackColor};
`;

// 아웃라인 칼라
const OutlineColor = styled.input.attrs({
  type: 'color',
})`
  display: none;
`;

const OutlineColorLabel = styled.label`
  width: 1.7em;
  min-width: 1.7em;
  height: 1.7em;
  min-height: 1.7em;
  border-radius: 50%;
  border: 2px solid #fff;
  background: ${(props) => props.styling};
  margin: 0 0.8em;
  cursor: pointer;
`;
const EyedropperBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1.8em;
  min-height: 1.8em;
  border: 1px solid ${(props) => (props.styling ? props.theme.color.greenColor : `#2222`)};
  border-radius: 50%;
`;

const EyedropperImg = styled.button`
  display: block;
  background: url(${(props) => (props.styling ? `/static/editor/eyedropperOn.svg` : `/static/editor/eyedropper.svg`)}) no-repeat center / contain;
  width: 1.5em;
  height: 1.5em;
  cursor: pointer;
`;
