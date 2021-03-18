import Viewer from '@component/viewer/Viewer';
import axios from 'axios';

export default function ViewerPage(props) {
  const {boardItem, id, error} = props
  return <>{ boardItem ? <Viewer boardItem={boardItem} userId={id} nonError={error} /> : <div>loding...</div>}</>
}

export async function getServerSideProps(context) {
  const {query, req, params} = context

  const id = params?.id || query?.id;

      let error = null
      let res = null
      const url = `${process.env.API_URL}/boards/${id}`
      res = await axios({
        url,
        method:'get',
        headers: req?.headers?.cookie ? { cookie: encodeURIComponent(req.headers.cookie) } : undefined,
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
      }}
}

// ** ▼▼ getInitialProps ▼▼ **


// ViewerPage.getInitialProps = async({query, req})=> {
//       let error = null
//       let res = null
//       const cookie = typeof window !== 'undefined' && document.cookie
//       console.log(cookie)
//       const {id} = req?.params || query
//       const url = `${process.env.API_URL}/boards/${id}`
//       res = await axios({
//         url,
//         method:'get',
//         headers: req?.headers?.cookie ? { cookie: req.headers.cookie } : cookie,
//         withCredentials: true,
//       })
//       .catch(res => {
//           if(res.response?.status === 404) error = 404
//           return res.response
//       });
      
//       return {
//             boardItem: res?.data,
//             id,
//             error,
//       }
// }

// ** ▼▼ static ▼▼ **
// import { useRouter } from 'next/router';

// export default function ViewerPage(props) {
//   const {boardItem, id, error} = props;

//   const router = useRouter();

//   if (router.isFallback) {
//     return <div>Loading....</div>
//   }

//   return <Viewer boardItem={boardItem} userId={id} nonError={error} />
// }

// export const getStaticPaths = async (props) => {
//   console.log('props', props)
//   const res = await axios.get(`${process.env.API_URL}/boards`)
//   const data = res?.data?.data

//   return {
//      paths: data.slice(0, 30).map(post => ({params:{ id: post._id.toString() }})),
//      fallback: true
//   }
// }

// export async function getStaticProps(context) {
//   console.log('context', context)
//   const id = context.params.id;
//       let error = null
//       let res = null
//       // const id = query.id
//       const url = `${process.env.API_URL}/boards/${id}`
//       res = await axios({
//         url,
//         method:'get',
//         // headers: req?.headers?.cookie ? { cookie: req.headers.cookie } : undefined,
//         withCredentials: true,
//       })
//       .catch(res => {
//           if(res.response?.status === 404) error = 404
//           return res.response
//       });
      
//       return {
//         props : {
//             boardItem: res?.data,
//             id: id,
//             error,
//       }}
// }