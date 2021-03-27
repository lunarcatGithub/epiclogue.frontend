import { useState } from 'react';

export function useCookie() {
  const [cookieValue, setCookieValue] = useState();

  const cookieHandle = (type, name, value, exp) => {
    let date = new Date();
    if (type === 'GET') {
      const cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      setCookieValue(cookie);
    } else if (type === 'DELETE') {
      document.cookie = name + '= ' + '; expires=' + date.toUTCString() + '; path=/';
    } else if (type === 'CREATE') {
      date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    } else {
      return;
    }
  };

  return [cookieValue, cookieHandle];
}
