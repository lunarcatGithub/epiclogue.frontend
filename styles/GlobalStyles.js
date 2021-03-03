import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

let fontStyling,
userBrowserLang = typeof window !== 'undefined' && navigator.language

switch (userBrowserLang) {
  case 'ko' || 'ko-KR' || 'ko-kr' :
    fontStyling = `font-family:-apple-system, 'Noto Sans KR', sans-serif;`
    break;
    case 'ja' || 'ja-JA' || 'ja-ja' :
      fontStyling = `font-family:-apple-system, 'Noto Sans JP', sans-serif;`
    break;

  default: fontStyling = `font-family:-apple-system, sans-serif;`

    break;
}

export const GlobalStyles = createGlobalStyle `

${reset}
    *{
      margin: auto 0;
      padding:0;
      box-sizing:border-box;
      
    }
    a{
      margin:0;
      padding:0;
      font-size:100%;
      vertical-align:baseline;
      background:transparent;
      text-decoration: none;
      color: #222;
      
    }
    after, before {
      box-sizing:content-box;
    }
    html {
      overflow-y:scroll;
    }
   body{
      background:#F5F5F6;
      /* font-family:-apple-system, 'Noto Sans KR', 'Noto Sans JP', 'Roboto', sans-serif; */
      ${fontStyling}
      font-size: 15px;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-tap-highlight-color: transparent;
    }

    select, input, button,textarea, img  {
      vertical-align:middle;
      border-style: none;
        background: none;
        outline: none;
        font-family: 'Noto Sans KR', sans-serif !important;
        font-family: 'Noto Sans JP', sans-serif;
        font-family: 'Roboto', sans-serif;

    }
`;

export default GlobalStyles;
