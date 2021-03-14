import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { GlobalStyles } from '../styles/GlobalStyles';
import Header from '@component/header/Header';
import '../styles/App.css';
import { InteractTab } from '@utils/Push__Interaction';
import Axios from 'axios';

// hooks & reducer
import { ContextStore } from '@store/App_Store';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ContextStore>
        <Header />
        {/* <ScrollTop/> */}
        <Component {...pageProps} />
        <InteractTab />
      </ContextStore>
    </ThemeProvider>
  );
}
MyApp.getInitialProps = async context => {

  const { ctx, Component } = context; // next에서 넣어주는 context
  let pageProps = {};
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  // SSR 환경일 때만 서버사이드에서 쿠키를 넣어주고, 클라이언트 환경일 때는 넣지 않음
  // 클라이언트 환경 - ctx.req.headers.cookie = undefined
  if (ctx.isServer && cookie) { 
    // 서버 환경일 때만 쿠키를 심어줌. 클라이언트 환경일 때는 브라우저가 자동으로 쿠키를 넣어줌
    Axios.defaults.headers.Cookie = cookie;
    // defaluts: 모든 axios 요청 시에 쿠키 데이터를 심어줌.
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};
export default MyApp; 
