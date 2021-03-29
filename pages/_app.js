import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { GlobalStyles } from '../styles/GlobalStyles';
import Header from '@component/header/Header';
import '../styles/App.css';
import { InteractTab } from '@utils/Push__Interaction';
import Helmet from 'react-helmet';
import { useRouter } from 'next/router';
import { appWithTranslation } from "next-i18next";

// hooks & reducer
import { ContextStore } from '@store/App_Store';
// Router.events.on('routeChangeStart', (url) => console.log(url));
// Router.events.on('routeChangeComplete', () => console.log('routeChangeComplete'));
// Router.events.on('routeChangeError', () => console.log('routeChangeError'));

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ContextStore>
        {!router.asPath.match('/epicadmin/') && <Helmet />}
        {!router.asPath.match('/epicadmin/') && <Header />}
        <Component {...pageProps} />
        <InteractTab />
      </ContextStore>
    </ThemeProvider>
  );
}

// MyApp.getInitialProps = async (appContext) => {
//   const { ctx, Component } = appContext;
//   const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
//   let pageProps = {};
//   const appProps = await App.getInitialProps(appContext)
//   if (ctx.isServer && cookie) {
//     // 서버 환경일 때만 쿠키를 심어줌. 클라이언트 환경일 때는 브라우저가 자동으로 쿠키를 넣어줌
//     Axios.defaults.headers.Cookie = cookie;
//     // defaluts: 모든 axios 요청 시에 쿠키 데이터를 심어줌.
//   }

// if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   return { ...appProps }
// }

export default appWithTranslation(MyApp);
