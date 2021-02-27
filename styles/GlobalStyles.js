import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";


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