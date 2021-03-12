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
MyApp.getInitialProps = async context => {
  const { ctx, Component } = context; // next에서 넣어주는 context
  let pageProps = {};
  if (Component.getInitialProps) { 
    // Component (pages 폴더에 있는 컴포넌트)에 getInitialProps가 있다면 return 값을 pageProps에 넣음.
    pageProps = await Component.getInitialProps(ctx); // ctx를 컴포넌트에 넘겨준다.
  }
  return { pageProps };
};
export default MyApp; 
