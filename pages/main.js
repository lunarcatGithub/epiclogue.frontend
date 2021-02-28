import React, {useEffect} from 'react';

import Main from '@component/main/Main';
import useAxiosFetch from '@hooks/useAxiosFetch';
import axios from 'axios'
export default function MainPage() {

    const test = () => {
        let headers = {
            'content-type': 'application/json',
            'Accept': 'application/json'
          }
        axios.get(
            `http://localhost:5000/board`, headers
        ).then((res) => console.log(res.data))
        
    }
    useEffect(()=>{
        test()
    },[])
    return <Main />
}
