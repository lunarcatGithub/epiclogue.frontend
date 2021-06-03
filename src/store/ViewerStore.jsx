import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from "next-i18next";


export const ViewerContext = React.createContext(null);

export default function ViewerStore({ children }) {
  const [ viewerData, setViewerData ] = useState(null);

  return (
    <ViewerContext.Provider 
    value={ {
      viewerData,
      setViewerData
    } } >
      { children }
    </ViewerContext.Provider>
  );
}

