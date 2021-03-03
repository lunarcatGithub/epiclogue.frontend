import Viewer from '@component/viewer/Viewer';
import axios from 'axios'

export default function ViewerPage({boardItem,error,id}) {

    return (
        <Viewer boardItem={boardItem} userId={id} viewerError={error} />
    )
}

export async function getServerSideProps(context) {
    let error = null;
    let res = null;
    const id = context.params.id
    const url = `${process.env.API_URL}/boards/${id}`
    await axios.get(url)
    .then(result => res = result)
    .catch(err => error = err.response)

    return {
        props:{
            boardItem:res.data,
            error,
            id:id
        }
    }
}