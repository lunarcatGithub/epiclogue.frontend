import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export const useUrlMove = () => {
  const history = useHistory();
  const _useUrlMove = useCallback((url) => history.push(url), [history]);
  return [_useUrlMove];
};
