import React,{ useState, useEffect, useReducer, createContext, useLayoutEffect } from 'react';
import { languageReducer, langInit } from '@reducer/LanguageReducer';
import { useRouter } from 'next/router';
import { initialAlert, alertReducer } from '@reducer/AlertReducer';
import { initialArr, availableLang } from '@reducer/availableLanguage';

// 컴포넌트 import
import UnauthLogin from '@utils/UnauthLogin';

// Utils
import Modal from '@utils/Modal';

// hooks
import { useUrlMove } from '@hooks/useUrlMove';
import { useCookie } from '@hooks/useCookie';

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
  // router
  const router = useRouter();

  // app all method
  const [goURL] = useUrlMove();
  const [langState, langPatch] = useReducer(combineReducers(languageReducer), langInit);
  const [alertState, alertPatch] = useReducer(combineReducers(alertReducer), initialAlert);
  const [availableLanguage, availableLangPatch] = useReducer(combineReducers(availableLang), initialArr);

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
  // let login = typeof window !== 'undefined' && localStorage.getItem('loginOn');
  const [unAuth, setUnAuth] = useState(false);
  const [cookieValue, cookieHandle] = useCookie();
  const [getTestCookie, getTestHandle] = useCookie();
  const [loginOn, setLoginOn] = useState(false);

  // 개발 & 프로덕션 로그인 분기처리
  const devProductionHandle = () => {
      getTestHandle('GET', 'dev')
      cookieHandle('GET', 'access_token');
      if(cookieValue?.length > 1 || getTestCookie?.length > 1) { // 쿠키값이 있다면 로그인 상태로 반환
        setLoginOn(true)
      }
    }

  useLayoutEffect(() => {
    devProductionHandle()
  }, [getTestCookie?.length, cookieValue?.length])

  useEffect(() => {
    if (getTestCookie?.length < 1 || cookieValue?.length < 1 && !loginOn) {
      if (router.pathname.match('/upload') || router.pathname.match('/follow') || router.pathname.match('/editor')) {
        goURL({ pathname: '/login' });
        return;
      } else {
        return;
      }
    } else {
      return;
    }
  }, [cookieValue?.length, getTestCookie?.length, loginOn]);

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
        value={{ langState, langPatch, availableLanguage, availableLangPatch }}
      >
        <AlertContext.Provider
          value={{ alertState, alertPatch, }}
        >
          {children}
          {
            unAuth && (
              <Modal visible={unAuth} maskClosable={unAuth} onClose={setUnAuth}>
                <UnauthLogin setUnAuth={setUnAuth} />
              </Modal> )
          }
        </AlertContext.Provider>
      </LanguageContext.Provider>
    </AppDataContext.Provider>
  );
};

export { AppDataContext, LanguageContext, AlertContext, ContextStore };
