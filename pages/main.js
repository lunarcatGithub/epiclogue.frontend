import Main from '@component/main/Main';
import useAxiosFetch from '@hooks/useAxiosFetch';
import axios from 'axios'
export default function MainPage({boardItem}) {
    return <Main />
}

export async function getServerSideProps() {
    const url = `localhost:8000/boards`
    const res = await axios.get(url)
    // console.log(res.data)
    return {
        props:{
            boardItem:res
        }
    }
}