import Main from '@component/main/Main';
import useAxiosFetch from '@hooks/useAxiosFetch';
import axios from 'axios'
export default function MainPage({boardItem}) {
    return <Main />
}

export async function getServerSideProps() {
    const url = `${process.env.REACT_APP_API_URL}/boards`
    const res = await axios.get(url)
    // console.log(res.data)
    return {
        props:{
            boardItem:res
        }
    }
}