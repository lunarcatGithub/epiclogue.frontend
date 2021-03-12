import MyBoard from '@component/MyBoard/MyBoard';
import axios from 'axios';
export default function Myboard({ boardItem, id, error }) {
  
  return <MyBoard boardItem={boardItem} userId={id} nonError={error} />;
}

Myboard.getInitialProps = async(context)=> {
    let res = null;
    let error = null;
    const id = context.query.id
    const url = `${process.env.API_URL}/myboard/${id}`
    res = await axios({
      url,
        method:'get',
        withCredentials: true
    }).catch(res => {
        error = 404
        return res?.response
    })

  return {
      boardItem: res?.data,
      id: id,
      error,
    }
}
