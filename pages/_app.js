import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { GlobalStyles } from '../styles/GlobalStyles';
import Header from '@component/header/Header';
import '../styles/App.css';
import { InteractTab } from '@utils/Push__Interaction';
import Helmet from 'react-helmet';
import { useRouter } from 'next/router';
import { appWithTranslation } from "next-i18next";
import {AdminContextStore} from '../src/Admin/Components/Store/Admin_Context';

// hooks & reducer
import { ContextStore } from '@store/App_Store';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ContextStore>
        <AdminContextStore>
        {!router.asPath.match('/epicadmin/') && <Helmet />}
        {!router.asPath.match('/epicadmin/') && <Header />}
        <Component {...pageProps} />
        <InteractTab />
        </AdminContextStore>
      </ContextStore>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
