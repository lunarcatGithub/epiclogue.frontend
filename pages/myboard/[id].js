import MyBoard from '@component/myBoard/MyBoard';
import axios from 'axios'

export default function Myboard({boardItem, id}) {
    console.log(boardItem)

    return (
       <MyBoard boardItem={boardItem} userId={id} />
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id
    const url = `${process.env.API_URL}/myboard/${id}`
    const res = await axios.get(url)

    return {
        props:{
            boardItem:res.data,
            id:id
        }
    }
}