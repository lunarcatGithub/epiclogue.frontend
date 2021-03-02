import Follow from '@component/MyBoard/MyBoard__Follow';
import axios from 'axios'

export default function Myboard({boardItem, id}) {

    return (
       <Follow  />
    )
}

// export async function getServerSideProps(context) {

//     return {
//         props:{
//             boardItem:res.data,
//             id:id
//         }
//     }
// }