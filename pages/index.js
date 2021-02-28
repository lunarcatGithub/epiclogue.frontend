import Main from '@component/main/Main';
import useAxiosFetch from '@hooks/useAxiosFetch';
import axios from 'axios'
export default function MainPage({boardItem}) {
    return <Main />
}

// export async function getServerSideProps() {
//     const url = `http://localhost:5000/board`
//     const res = await axios.get(url)
//     console.log(res.data)
//     return {
//         props:{
//             boardItem:res
//         }
//     }
// }