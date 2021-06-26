import { useState } from 'react';

export default function useFetchData() {
  const [loading, setLoding] = useState();
  const [result, setResult] = useState();
  const [error, setError] = useState();

  const fetchHandler = async (url, type, importData = null, importBody = null) => {
    setLoding(true);

    await fetch(url, {
      method: type,
      credentials: 'include',
      data: importData,
      body: importBody,
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res);
      })
      .catch((err) => {
        // console.log(err);
        setError(err);
      });
    setLoding(false);
  };

  return [loading, result, error, fetchHandler];
}

// const isLogin = localStorage.getItem('token');

// await fetch(url, {
// method: type,
// headers: isLogin ? {
//     'x-access-token': isLogin
// } : null,
// credentials: 'include',
// data:importData,
// body:importBody
// })
// .then((res) => res.json())
// .then( res => {
// console.log(res)
// setResult(res)
// })
// .catch( err => {
// console.log(err)
// setError(err)
// });
