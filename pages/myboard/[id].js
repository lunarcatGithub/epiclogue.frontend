import MyBoard from '@component/MyBoard/MyBoard';
import axios from 'axios'

export default function Myboard({boardItem, id}) {
    console.log(boardItem)

    return (
       <MyBoard boardItem={boardItem} userId={id} />
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id
    const url = `http://localhost:5000/myboard/${id}`
    const res = await axios.get(url)

    return {
        props:{
            boardItem:res.data,
            id:id
        }
    }
}