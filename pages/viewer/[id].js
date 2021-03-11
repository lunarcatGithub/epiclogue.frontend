import Viewer from '@component/viewer/Viewer';
import axios from 'axios';
import {useRouter} from 'next/router';
export default function ViewerPage({boardItem, id, error}) {
  const router = useRouter()
  console.log(boardItem)

  return <Viewer boardItem={boardItem} userId={id} nonError={error} />;
}

// export async function getInitialProps({context}) {
//     let error = null
//     let res = null
//     const id = context.params.id
//     const url = `${process.env.API_URL}/boards/${id}`
//     res = await axios.get(url).catch(res => {
//         if(res.response.status === 404) error = 404
//         return res.response
//     })
//     console.log(res)
//   return {
//     props: {
//       boardItem: res?.data,
//       id: id,
//       error,
//     },
//   };
// }

// import Viewer from '@component/viewer/Viewer';
// import axios from 'axios';
// import {useRouter} from 'next/router';

// export default function ViewerPage({ boardItem, id, error }) {
//   const router = useRouter()

//   if (router.isFallback) {
//     return <div>Loading...</div> 
//   }
//   return <Viewer boardItem={boardItem} userId={id} nonError={error} />;
// }


// export async function getStaticPaths(){
//   return{
//     paths:[{params:{id:'1'}}],
//     fallback: true
//   }
// }

ViewerPage.getInitialProps = async(context)=> {
      let error = null
      let res = null
      const id = context.query.id
      const url = `${process.env.API_URL}/boards/${id}`
      res = await axios.get(url).catch(res => {
          if(res.response.status === 404) error = 404
          return res.response
      })
      console.log(res)
  return {
            boardItem: res?.data,
            id: id,
            error,
          }
}
