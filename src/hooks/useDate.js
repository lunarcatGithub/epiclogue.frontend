import { useState } from 'react';

export function useDate(type) {
  const [getDate, setGetDate] = useState();
  const [countryDivided, setCountryDivided] = useState();

  const signUpdate = new Date(getDate);
  const year = signUpdate.getFullYear();
  let month = signUpdate.getMonth() + 1;
  let day = signUpdate.getDate();

  const hours = signUpdate.getHours();
  const minutes = signUpdate.getMinutes();

  let countryResult;

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  if (type === 'Admin') {
    // admin일 경우
    countryResult = `${year}-${month}-${day} [${hours}:${minutes}]`;
  } else {
    // 일반 콘텐츠
    if (countryDivided === 2) {
      countryResult = `${month}-${day}-${year}`;
    } else {
      countryResult = `${year}-${month}-${day}`;
    }
  }

  return [setGetDate, setCountryDivided, countryResult];
}
