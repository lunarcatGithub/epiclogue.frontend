// let userBrowserLang = navigator.language,
//     devidedLang;

// let selectLang = Number(localStorage.getItem('language')),
let selectLang = 0,
    defaultLang = typeof window !== 'undefined' && navigator.language,
    _defaultLang;

    switch (defaultLang) {
  case 'ko' || 'ko-KR' || 'ko-kr' :
    _defaultLang = 0
    break;
    case 'ja' || 'ja-JA' || 'ja-ja' :
      _defaultLang = 1
    break;

  default: _defaultLang = 2
    break;
}

export const langInit = {
    defaultLanguage: _defaultLang,
    selectedLanguage: selectLang
  }

  export function languageReducer(state, {type, payload}){
    
    switch (type) {
      case 'LANGUAGE_UPDATE': {
        return { ...state, selectedLanguage: payload };
      }
      default: return state;
    }
  }