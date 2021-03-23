import { useState, useEffect, useReducer, createContext } from 'react';
import { useRouter } from 'next/router';

// create context
const AdminContext = createContext({});

// combine reducer function
const combineReducers = (...reducers) => (state, action) => {
  for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
  return state;
};

// context provider
const AdminContextStore = ({ children }) => {
    // initial Login
    const [adminAuth, setAdminAuth] = useState(false);
    // tab controls
    const [adminTab, setAdminTab] = useState('DASHBOARD');
    // router
    const router = useRouter();

    return (
        <AdminContext.Provider
            value={{adminTab, setAdminTab}}
        >
            {children}

        </AdminContext.Provider>
    );
};

export { AdminContext, AdminContextStore };
