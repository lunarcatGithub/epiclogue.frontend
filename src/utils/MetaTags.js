import React from 'react';
import { Helmet } from 'react-helmet';

let filter = 'win16|win32|win64|mac';
let isMobile = false;
let navi = typeof window !== 'undefined' && navigator.language;
if (navi.platform) {
  isMobile = filter.indexOf(navi.platform.toLowerCase()) < 0;
}

const locales = {
  en: 'en',
  ko: 'ko',
  ja: 'ja',
};

export const Meta = ({ meta }) => {
  const lang = locales[navi] || locales['en'];
  const title = meta.title;
  const description = meta.description || undefined;
  const image = meta.image || undefined || undefined;
  const canonical = meta.canonical;
  const type = isMobile ? 'mobile' : 'website';
  const width = (meta.image && (meta.width || 1200)) || undefined;
  const height = (meta.image && (meta.height || 627)) || undefined;

  // const imgTag = image?.map((img, i) => <link rel="image_src" href={img} key={`imagesrc${i}`} /> )
  // const imageProps = image?.map((img, i) => <meta itemProp="image" content={img} key={`imageProps${i}`} /> )
  // const ogimg = image?.map((img, i) => <meta property="og:image" content={img} key={`ogimg${i}`}/> )
  const _tagImges = image?.map((img, i)=> [
  <link rel="image_src" href={img} key={`imagesrc${i}`} />, 
  <meta itemProp="image" content={img} key={`imageProps${i}`} />,
  <meta property="og:image" content={img} key={`ogimg${i}`}/>,
  <meta name="twitter:image" content={img} key={`twitterimg${i}`} />
])


  return (
    <Helmet titleTemplate="%s">
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`https://www.epiclogue.com/${canonical}`} />
      {_tagImges}
      <meta property="og:site_name" content="Epic_Logue!" key="ogsitename" />
      <meta property="og:title" content={title} key="ogtitle"/>
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:url" content={`https://www.epiclogue.com/${canonical}`} key="ogurl" />
      <meta property="og:locale" content={locales[lang]} key="oglocale" />
      <meta property="og:type" content={type} key="ogtype"/>
      <meta property="og:image:width" content={width} />
      <meta property="og:image:height" content={height} />
      <meta property="fb:pages" content="Epic_Logue!" />
      {/* change type of twitter if there is no image? */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="Epic_Logue!" />
      <link rel="alternate" href={`https://www.epiclogue.com/${canonical}`} hrefLang={lang} />
      <link rel="manifest" href="/static/manifest.json" />
      <link rel="shortcut icon" href="/static/favicon_128.ico" />
    </Helmet>
  );
};

{/* <Helmet titleTemplate="%s">
<html lang={lang} />
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={`https://www.epiclogue.com/${canonical}`} />
<link rel="image_src" href={image} />
<meta itemProp="image" content={image} />
<meta property="og:site_name" content="Epic_Logue!" key="ogsitename" />
<meta property="og:title" content={title} key="ogtitle"/>
<meta property="og:description" content={description} key="ogdesc" />
<meta property="og:url" content={`https://www.epiclogue.com/${canonical}`} key="ogurl" />
<meta property="og:locale" content={locales[lang]} key="oglocale" />
<meta property="og:type" content={type} key="ogtype"/>
<meta property="og:image" content={image} key="ogimg"/>
<meta property="og:image:width" content={width} />
<meta property="og:image:height" content={height} />
<meta property="fb:pages" content="Epic_Logue!" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={image} />
<meta name="twitter:site" content="Epic_Logue!" />
<link rel="alternate" href={`https://www.epiclogue.com/${canonical}`} hrefLang={lang} />
<link rel="manifest" href="/static/manifest.json" />
<link rel="shortcut icon" href="/static/favicon_128.ico" />
</Helmet> */}
