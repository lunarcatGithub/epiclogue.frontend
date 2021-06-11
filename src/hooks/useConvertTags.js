import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export const useConvertTags = () => {
  const [converted, setConverted] = useState([]);
  const regURLHttp = new RegExp(/^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/);
  const regExp = new RegExp(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i);

  const convert = (props) => {
    if (!props) return;
    const arr = [];
  
  new Promise((res, rej) => {
    let data = props.replace(/(\n|\r\n)/g, '+<br/>+').split('+').join('+')
    res(data)
  }).then((data) => {
    return data.replace(/\s/g, '+').split('+')
  }).then((test) => {

    test?.map((str, index) => {
      if (str[0] === '#') {
        arr.push(
          <Link
            href={{
              pathname: `/search/latest/`,
              query: {
                text: str,
                type: 'latest',
              },
            }}
            as={`/search/latest/${str.split('#').pop()}`}
            key={index}
          >
            <LinkStyle>{str}</LinkStyle>
          </Link>
        );
      } else if (str[0] === '@') {
        // 유저 찾기
        arr.push(
          <Link
            href={{
              pathname: `/search/users/`,
              query: {
                text: str,
                type: 'users',
              },
            }}
            as={`/search/latest/${str}`}
            key={index}
          >
            <LinkStyle>{ str }</LinkStyle>
          </Link>
        );
      } else if ( str.toString().match(regExp) || str.toString().match(regURLHttp) ) {
        // 사이트 주소
        arr.push(
          <LinkStyle key={index} href={ str.toString().match(/(http(s)?:\/\/)/gi) ? str : `https://${str}` } target="_blank">
            { str }
          </LinkStyle>
        );
      }
      else if (str === '<br/>') {
        arr.push(<br key={index} />);
      } else {
        arr.push(<TextChild key={index}>{ str }</TextChild>);
      }
    })
    setConverted(arr);
  })
  };

  return [converted, convert];
};

const TextChild = styled.span`
  line-height: 1.2em;
  margin-right: 0.2em;
  font-weight: ${(props) => props.theme.fontWeight.font300};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: inherit;
  word-break: break-all;
`;

// Link style
const LinkStyle = styled.a`
  color: ${(props) => props.theme.color.skyColor};
  margin-right: 0.2em;
  word-break: break-all;
  line-height: 1.3em;
  cursor: pointer;
`;