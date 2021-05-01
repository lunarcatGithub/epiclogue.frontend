import { useContext } from 'react';
import { LanguageContext } from '@store/App_Store';

import { LangError } from '@language/Lang.Error';

export default function ErrorLanguage(){
  const { langState } = useContext(LanguageContext);
  const { selectedLanguage, defaultLanguage } = langState;
  
  // Not found page
  const { error404, clientErrorTitle, serverErrorTitle } = LangError;
  const _error404 = error404[selectedLanguage] || error404[defaultLanguage],
        _clientErrorTitle = clientErrorTitle[selectedLanguage] || clientErrorTitle[defaultLanguage],
        _serverErrorTitle = serverErrorTitle[selectedLanguage] || serverErrorTitle[defaultLanguage];
  return {
    // Not found page
    _error404,
    _clientErrorTitle,
    _serverErrorTitle
  }
}