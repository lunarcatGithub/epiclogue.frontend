import { useContext } from 'react';
import { LanguageContext } from '@store/App_Store';
import { LangFeedbackMain } from '@language/Lang.Common';
import { LangHeader, LangHeaderProfile, LangHeaderInform } from '@language/Lang.Header';

export default function HeaderLanguage(){
  const { langState } = useContext(LanguageContext);
  const { selectedLanguage, defaultLanguage } = langState;

  // header
  const { followsButton, searchPlaceholder } = LangHeader;
  const { fbBtn } = LangFeedbackMain;

  const _followsButton = followsButton[selectedLanguage] || followsButton[defaultLanguage],
        _searchPlaceholder = searchPlaceholder[selectedLanguage] || searchPlaceholder[defaultLanguage],
        _fbBtn = fbBtn[selectedLanguage] || fbBtn[defaultLanguage];

  // header profile
  const { profileSet, goToBookMark, policyInform, changeAccount, logOutTab, sessionExpire } = LangHeaderProfile;
  const _profileSet = profileSet[selectedLanguage] || profileSet[defaultLanguage],
        _goToBookMark = goToBookMark[selectedLanguage] || goToBookMark[defaultLanguage],
        _policyInform = policyInform[selectedLanguage] || policyInform[defaultLanguage],
        _changeAccount = changeAccount[selectedLanguage] || changeAccount[defaultLanguage],
        _logOutTab = logOutTab[selectedLanguage] || logOutTab[defaultLanguage],
        _sessionExpire = sessionExpire[selectedLanguage] || sessionExpire[defaultLanguage];
  
  // header inform
  const { headerInfrom, userReactLike, userFeedback, userSecondary, userBookmark, userFollowMe, userReply, dataRemove, feedbackRemove } = LangHeaderInform;

  const _headerInfrom = headerInfrom[selectedLanguage] || headerInfrom[defaultLanguage],
        _userReactLike = userReactLike[selectedLanguage] || userReactLike[defaultLanguage],
        _userFeedback = userFeedback[selectedLanguage] || userFeedback[defaultLanguage],
        _userSecondary = userSecondary[selectedLanguage] || userSecondary[defaultLanguage],
        _userBookmark = userBookmark[selectedLanguage] || userBookmark[defaultLanguage],
        _userFollowMe = userFollowMe[selectedLanguage] || userFollowMe[defaultLanguage],
        _userReply = userReply[selectedLanguage] || userReply[defaultLanguage],
        _dataRemove = dataRemove[selectedLanguage] || dataRemove[defaultLanguage],
        _feedbackRemove = feedbackRemove[selectedLanguage] || feedbackRemove[defaultLanguage];

return {
// header
  _followsButton,
  _searchPlaceholder,
  _fbBtn,
//header profile
  _profileSet,
  _goToBookMark,
  _policyInform,
  _changeAccount,
  _logOutTab,
  _sessionExpire,
// header inform
  _headerInfrom,
  _userReactLike,
  _userFeedback,
  _userSecondary,
  _userBookmark,
  _userFollowMe,
  _userReply,
  _dataRemove,
  _feedbackRemove,

}
}