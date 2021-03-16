import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { GlobalStyles } from '../styles/GlobalStyles';
import Header from '@component/header/Header';
import '../styles/App.css';
import { InteractTab } from '@utils/Push__Interaction';
import App from 'next/app';
import Helmet from 'react-helmet';
import Router from 'next/router';

// hooks & reducer
import { ContextStore } from '@store/App_Store';

Router.events.on('routeChangeStart', (url) => console.log(url));
Router.events.on('routeChangeComplete', () => console.log('routeChangeComplete'));
Router.events.on('routeChangeError', () => console.log('routeChangeError'));

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ContextStore>
        <Helmet/>
        <Header />
        {/* <ScrollTop/> */}
        <Component {...pageProps} />
        <InteractTab />
      </ContextStore>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  console.log('appContext', appContext.ctx.pathname)
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp; 
