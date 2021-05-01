import { useContext } from 'react';
import { LanguageContext } from '@store/App_Store';
import { LangSearchResult, LangMain } from '@language/Lang.Main';

export default function ContentLanguage(){
  const { langState } = useContext(LanguageContext);

  // search result
  const { selectedLanguage, defaultLanguage } = langState;
  const { popularTab, latestTab, userTab } = LangSearchResult;
  const _popularTab = popularTab[selectedLanguage] || popularTab[defaultLanguage],
        _latestTab = latestTab[selectedLanguage] || latestTab[defaultLanguage],
        _userTab = userTab[selectedLanguage] || userTab[defaultLanguage];
  const navArr = [
    { data: 'trend', lang: _popularTab },
    { data: 'latest', lang: _latestTab },
    { data: 'users', lang: _userTab },
  ];

  // contents form
  const { originTxt, reCreateTxt } = LangMain;
  const _originTxt = originTxt[selectedLanguage] || originTxt[defaultLanguage],
        _reCreateTxt = reCreateTxt[selectedLanguage] || reCreateTxt[defaultLanguage];

  return {
    navArr,
    _originTxt,
    _reCreateTxt
  }
}
