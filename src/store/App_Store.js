import { useState, useEffect, useReducer, createContext } from "react";
import { languageReducer, langInit } from "@reducer/LanguageReducer";
import {useRouter} from 'next/router';
import { initialAlert, alertReducer } from '@reducer/AlertReducer';

// 컴포넌트 import
import UnauthLogin from '@utils/UnauthLogin';

// Utils
import Modal from '@utils/Modal';

// create context
const Context  = createContext({});
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
  const [langState, langPatch] = useReducer(combineReducers(languageReducer), langInit);
  const [alertState, alertPatch] = useReducer(combineReducers(alertReducer), initialAlert);

  const [clickedComic, setClickedComic] = useState(true);
  const [clickedIllust, setClickedIllust] = useState(true);
  const [searchData, setSearchData] = useState();
  const [paramsData, setParamsData] = useState();

  const [myboardData, setMyboardData] = useState([]);
  
  const [loginOn, setLoginOn] = useState();
  const [unAuth, setUnAuth] = useState(false);
  const location = useRouter();

  useEffect(() => {
    let login = localStorage.getItem('loginOn');
    setLoginOn(Boolean(login))
  }, []);

  useEffect(() => {
      if(!loginOn){
        if(
          location.pathname.match('/upload') ||
          location.pathname.match('/follow') ||
          location.pathname.match('/report') ||
          location.pathname.match('/editor')
        ){
          document.location.href = '/login';
            return;
          } else {
            return
          }
      } else {
        return
      }
    },[]);

  return (
      <AppDataContext.Provider value={{
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
        setParamsData
      }}>
        <LanguageContext.Provider value={{
          langState,
          langPatch
        }}>
          <AlertContext.Provider value={{
            alertState,
            alertPatch
            }}>
              {children}
              {
                unAuth && 
                <Modal 
                  visible={unAuth}
                  maskClosable={unAuth}
                  onClose={setUnAuth}
                ><UnauthLogin setUnAuth={setUnAuth}/>
              </Modal>            
              }
          </AlertContext.Provider>
        </LanguageContext.Provider>
      </AppDataContext.Provider>
    );
};

export { 
  AppDataContext, 
  LanguageContext,
  AlertContext,
  ContextStore 
};