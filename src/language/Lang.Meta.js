
let userBrowserLang,
    devidedLang;

const devideLang = (() => {
    userBrowserLang = typeof window !== 'undefined' && navigator.language
    if(userBrowserLang === 'ko' || 'ko-KR' || 'ko-kr' ){
      devidedLang = 0
    } else if(userBrowserLang === 'ja' || 'ja-JA' || 'ja-ja'){
      devidedLang = 1
    }else if(userBrowserLang === 'en' || 'en-US' || 'en-us'){
      devidedLang = 2
    }
  })()

function langMetaCommon() {

    let commonTitle;

    switch (devidedLang) {
        case 0:
            commonTitle = '에픽로그-'
            break;

        case 1:
            commonTitle = 'エピックログ-'
             break;

        default:
            commonTitle = 'EpicLogue-'
            break;
    }
    return commonTitle;
}

export function langMetaMain() {
   const commonTitle = langMetaCommon();

    let metaMainTitle,
    metaMainDesc;


    switch (devidedLang) {
        case 0:
            metaMainTitle = `${commonTitle}메인`
            metaMainDesc = '실시간 유저 참여 만화 번역 SNS! 집단 지성 만화 번역의 공간에 여러분들을 초대합니다'
            break;

        case 1:
            metaMainTitle = `${commonTitle}メーン`
            metaMainDesc = 'リアルタイムユーザー参加漫画の翻訳 SNS! 集団知性漫画翻訳の空間に皆様をご招待します'
             break;

        default:
            metaMainTitle = `${commonTitle}Main`
            metaMainDesc = 'Translate real-time user-participating cartoons Social Media! We invite you to a place where you translate comics with collective intelligence!'
            break;
    }
    return [
        metaMainTitle,
        metaMainDesc
    ];
}

export function langMetaBoard() {
 
     let metaBoardTitle;
 
 
     switch (devidedLang) {
         case 0:
            metaBoardTitle = `님의 공간 || 에픽로그`
             break;
 
         case 1:
            metaBoardTitle = `さんの空間 || エピックログ
             `
              break;
 
         default:
            metaBoardTitle = `'s space || Epic_Logue`
             break;
     }
     return metaBoardTitle;
 }

 export function langMetaViewer() {
 
    let metaViewerTitle;


    switch (devidedLang) {
        case 0:
            metaViewerTitle = `님의 작품 || `

            break;

        case 1:
            metaViewerTitle = `さんの作品 || `
             break;

        default:
            metaViewerTitle = `'s work || `
            break;
    }
    return metaViewerTitle;
}

export function langMetaMypage() {
 
    let metaMypageTitle;
    const commonTitle = langMetaCommon();

    switch (devidedLang) {
        case 0:
            metaMypageTitle = `${commonTitle}마이페이지`
            break;

        case 1:
            metaMypageTitle = `${commonTitle}マイページ`
             break;

        default:
            metaMypageTitle = `'${commonTitle}My Page`
            break;
    }
    return metaMypageTitle;
}