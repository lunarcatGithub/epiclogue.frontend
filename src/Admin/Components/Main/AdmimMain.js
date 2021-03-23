import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router';
import {AdminUsers} from '../User/User';

// context
import {AdminContext} from '../Store/Admin_Context';

// 컴포넌트 import
import { Dashboard } from '../Dashboard/Dashboard';
import { AdminContents } from '../Contents/AdminContents';

export const AdmimMain = () => {
const router = useRouter();

const [viewTab, setViewTab] = useState();

useEffect(() => {
    if(router.query.tab === 'dashboard'){
        setViewTab(<Dashboard/>)
    } else if(router.query.tab === 'contents'){
        setViewTab(<AdminContents/>)
    } else if (router.query.tab === 'users'){
        setViewTab(<AdminUsers/>)
    }
    
}, [router.query]);

    return (<>{viewTab}</>)
}