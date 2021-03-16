
export default function Error({ statusCode }) {
  console.log('statusCode', statusCode)

  return <div>{statusCode ? 'server error' : 'client error'}</div>;
}
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
