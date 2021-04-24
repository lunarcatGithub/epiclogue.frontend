import { useContext } from 'react';

import { LangCommon } from '@language/Lang.Common';
import { langViewer, langViewerUser } from '@language/Lang.Viewer';
import { LanguageContext } from '@store/App_Store';
import { langMymoreMenu, langUsermoreMenu } from '@language/Lang.Viewer';
import { langReactPopup } from '@language/Lang.Viewer';
import { langSharePopup } from '@language/Lang.Viewer';
import { langTranslatePopup } from '@language/Lang.Viewer';

export default function ViewerLanguage(){
      //언어 변수
    const { langState } = useContext(LanguageContext);

    const { selectedLanguage, defaultLanguage } = langState;

    const { contentsReact, feedbackScore, feedbackScoreEnd, feedbackPlaceholder, moreFeedback, firstFeedback, foldFeedback, moreContents, modified } = langViewer;

    const { originalUser, recreateUser, removedContents } = langViewerUser;

    const { followBtn, followingBtn, closeBtn } = LangCommon;
    const _contentsReact = contentsReact[selectedLanguage] || contentsReact[defaultLanguage],
        _feedbackScore = feedbackScore[selectedLanguage] || feedbackScore[defaultLanguage],
        _feedbackScoreEnd = feedbackScoreEnd[selectedLanguage] || feedbackScoreEnd[defaultLanguage],
        _feedbackPlaceholder = feedbackPlaceholder[selectedLanguage] || feedbackPlaceholder[defaultLanguage],
        _moreFeedback = moreFeedback[selectedLanguage] || moreFeedback[defaultLanguage],
        _firstFeedback = firstFeedback[selectedLanguage] || firstFeedback[defaultLanguage],
        _foldFeedback = foldFeedback[selectedLanguage] || foldFeedback[defaultLanguage],
        _moreContents = moreContents[selectedLanguage] || moreContents[defaultLanguage],
        _originalUser = originalUser[selectedLanguage] || originalUser[defaultLanguage],
        _recreateUser = recreateUser[selectedLanguage] || recreateUser[defaultLanguage],
        _removedContents = removedContents[selectedLanguage] || removedContents[defaultLanguage],
        _followBtn = followBtn[selectedLanguage] || followBtn[defaultLanguage],
        _followingBtn = followingBtn[selectedLanguage] || followingBtn[defaultLanguage],
        _modified = modified[selectedLanguage] || modified[defaultLanguage],
        _closeBtn = closeBtn[selectedLanguage] || closeBtn[defaultLanguage];
    // More menu popup
    const { myOptions, modifyContent, deleteContent } = langMymoreMenu;
    const { userOptions, sendDm, reportUser, muteUser } = langUsermoreMenu;
  
    const _myOptions = myOptions[selectedLanguage] || myOptions[defaultLanguage],
        _modifyContent = modifyContent[selectedLanguage] || modifyContent[defaultLanguage],
        _deleteContent = deleteContent[selectedLanguage] || deleteContent[defaultLanguage],
        _userOptions = userOptions[selectedLanguage] || userOptions[defaultLanguage],
        _reportUser = reportUser[selectedLanguage] || reportUser[defaultLanguage];
    
    // 반응 팝업
    const { reactTxt, reactShare, reactLike, reactBookmark, reactFeedback, noReact } = langReactPopup;
    const _reactTxt = reactTxt[selectedLanguage] || reactTxt[defaultLanguage],
        _reactShare = reactShare[selectedLanguage] || reactShare[defaultLanguage],
        _reactLike = reactLike[selectedLanguage] || reactLike[defaultLanguage],
        _reactBookmark = reactBookmark[selectedLanguage] || reactBookmark[defaultLanguage],
        _reactFeedback = reactFeedback[selectedLanguage] || reactFeedback[defaultLanguage],
        _noReact = noReact[selectedLanguage] || noReact[defaultLanguage];
    
    // 공유 팝업
    // const { hareText, linkShare } = langSharePopup;
    // const _hareText = hareText[selectedLanguage] || hareText[defaultLanguage],
    //     _linkShare = linkShare[selectedLanguage] || linkShare[defaultLanguage];
    
    // 번역하기 팝업
    const { secondaryOpt, useEditor, selfUpload } = langTranslatePopup;
    const _secondaryOpt = secondaryOpt[selectedLanguage] || secondaryOpt[defaultLanguage],
        _useEditor = useEditor[selectedLanguage] || useEditor[defaultLanguage],
        _selfUpload = selfUpload[selectedLanguage] || selfUpload[defaultLanguage];        return {
        
        // 뷰어 body
        _contentsReact,
        _feedbackScore,
        _feedbackScoreEnd,
        _feedbackPlaceholder,
        _moreFeedback,
        _firstFeedback,
        _foldFeedback,
        _moreContents,
        _originalUser,
        _recreateUser,
        _removedContents,
        _followBtn,
        _followingBtn,
        _modified,
        _closeBtn,
        _myOptions,

        // More menu popup
        _modifyContent,
        _deleteContent,
        _userOptions,
        _reportUser,

        // 반응 팝업
        _reactTxt,
        _reactShare,
        _reactLike,
        _reactBookmark,
        _reactFeedback,
        _noReact,

        // 공유 팝업
        // _hareText,
        // _linkShare,
        
        // 번역하기 팝업
        _secondaryOpt,
        _useEditor,
        _selfUpload
    }
}