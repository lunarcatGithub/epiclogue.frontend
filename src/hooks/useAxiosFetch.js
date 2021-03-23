import { useState } from 'react';
import axios from 'axios';

export default function useAxiosFetch() {
  const [loading, setLoding] = useState();
  const [result, setResult] = useState();
  const [error, setError] = useState();

  const submit = async (url, type, data = null, body = null, params = null) => {
    setLoding(true);

    await axios({
      url,
      method: type,
      withCredentials: true,
      crossDomain: true,
      data,
      body,
      params,
    })
      .then((res) => {
        // console.log(res)
        setResult(res?.data);
      })
      .catch((err) => {
        // console.log(err.response);
        setError(err.response);
      });
    setLoding(false);
  };

  return [loading, result, error, submit];
}
