import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { uploadContext } from './UploadCategory';
import UploadLanguage from './Upload.Language';

export default function OriginUserSource() {
  const { sourceToggleOn, setSourceToggleOn, setSourceHref, sourceHref } = useContext(uploadContext);
  const inputRef = useRef(null);
  
  // 언어 변수
  const {
    _externalSource,
    _uploadPermission,
  } = UploadLanguage();

  useEffect(() => {
    inputRef?.current?.focus();
  }, [sourceToggleOn]);

  return (
    <Layout>
      <LayoutInner>
        <ToggleTitle>{_externalSource}</ToggleTitle>
        <Toggle styling={sourceToggleOn} onClick={() => setSourceToggleOn(!sourceToggleOn)}>
          <ToggleTama styling={sourceToggleOn} />
        </Toggle>
        {!sourceToggleOn && <AlertText>{_uploadPermission}</AlertText>}
        {
          sourceToggleOn && 
            <SourceDataWrap>
              <SourceData placeholder={'https://'} ref={inputRef} defaultValue={sourceHref} onChange={(e) => setSourceHref(e.target.value)} />
            </SourceDataWrap> 
        }
      </LayoutInner>
    </Layout>
  );
}

/* 원작자 정보 */

//레이아웃
const Layout = styled.div`
  width: 100%;
  height: auto;
  background: ${(props) => props.theme.color.whiteColor};
  margin-bottom: 3px;
`;
const LayoutInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.7em 1em;
`;
// 타이틀
const ToggleTitle = styled.span`
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.blackColor};
  white-space: nowrap;
  margin-right: 0.4em;
`;

// 토글
const Toggle = styled.span`
  position: relative;
  align-items: center;
  width: 2em;
  border-radius: 25px;
  height: 1em;
  border: 1px solid ${(props) => (props.styling ? props.theme.color.orangeColor : props.theme.color.hoverColor)};
  transition: all 0.3s ease-in-out;
  margin-right: 0.6em;
`;
const ToggleTama = styled.span`
  position: absolute;
  top: 50%;
  ${(props) => (props.styling ? `right:0` : `left:0`)};
  transform: translateY(-50%);
  display: flex;
  width: 0.7em;
  height: 0.7em;
  margin: 0 1px;
  border-radius: 50%;
  background: ${(props) => (props.styling ? props.theme.color.softOrangeColor : props.theme.color.hoverColor)};
  transition: all 0.3s ease-in-out;
`;

// input data
const SourceDataWrap = styled.div`
  width: 100%;
  height: 2.5em;
  border-radius: 1.8em;
  overflow: hidden;
`;
// alert text
const AlertText = styled.span`
  font-size: ${(props) => props.theme.fontSize.font13};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.middlePinkColor};
`;

const SourceData = styled.input.attrs({
  type: 'text',
})`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.color.softGrayColor};
  padding: 0 1em;
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.darkGray};
  &::placeholder {
    color: ${(props) => props.theme.color.soSoGrayColor};
  }
`;
