import React from 'react';
import ErrorDesc from '@componenet/error/ErrorDesc';
export default function Error({ statusCode }) {
  return <ErrorDesc type={ statusCode ? 'server' : 'client' }/>
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
