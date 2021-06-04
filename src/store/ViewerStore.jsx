import React, { useState, useEffect, useContext, useRef } from 'react';
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
      setTargetBoardUid
    } } >
      { children }
    </ViewerContext.Provider>
  );
}

