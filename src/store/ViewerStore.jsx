import React, { useState, useEffect } from 'react';

export const ViewerContext = React.createContext(null);

export default function ViewerStore({ children }) {
  const [ viewerData, setViewerData ] = useState([]);

  // user popup ctrl
  const [ userPopup, setUserPopup ] = useState(false);
  const [ typeMenuPopup, setTypeMenuPopup ] = useState(null);
  const [ popupType, setPopupType ] = useState('');

  // target data
  const [ targetBoardUid, setTargetBoardUid ] = useState();
  const [ targetUser_Id, setTargetUser_Id ] = useState(''); // user 고유 id
  const [ targetUser_Type, setTargetUser_Type ] = useState(''); // 선택하는 더보기 팝업이 board, feedback, reply

  // feedback list
  const [ feedbackRenderList, setFeedbackRenderList ] = useState([]);

  // feedback popup Ctrl
  const [ feedbackModalCtrl, setFeedbackModalCtrl ] = useState(false);
  const [ feedbackPopupType, setFeedbackPopupType ] = useState('');

    // feedback modify
    const [ feedbackModifyMode, setFeedbackModifyMode ] = useState(false);
    const [ feedbackUid, setFeedbackUid ] = useState('');
    const [ modifiedFeedbackData, setModifiedFeedbackData ] = useState([]);

  useEffect(() => {
    if(!userPopup) setTypeMenuPopup(null)
    
  }, [userPopup]);

  return (
    <ViewerContext.Provider 
    value={ {
      viewerData,
      setViewerData,

      //target
      targetUser_Id,
      setTargetUser_Id,
      targetBoardUid,
      setTargetBoardUid,
      targetUser_Type,
      setTargetUser_Type,
      // popup
      userPopup,
      setUserPopup,
      typeMenuPopup,
      setTypeMenuPopup,
      popupType,
      setPopupType,

      // feedback
      feedbackRenderList,
      setFeedbackRenderList,
      feedbackModalCtrl,
      setFeedbackModalCtrl,
      feedbackPopupType,
      setFeedbackPopupType,

      // feedback modify
      feedbackModifyMode,
      setFeedbackModifyMode,
      feedbackUid,
      setFeedbackUid,
      modifiedFeedbackData,
      setModifiedFeedbackData
    } } >
      { children }
    </ViewerContext.Provider>
  );
}

