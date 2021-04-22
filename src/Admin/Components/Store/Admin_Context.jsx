import React, { createContext } from 'react';

// create context
const AdminContext = createContext({});

// combine reducer function
const combineReducers = (...reducers) => (state, action) => {
  for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
  return state;
};

// context provider
const AdminContextStore = ({ children }) => {
  const reportList = [
    { id: 0, title: '스팸성', value: 'spam'},
    { id: 1, title: '음란물', value: 'adult'},
    { id: 2, title: '혐오유발', value: 'disgust'},
    { id: 3, title: '폭력성', value: 'violent'},
    { id: 4, title: '거짓정보', value: 'lie'},
    { id: 5, title: '분쟁유발', value: 'dispute'},
    { id: 6, title: '불법 콘텐츠', value: 'illegality'},
    { id: 7, title: '저작권 분쟁', value: 'copyright'},
    { id: 8, title: '기타', value: 'etc'},
  ];
  
  return (
    <AdminContext.Provider
      value={{
        reportList
      }}
    >{children}

    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextStore };
