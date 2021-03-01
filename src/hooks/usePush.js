import { useState } from 'react';

export const usePush = () => {
  const [isShowing, setIsShowing] = useState(false);

  const pushType = (type) => {
    if (type === 'error') {
        return ''
    } else {
    }
  };

  return [isShowing, setIsShowing, pushType];
};
