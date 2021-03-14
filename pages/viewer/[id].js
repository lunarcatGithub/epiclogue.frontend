import Viewer from '@component/viewer/Viewer';
import axios from 'axios';
export default function ViewerPage({boardItem, id, error}) {
  return <Viewer boardItem={boardItem} userId={id} nonError={error} />
}

ViewerPage.getInitialProps = async({query, req})=> {
      let error = null
      let res = null
      const id = query.id
      const url = `${process.env.API_URL}/boards/${id}`

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
