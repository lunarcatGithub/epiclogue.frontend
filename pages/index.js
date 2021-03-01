import Main from '@component/main/Main';
import axios from 'axios'

// Hooks&&reducer import
import { AppDataContext } from '@store/App_Store';

export default function MainPage({boardItem}) {

    return (
    <>
        <Main boardItem={boardItem} />
    </>
    )
}

export async function getServerSideProps() {

    const url = `http://localhost:5000/board`
    const res = await axios.get(url)

    return {
        props:{
            boardItem:res.data
        }
    }
}