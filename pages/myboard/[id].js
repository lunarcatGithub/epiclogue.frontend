import MyBoard from '@component/MyBoard/MyBoard';
import axios from 'axios';
export default function Myboard({ boardItem, id, error }) {
  return <MyBoard boardItem={boardItem} userId={id} nonError={error} />
}

Myboard.getInitialProps = async({query, req})=> {
    let res = null;
    let error = null;
    const id = query.id
    const url = `${process.env.API_URL}/myboard/${id}`
    res = await axios({
      url,
      method:'get',
      headers: req?.headers?.cookie ? { cookie: req.headers.cookie } : undefined,
      withCredentials: true,
    })
    .catch(res => {
        if(res.response?.status === 404) error = 404
        return res.response
    });
  return {
      boardItem: res?.data,
      id: id,
      error,
    }
}
