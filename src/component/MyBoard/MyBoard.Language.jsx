import {useContext} from 'react';
import { LanguageContext } from '@store/App_Store';

import { LangMyBoard } from '@language/Lang.Myboard';
import { LangCommon } from '@language/Lang.Common';

export default function MyBoardLanguage(){
  const { langState } = useContext(LanguageContext);
  const { selectedLanguage, defaultLanguage } = langState;

  const { followBtn, followingBtn } = LangCommon;

  //myboard
  const { signDate, noIntro, allTabs, contentsTabs, bookMarkTabs, secondary } = LangMyBoard;
  const _signDate = signDate[selectedLanguage] || signDate[defaultLanguage],
        _noIntro = noIntro[selectedLanguage] || noIntro[defaultLanguage],
        _followingBtn = followingBtn[selectedLanguage] || followingBtn[defaultLanguage],
        _followBtn = followBtn[selectedLanguage] || followBtn[defaultLanguage],
        _allTabs = allTabs[selectedLanguage] || allTabs[defaultLanguage],
        _contentsTabs = contentsTabs[selectedLanguage] || contentsTabs[defaultLanguage],
        _bookMarkTabs = bookMarkTabs[selectedLanguage] || bookMarkTabs[defaultLanguage],
        _secondary = secondary[selectedLanguage] || secondary[defaultLanguage];
  
  const navTabArr = [
    { link: 'all', title: _allTabs },
    { link: 'originals', title: _contentsTabs },
    { link: 'secondaryWorks', title: _secondary },
    { link: 'bookmarks', title: _bookMarkTabs },
  ];

  return {
    //myboard
    navTabArr,
    _signDate,
    _noIntro,
    _followingBtn,
    _followBtn,
  }
}