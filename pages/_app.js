import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { GlobalStyles } from '../styles/GlobalStyles';
import Header from '@component/header/Header';
import ScrollTop from '@utils/ScrollTop';
import '../styles/App.css';
import { InteractTab } from '@utils/Push__Interaction';

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

export default MyApp;
