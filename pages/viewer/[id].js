import Viewer from '@component/viewer/Viewer';
import axios from 'axios';

export default function ViewerPage({ boardItem, id, error }) {
  return <Viewer boardItem={boardItem} userId={id} nonError={error} />;
}

export async function getInitialProps(context) {
    let error = null
    let res = null
    const id = context.params.id
    const url = `${process.env.API_URL}/boards/${id}`
    res = await axios.get(url).catch(res => {
        if(res.response.status === 404) error = 404
        return res.response
    })

  return {
    props: {
      boardItem: res?.data,
      id: id,
      error,
    },
  };
}
