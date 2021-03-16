import { useState, useEffect } from 'react';
import useAxiosFetch from '@hooks/useAxiosFetch';
import validate from '@hooks/validateSignUp';

const useForm = ({ initialValues }) => {
  const [loginLoding, loginApi, loginError, loginFetch] = useAxiosFetch();
  const [signUpLoding, signUpApi, signUpError, signUpFetch] = useAxiosFetch();

  const [values, setValues] = useState(initialValues);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [resData, setResData] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    setDisabled(true);
    if (loginLoding || signUpLoding) return;
    e.preventDefault();

    if (values.userNick) {
      if (values.userNick === '' || values.userNick.length === 1) {
        setDisabled(false);
      }
    }

    if (values.type === 'signUp') {
      signUpFetch(`${process.env.API_URL}/auth/join`, 'post', values, null);
    } else if (values.type === 'signIn') {
      loginFetch(`${process.env.API_URL}/auth/login`, 'post', values, null);
    }
    setDisabled(false);
  };

  useEffect(() => {
    signUpApi && setResData(signUpApi);
  }, [signUpApi]);

  useEffect(() => {
    loginApi && setResData(loginApi);
  }, [loginApi]);

  useEffect(() => {
    signUpError && setErrors(validate({ values }, signUpError?.data));

    if (loginError?.status === 404) {
      setErrors('leave');
    } else if (loginError?.status === 400) {
      setErrors('incorrect');
    } else {
      return;
    }
  }, [loginError, signUpError]);
  return [values, handleChange, handleSubmit, disabled, resData, errors];
};

export default useForm;
