import React, { useState } from 'react';
import axios from 'axios';

export const ToggleSubmit = () => {
  const [outsideData, setOutsideData] = useState(null);
  const [toggleMethod, setToggleMethod] = useState(null);
  const [getData, setGetData] = useState(0);
  const [error, setError] = useState(false);

  const submit = (e, url, loginOn = false) => {
    e.preventDefault();
    if (!loginOn) return;
    axios({
      url: url,
      method: toggleMethod,
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
      data: outsideData,
    })
      .then((res) => {
        setGetData(res.data.data);
      })
      .catch((err) => {
        if (!err) return;
        err?.response?.status === 401 && setError(err.response);
      });
  };

  return [getData, setOutsideData, setToggleMethod, submit, error];
};
