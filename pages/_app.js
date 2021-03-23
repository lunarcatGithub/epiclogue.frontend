import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { GlobalStyles } from '../styles/GlobalStyles';
import Header from '@component/header/Header';
import '../styles/App.css';
import { InteractTab } from '@utils/Push__Interaction';
import Helmet from 'react-helmet';
import {useRouter} from 'next/router';
import styled from "styled-components";
import GNB from '@Component/GNB/Gnb';
import { Nav } from '@Component/NAV/Nav';

// hooks & reducer
import { ContextStore } from '@store/App_Store';
import { AdminContextStore } from '@Component/Store/Admin_Context'
// Router.events.on('routeChangeStart', (url) => console.log(url));
// Router.events.on('routeChangeComplete', () => console.log('routeChangeComplete'));
// Router.events.on('routeChangeError', () => console.log('routeChangeError'));

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        {
          !router.pathname.match('/epicadmin/') ?
            <ContextStore>
              <Helmet/>
              <Header />
              <Component {...pageProps} />
              <InteractTab />
            </ContextStore>
          :
          <AdminContextStore>
            <Layout>
              <GNB/>
              <LayoutDivision>
                <Nav/>
                <LayoutInner>
                  <Component {...pageProps} />
                </LayoutInner>
            </LayoutDivision>
          </Layout> 
          </AdminContextStore>
        }

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


// 스타일 영역
// 공통
// 레이아웃
const Layout = styled.div`
display:flex;
flex-direction:column;
width:100%;
height:100%;
`
const LayoutDivision = styled.section`
display:flex;
width:100%;
`
const LayoutInner = styled.div`
display:flex;
flex-direction:column;
width:100%;
height:100%;
/* padding:30px; */
margin:0 1.5em;

@media (max-width:480px) {
    padding:8px;
    margin:0;

}
`

export default MyApp; 


