import { useContext, useEffect, useState } from 'react';

import { LangCommon } from '@language/Lang.Common';
import { langViewer, langViewerUser } from '@language/Lang.Viewer';
import { LanguageContext } from '@store/App_Store';
import { langMymoreMenu, langUsermoreMenu } from '@language/Lang.Viewer';
import { langReactPopup, langSharePopup } from '@language/Lang.Viewer';
import { langTranslatePopup } from '@language/Lang.Viewer';
import { LangConfirm } from '@language/Lang.Confirm';

export default function ViewerLanguage(){
    const [lang, setLang] = useState({});
      //언어 변수
    const { langState, langRender } = useContext(LanguageContext);

    const { selectedLanguage, defaultLanguage } = langState;

    const {
        contentsReact,
        feedbackScore,
        feedbackScoreEnd,
        feedbackPlaceholder,
        replyPlaceholder,
        moreFeedback,
        firstFeedback,
        foldFeedback,
        moreContents,
        modified
    } = langViewer;

    const { originalUser, recreateUser, removedContents } = langViewerUser;

    const { followBtn, followingBtn, closeBtn } = LangCommon;

    const { confirmTxt, cancleBtn } = LangConfirm;

    const $contentsReact = contentsReact[selectedLanguage] || contentsReact[defaultLanguage],
        $feedbackScore = feedbackScore[selectedLanguage] || feedbackScore[defaultLanguage],
        $feedbackScoreEnd = feedbackScoreEnd[selectedLanguage] || feedbackScoreEnd[defaultLanguage],
        $feedbackPlaceholder = feedbackPlaceholder[selectedLanguage] || feedbackPlaceholder[defaultLanguage],
        $replyPlaceholder = replyPlaceholder[selectedLanguage] || replyPlaceholder[defaultLanguage],
        $moreFeedback = moreFeedback[selectedLanguage] || moreFeedback[defaultLanguage],
        $firstFeedback = firstFeedback[selectedLanguage] || firstFeedback[defaultLanguage],
        $foldFeedback = foldFeedback[selectedLanguage] || foldFeedback[defaultLanguage],
        $moreContents = moreContents[selectedLanguage] || moreContents[defaultLanguage],
        $originalUser = originalUser[selectedLanguage] || originalUser[defaultLanguage],
        $recreateUser = recreateUser[selectedLanguage] || recreateUser[defaultLanguage],
        $removedContents = removedContents[selectedLanguage] || removedContents[defaultLanguage],
        $followBtn = followBtn[selectedLanguage] || followBtn[defaultLanguage],
        $followingBtn = followingBtn[selectedLanguage] || followingBtn[defaultLanguage],
        $modified = modified[selectedLanguage] || modified[defaultLanguage],
        $closeBtn = closeBtn[selectedLanguage] || closeBtn[defaultLanguage],
        $confirmTxt = confirmTxt[selectedLanguage] || confirmTxt[defaultLanguage],
        $cancleBtn = cancleBtn[selectedLanguage] || cancleBtn[defaultLanguage];
    
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
        _selfUpload = selfUpload[selectedLanguage] || selfUpload[defaultLanguage];        
        
        useEffect(() => {
            setLang({
                _contentsReact:$contentsReact,
                _feedbackScore:$feedbackScore,
                _feedbackScoreEnd:$feedbackScoreEnd,
                _feedbackPlaceholder:$feedbackPlaceholder,
                _replyPlaceholder:$replyPlaceholder,
                _moreFeedback:$moreFeedback,
                _firstFeedback:$firstFeedback,
                _foldFeedback:$foldFeedback,
                _moreContents:$moreContents,
                _originalUser:$originalUser,
                _recreateUser:$recreateUser,
                _removedContents:$removedContents,
                _followBtn:$followBtn,
                _followingBtn:$followingBtn,
                _modified:$modified,
                _closeBtn:$closeBtn,
                _confirmTxt:$confirmTxt,
                _cancleBtn:$cancleBtn
            })
        }, [langRender]);
        
        const { 
            _contentsReact,
            _feedbackScore,
            _feedbackScoreEnd,
            _feedbackPlaceholder,
            _replyPlaceholder,
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
            _confirmTxt,
            _cancleBtn } = lang
    return {
        // 뷰어 body
        _contentsReact,
        _feedbackScore,
        _feedbackScoreEnd,
        _feedbackPlaceholder,
        _replyPlaceholder,
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
        _selfUpload,

        // 피드백 수정
        _confirmTxt,
        _cancleBtn
    }
}