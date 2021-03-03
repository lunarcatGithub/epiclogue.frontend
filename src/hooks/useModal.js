import { useState } from 'react';

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = (value) => {

    if (value === false) {
      setIsShowing(value);
    } else {
      setIsShowing(value ? value : !isShowing || !value ? !isShowing : '');
    }
  };
  console.log(isShowing)
  return [isShowing, toggle];
};
