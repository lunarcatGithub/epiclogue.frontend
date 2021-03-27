let userBrowserLang, devidedLang;

const devideLang = (() => {
  userBrowserLang = typeof window !== 'undefined' && navigator.language;
  if (userBrowserLang === 'ko' || userBrowserLang === 'ko-KR' || userBrowserLang === 'ko-kr') {
    devidedLang = 0;
  } else if (userBrowserLang === 'ja' || userBrowserLang === 'ja-JA' || userBrowserLang === 'ja-ja') {
    devidedLang = 1;
  } else if (userBrowserLang === 'en' || userBrowserLang === 'en-US' || userBrowserLang === 'en-us') {
    devidedLang = 2;
  }
})();

function langMetaCommon() {
  let commonTitle;

  switch (devidedLang) {
    case 0:
      commonTitle = '에픽로그-';
      break;

    case 1:
      commonTitle = 'エピックログ-';
      break;

    default:
      commonTitle = 'EpicLogue-';
      break;
  }
  return commonTitle;
}

export function langMetaMain() {
  const commonTitle = langMetaCommon();

  let metaMainTitle, metaMainDesc;

  switch (devidedLang) {
    case 0:
      metaMainTitle = `${commonTitle}메인`;
      metaMainDesc = '실시간 유저 참여 만화 번역 SNS! 집단 지성 만화 번역의 공간에 여러분들을 초대합니다';
      break;

    case 1:
      metaMainTitle = `${commonTitle}メーン`;
      metaMainDesc = 'リアルタイムユーザー参加漫画の翻訳 SNS! 集団知性漫画翻訳の空間に皆様をご招待します';
      break;

    default:
      metaMainTitle = `${commonTitle}Main`;
      metaMainDesc = 'Translate real-time user-participating cartoons Social Media! We invite you to a place where you translate comics with collective intelligence!';
      break;
  }
  return [metaMainTitle, metaMainDesc];
}

export function langMetaBoard() {
  let metaBoardTitle, boardDescFirst, boardDescSecond;

  switch (devidedLang) {
    case 0:
      metaBoardTitle = `님의 공간 || 에픽로그`;
      boardDescFirst = `창작가`;
      boardDescSecond = `님의 작품을 감상해보세요!`;

      break;

    case 1:
      metaBoardTitle = `さんの空間 || エピックログ`;
      boardDescFirst = `創作家`;
      boardDescSecond = `の作品をご鑑賞ください!`;

      break;

    default:
      metaBoardTitle = `'s space || Epic_Logue`;
      boardDescFirst = `Enjoy the work of Artist`;
      boardDescSecond = `!`;

      break;
  }
  return { metaBoardTitle, boardDescFirst, boardDescSecond };
}

export function langMetaViewer() {
  let metaViewerTitle, boardDescFirst, boardDescSecond;

  switch (devidedLang) {
    case 0:
      metaViewerTitle = `님의 작품 || `;
      boardDescFirst = `창작가`;
      boardDescSecond = `님의 작품을 감상해보세요!`;

      break;

    case 1:
      metaViewerTitle = `さんの作品 || `;
      boardDescFirst = `創作家`;
      boardDescSecond = `の作品をご鑑賞ください!`;
      break;

    default:
      metaViewerTitle = `'s work || `;
      boardDescFirst = `Enjoy the work of Artist`;
      boardDescSecond = `!`;

      break;
  }
  return { metaViewerTitle, boardDescFirst, boardDescSecond };
}

export function langMetaMypage() {
  let metaMypageTitle;
  const commonTitle = langMetaCommon();

  switch (devidedLang) {
    case 0:
      metaMypageTitle = `${commonTitle}마이페이지`;
      break;

    case 1:
      metaMypageTitle = `${commonTitle}マイページ`;
      break;

    default:
      metaMypageTitle = `'${commonTitle}My Page`;
      break;
  }
  return metaMypageTitle;
}
