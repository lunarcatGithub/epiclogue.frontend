import React, { useState, useContext } from 'react';
import styled from 'styled-components';

// 컴포넌트 import
// import '../../App.css';
import { initalFont } from './Editor_Font_Obj';

// reducer && context
import { EditorContext } from './Editor_Store';

export const SelectFont = () => {
  const [item, setItem] = useState(initalFont);
  const [open, toggleOpen] = useState(false);

  const { currentFont, setCurrentFont } = useContext(EditorContext);

  const fontChange = (e) => {
    if (!e) return;
    new Promise((res, rej) => {
      setCurrentFont(e.target.value);
      res(false);
    })
      .then((bool) => {
        toggleOpen(bool);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Selectposition>
      <TextFontBtn onClick={() => toggleOpen(!open)} styling={open}>
        {/* 선택바 */}
        {currentFont}
      </TextFontBtn>

      {open ? (
        <SelectBox>
          <OptionBox>
            {item.map((font, index) => {
              return (
                <Option key={index}>
                  <OptionTxt font={font.value}>{font.name}</OptionTxt>
                  <OptionRadio value={font.value} name="font" onChange={fontChange} />
                </Option>
              );
            })}
          </OptionBox>
        </SelectBox>
      ) : null}
    </Selectposition>
  );
};

/* 셀렉트 박스 디자인 영역 */

//공통
// 레이아웃
const TextFontBtn = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 1em;
  padding-right: 1em;
  width: 12em;
  height: 2.2em;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.styling ? props.theme.color.greenColor : props.theme.color.hoverColor)};
  font-size: ${(props) => props.theme.fontSize.font14};
  color: ${(props) => props.theme.color.blackColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  transition: all 0.2s ease;
  ${(props) => props.theme.textOneLine};
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
const Selectposition = styled.div`
  position: relative;
  display: flex;
`;

const SelectBox = styled.div`
  position: absolute;
  top: 2.3em;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 13em;
  height: 15em;
  overflow: hidden;
  @media (max-width: 900px) {
    /* width: 280px;
    height: auto;
    max-height: 300px; */
  }
`;
const OptionBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 18em;
  transition: all 0.2s ease;
  background: ${(props) => props.theme.color.backgroundColor};
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  overflow-x: scroll;
  overflow-x: hidden;
  border-radius: 8px;
  user-select: none;

  &::-webkit-scrollbar {
    display: block;
  }
  &::-webkit-scrollbar {
    width: 0.2em;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.hoverColor};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0.7em;
    background: ${(props) => props.theme.color.orangeColor};
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;
const OptionRadio = styled.input.attrs({
  type: 'radio',
})`
  display: none;
`;
const Option = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6em 0.2em;
  margin-bottom: 2px;
  width: 100%;

  background: ${(props) => props.theme.color.whiteColor};
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.color.semiOrangeColor};
  }
  cursor: pointer;
`;
const OptionTxt = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  font-family: ${(props) => props.font}, sans-serif;
  color: ${(props) => props.theme.color.blackColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  ${(props) => props.theme.textOneLine};
`;
