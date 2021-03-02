import Viewer from '@component/viewer/Viewer';
import axios from 'axios'

export default function ViewerPage({boardItem, id}) {
    console.log(boardItem)
    return (
       <Viewer boardItem={boardItem} userId={id} />
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id
    const url = `${process.env.API_URL}/boards/${id}`
    const res = await axios.get(url)

    return {
        props:{
            boardItem:res.data,
            id:id
        }
    }
}