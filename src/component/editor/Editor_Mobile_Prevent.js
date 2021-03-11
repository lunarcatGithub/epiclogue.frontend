import React, { useContext } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// 컴포넌트 import
import { EditorCommon, EditorPopup } from '@language/Lang.Editor';

// hooks & reducer
import { LanguageContext } from '@store/App_Store';

export const EditorMobilePrevent = () => {
  const router = useRouter();
  const { langState } = useContext(LanguageContext);
  const { selectedLanguage, defaultLanguage } = langState;
  const { goBackBtn } = EditorCommon;
  const { popupTitle } = EditorPopup;
  const _goBackBtn = goBackBtn[selectedLanguage] || goBackBtn[defaultLanguage],
    _popupTitle = popupTitle[selectedLanguage] || popupTitle[defaultLanguage];

  return (
    <LayoutModal>
      <MobileLayout>
        <MobileLayoutInner>
          <TitleText>🚧{_popupTitle}😥</TitleText>
          <GobackBtnWrap>
            <GobackBtn onClick={() => router.back()}>{_goBackBtn}</GobackBtn>
          </GobackBtnWrap>
        </MobileLayoutInner>
      </MobileLayout>
    </LayoutModal>
  );
};

const LayoutModal = styled.div`
  display: none;
  @media (max-width: 900px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999999;
    background: #9999;
  }
`;
const MobileLayout = styled.div`
  display: flex;
  width: 30em;
  height: auto;
  margin: 0 0.6em;
  border-radius: 0.4em;
  background: #fff;
`;

const MobileLayoutInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5em 1em;
`;

const TitleText = styled.span`
  line-height: 1.5em;
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font16};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  margin-top: 1em;
`;

const GobackBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1em;
`;
const GobackBtn = styled.button`
  color: ${(props) => props.theme.color.whiteColor};
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  padding: 0.4em 0.6em;
  border-radius: 0.3em;
  background: ${(props) => props.theme.color.pinkColor};
  margin-right: 1em;
`;
