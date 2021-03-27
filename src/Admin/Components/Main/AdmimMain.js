import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router';
import {AdminUsers} from '../User/User';
import styled from "styled-components";

// context

// 컴포넌트 import
import { Dashboard } from '../Dashboard/Dashboard';
import { AdminContents } from '../Contents/AdminContents';
import { AdminReport } from '../Report/AdminReport';
import GNB from '@Component/GNB/Gnb';
import { Nav } from '@Component/NAV/Nav';

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
    }else if (router.query.tab === 'reports'){
        setViewTab(<AdminReport/>)
    }
    
}, [router.query]);

    return (
        <Layout>
            <GNB/>
        <LayoutDivision>
            <Nav/>
        <LayoutInner>
            {viewTab}
        </LayoutInner>
            </LayoutDivision>
        </Layout> 
    )
}

// 스타일 영역
// 공통
// 레이아웃
const Layout = styled.div`
display:flex;
flex-direction:column;
width:100%;
height:100%;
`
const LayoutDivision = styled.section`
display:flex;
width:100%;
`
const LayoutInner = styled.div`
display:flex;
flex-direction:column;
width:100%;
height:100%;
/* padding:30px; */
margin:0 1.5em;

@media (max-width:480px) {
    padding:8px;
    margin:0;

}
`
