import MyBoard from '@component/MyBoard/MyBoard';
import axios from 'axios';

export default function Myboard({ boardItem, id, error }) {
  return <MyBoard boardItem={boardItem} userId={id} nonError={error} />;
}

export async function getServerSideProps(context) {
  let res = null;
  let error = null;
  const id = context.params.id;
  const url = `${process.env.API_URL}/myboard/${id}`;
  res = await axios.get(url).catch((res) => {
    error = 404;
    return res.response;
  });

  return {
    props: {
      boardItem: res.data,
      id: id,
      error,
    },
  };
}
