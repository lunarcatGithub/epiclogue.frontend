import { useState } from 'react';

export const useToggle = (initialValue) => {
  const [state, setState] = useState(initialValue ? initialValue : false);

  const toggle = (data) => {
    setState(String(data) !== 'undefined' ? data : !state);
  };

  return [state, toggle];
};
