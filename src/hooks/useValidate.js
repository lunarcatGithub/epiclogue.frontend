import { useCallback, useState } from 'react';

export const useValidate = () => {
  const [error, setError] = useState({});

  let pattern1 = /[0-9]/; // 숫자
  let pattern2 = /[a-zA-Z]/; // 영문
  let pattern3 = /[~!@#$%^&*()_+|<>?:{}`]/; // 특수문자

  const setvalue = useCallback((value) => {
    const { userPwNew, userPwNewRe } = value;
    if (!pattern1.test(userPwNew || userPwNewRe) || !pattern2.test(userPwNew || userPwNewRe) || !pattern3.test(userPwNew || userPwNewRe) || userPwNew.length < 8) {
      setError({ userPw: 'errorPW' });
    } else {
      if (userPwNew !== userPwNewRe) {
        setError({ userRePw: 'errorRePW' });
      }
    }
  }, []);

  return [error, setvalue];
};
