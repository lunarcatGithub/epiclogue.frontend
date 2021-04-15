import { useState } from 'react';

export function useCookie() {
  const [cookieValue, setCookieValue] = useState();

  const cookieHandle = (type, name, value, exp) => {
    let date = new Date();
    let cookie;
    if (type === 'GET') {
      cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    } else if (type === 'DELETE') {
      cookie = document.cookie = name + '= ' + '; expires=' + -1 + '; path=/';
    } else if (type === 'CREATE') {
      date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    } else {
      return;
    }
    setCookieValue(cookie);
  };

  return [cookieValue, cookieHandle];
}
