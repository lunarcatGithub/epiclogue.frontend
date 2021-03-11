import { useState } from 'react';

export function useDate() {
  const [getDate, setGetDate] = useState();
  const [countryDivided, setCountryDivided] = useState();

  const signUpdate = new Date(getDate);
  let year = signUpdate.getFullYear();
  let month = signUpdate.getMonth() + 1;
  let day = signUpdate.getDate();

  let countryResult;

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  if (countryDivided === 2) {
    countryResult = `${month}-${day}-${year}`;
  } else {
    countryResult = `${year}-${month}-${day}`;
  }

  return [setGetDate, setCountryDivided, countryResult];
}
