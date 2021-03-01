import React from 'react';
import { Helmet } from 'react-helmet';
import Head from 'next/head';

// let filter = 'win16|win32|win64|mac';
// let isMobile = false;
// let navigator = window.navigator
// if (navigator.platform) {
//   isMobile = filter.indexOf(navigator.platform.toLowerCase()) < 0;
// }

// const locales = {
//     en: 'en',
//     ko: 'ko',
//     ja: 'ja',
//   };
//   const language = navigator.language;
  
  export const Meta = ({ meta }) => {
    const lang = meta.lang || 'ko';
    const title = meta.title;
    const description = meta.description || undefined;
    const image = meta.image || undefined || undefined;
    const canonical = meta.canonical;
    // const type = isMobile ? 'mobile' :'website';
    const width = meta.image && (meta.width || 1200) || undefined;
    const height = meta.image && (meta.height || 627) || undefined;

    return (
      <Helmet titleTemplate="%s">
        <html lang={lang} />
        <Head>
        <title>{title}</title>
        </Head>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://www.epiclogue.com/${canonical}`} />
        <link rel="image_src" href={image} />
        <meta itemprop="image" content={image} />
  
        <meta property="og:site_name" content="Epic_Logue!" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://www.epiclogue.com/${canonical}`} />
        {/* <meta property="og:locale" content={locales[lang]} /> */}
        {/* <meta property="og:type" content={type} /> */}
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content={width} />
        <meta property="og:image:height" content={height} />
        <meta property="fb:pages" content="Epic_Logue!" />
  
        {/* change type of twitter if there is no image? */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="Epic_Logue!" />
         <link rel="alternate" href={`https://www.epiclogue.com/${canonical}`} hreflang={lang} />
         
      </Helmet>
    );
  };
  