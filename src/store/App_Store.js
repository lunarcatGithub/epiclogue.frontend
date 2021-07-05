import React, { useState, useEffect, useReducer, createContext, useLayoutEffect } from 'react';
import { languageReducer, langInit } from '@reducer/LanguageReducer';
import { useRouter } from 'next/router';
import { initialAlert, alertReducer } from '@reducer/AlertReducer';
import { initialArr, availableLang } from '@reducer/AvailableLanguage';

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

React.useLayoutEffect = React.useEffect;

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
  const [lastContentId, setLastContentId] = useState(null);

  // get Data
  const [searchData, setSearchData] = useState();
  const [paramsData, setParamsData] = useState();
  const [myboardData, setMyboardData] = useState([]);
  const [followData, setFollowData] = useState();
  const [renderComponent, setRenderComponent] = useState([]);

  // content component
  const [renderList, setRenderList] = useState([]);
  const [page, setPage] = useState(0);

  // initial Login
  const [unAuth, setUnAuth] = useState(false);
  const [cookieValue, cookieHandle] = useCookie();

  // keep login
  const isLogin = typeof window !== 'undefined' && localStorage.getItem('keepLogin');
  const [loginOn, setLoginOn] = useState(JSON.parse(isLogin) || false);

  // current Path
  const [currentPath, setCurrentPath] = useState();
  // const [lengthStore, setLengthStore] = useState([]);
  // 개발 & 프로덕션 로그인 분기처리
  const devProductionHandle = () => {
    let divied = process.env.NODE_ENV;
  };

  useLayoutEffect(() => {
    devProductionHandle();
  }, [cookieValue?.length]);

  useEffect(() => {
    if (!loginOn) {
      if (router.pathname.match('/upload') || router.pathname.match('/follow') || router.pathname.match('/editor')) {
        alert('please SignIn!');
        goURL({ pathname: '/login' });
        return;
      }
    }
  }, [loginOn]);

  useEffect(() => {
    setCurrentPath(router?.query?.path);
  }, [router.query]);

  return (
    <AppDataContext.Provider
      value={{
        renderComponent,
        setRenderComponent,
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
        lastContentId,
        setLastContentId,
        renderList,
        setRenderList,
        page,
        setPage,
        currentPath,
      }}
    >
      <LanguageContext.Provider value={{ langState, langPatch, availableLanguage, availableLangPatch }}>
        <AlertContext.Provider value={{ alertState, alertPatch }}>
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
