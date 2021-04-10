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

export default appWithTranslation(MyApp);
