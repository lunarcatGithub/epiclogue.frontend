import React, {useEffect} from 'react';

import Main from '@component/main/Main';
import useAxiosFetch from '@hooks/useAxiosFetch';
import axios from 'axios'
export default function MainPage() {

    const test = () => {
        const url = `/board`
        const data = new FormData();
        data.append('action', null);
        axios.get({
            method:url,
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
              },
              data
        }).then((res) => console.log(res.data))
        
    }
    useEffect(()=>{
        test()
    },[])
    return <Main />
}
