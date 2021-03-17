import MyBoard from '@component/MyBoard/MyBoard';
import axios from 'axios';
export default function Myboard({ boardItem, id, error }) {
  return <MyBoard boardItem={boardItem} userId={id} nonError={error} />
}

export async function getServerSideProps({query, req}) {
    let res = null;
    let error = null;
    const id = req?.params?.id || query?.id
    const url = `${process.env.API_URL}/myboard/${id}`
    res = await axios({
      url,
      method:'get',
      headers: req?.headers?.cookie ? { cookie: req.headers.cookie } : undefined,
      withCredentials: true,
    })
    .catch(res => {
        if(res.response?.status === 404) error = 404
    });
  return {
        props : {
          boardItem: res?.data,
          id: id,
          error,
        }
  }
}
