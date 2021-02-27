
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import {GlobalStyles} from '../styles/GlobalStyles';
import Header from '@component/header/Header';
import {ContextStore} from '@store/App_Store';

//contenxt

function MyApp({ Component, pageProps }) {

  return (
  <ThemeProvider theme={theme}>
    <GlobalStyles/>
      <ContextStore>
        <Header/>
        <Component {...pageProps} />
      </ContextStore>
  </ThemeProvider>
  )
}

export default MyApp
