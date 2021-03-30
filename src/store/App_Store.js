import { useState, useEffect, useReducer, createContext } from 'react';
import { languageReducer, langInit } from '@reducer/LanguageReducer';
import { useRouter } from 'next/router';
import { initialAlert, alertReducer } from '@reducer/AlertReducer';

// 컴포넌트 import
import UnauthLogin from '@utils/UnauthLogin';

// Utils
import Modal from '@utils/Modal';
// hooks
import { useUrlMove } from '@hooks/useUrlMove';

// create context
const AppDataContext = createContext({});
const LanguageContext = createContext({});
const AlertContext = createContext({});

// combine reducer function
const combineReducers = (...reducers) => (state, action) => {
  for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
  return state;
};

// context provider
const ContextStore = ({ children }) => {
  // app all method
  const [goURL] = useUrlMove();
  const [langState, langPatch] = useReducer(combineReducers(languageReducer), langInit);
  const [alertState, alertPatch] = useReducer(combineReducers(alertReducer), initialAlert);

  // set filter
  const [clickedComic, setClickedComic] = useState(true);
  const [clickedIllust, setClickedIllust] = useState(true);

  // get Data
  const [searchData, setSearchData] = useState();
  const [paramsData, setParamsData] = useState();
  const [myboardData, setMyboardData] = useState([]);
  const [followData, setFollowData] = useState();
  const [followButton, setFollowButton] = useState();

  // initial Login
  let login = typeof window !== 'undefined' && localStorage.getItem('loginOn');
  const [loginOn, setLoginOn] = useState(Boolean(login));
  const [unAuth, setUnAuth] = useState(false);

  // router
  const router = useRouter();

  useEffect(() => {
    if (!loginOn) {
      if (router.pathname.match('/upload') || router.pathname.match('/follow') || router.pathname.match('/editor')) {
        goURL({ pathname: '/login' });
        return;
      } else {
        return;
      }
    } else {
      return;
    }
  }, [router.pathname]);

  return (
    <AppDataContext.Provider
      value={{
        searchData,
        setSearchData,
        clickedComic,
        setClickedComic,
        clickedIllust,
        setClickedIllust,
        myboardData,
        setMyboardData,
        setLoginOn,
        loginOn,
        setUnAuth,
        paramsData,
        setParamsData,
        followData,
        setFollowData,
        followButton,
        setFollowButton,
      }}
    >
      <LanguageContext.Provider
        value={{
          langState,
          langPatch,
        }}
      >
        <AlertContext.Provider
          value={{
            alertState,
            alertPatch,
          }}
        >
          {children}
          {unAuth && (
            <Modal visible={unAuth} maskClosable={unAuth} onClose={setUnAuth}>
              <UnauthLogin setUnAuth={setUnAuth} />
            </Modal>
          )}
        </AlertContext.Provider>
      </LanguageContext.Provider>
    </AppDataContext.Provider>
  );
};

export { AppDataContext, LanguageContext, AlertContext, ContextStore };
