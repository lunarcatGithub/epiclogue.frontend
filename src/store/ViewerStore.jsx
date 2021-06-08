import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from "next-i18next";


export const ViewerContext = React.createContext(null);

export default function ViewerStore({ children }) {
  const [ viewerData, setViewerData ] = useState(null);

  // user popup ctrl
  const [ userPopup, setUserPopup ] = useState(false);
  const [ typeMenuPopup, setTypeMenuPopup ] = useState(null);
  const [ popupType, setPopupType ] = useState('');

  // target data
  const [ targetBoardUid, setTargetBoardUid ] = useState();

  // feedback list
  const [ feedbackRenderList, setFeedbackRenderList ] = useState([]);

  // feedback popup Ctrl
  const [ feedbackModalCtrl, setFeedbackModalCtrl ] = useState(false);
  const [ feedbackPopupType, setFeedbackPopupType ] = useState('');

  useEffect(() => {
    if(!userPopup) setTypeMenuPopup(null)
  }, [userPopup]);

  return (
    <ViewerContext.Provider 
    value={ {
      viewerData,
      setViewerData,
      // popup
      userPopup,
      setUserPopup,
      typeMenuPopup,
      setTypeMenuPopup,
      popupType,
      setPopupType,
      targetBoardUid,
      setTargetBoardUid,
      // feedback
      feedbackRenderList,
      setFeedbackRenderList,
      feedbackModalCtrl,
      setFeedbackModalCtrl,
      feedbackPopupType,
      setFeedbackPopupType
    } } >
      { children }
    </ViewerContext.Provider>
  );
}

