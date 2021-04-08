import React, { useState, createContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export const Nav = () => {
    // create context
    const AdminContext = createContext({});

    // tab controls
    const [adminTab, setAdminTab] = useState('DASHBOARD');

    const NavArr = [
        { id:0, title:'대시보드', href:'dashboard', method:'DASHBOARD' },
        { id:1, title:'콘텐츠관리', href:'contents', method:'CONTENTS' },
        { id:2, title:'회원관리', href:'users', method:'USERS' },
        { id:3, title:'신고관리', href:'reports', method:'REPORTS' },
        { id:4, title:'저작권 신고', href:'copyright', method:'COPYRIGHT' },
    ]

    return (
        <AdminContext.Provider value={{adminTab, setAdminTab}}>
            <Layout>
                <LayoutInner>
                    {/* NAV 상단 */}
                    <InnerTop>
                        {
                        NavArr.map(({id, title, href, method})=> (
                            <Link key={id} href={`/epicadmin/${href}`} >
                                <NavItemTxt onClick={()=>setAdminTab(method)} >{title}</NavItemTxt>
                            </Link> ))
                        }
                    </InnerTop>
                    <Dummy/>
                        {/* NAV 하단 */}
                    <InnerBottom>

                    </InnerBottom>
                </LayoutInner>
            </Layout>
        </AdminContext.Provider>
    )
}

// 스타일 영역
// 공통
// 레이아웃

const Layout = styled.div`
display:flex;
width:180px;
height:100vh;
`
const LayoutInner = styled.div`
position:sticky;
display:flex;
flex-direction:column;
top:0;
padding:10px;
width:180px;
height:100vh;
background:${props => props.theme.adminColor.replyBlue};
`
const Dummy = styled.div`
width:100%;
height:3px;
opacity:0.8;
border-radius:25px;
background:${props => props.theme.adminColor.whiteColor};

`
const InnerTop = styled.div`
display:flex;
height:auto;
flex-direction:column;
align-items:center;
/* justify-content:space-around; */
width:100%;
height:auto;
padding:2em 0;
`
const InnerBottom = styled(InnerTop)`
`

// NavLink
const NavItemTxt = styled.h2`
color:${props => props.theme.adminColor.whiteColor};
font-size:${props => props.theme.fontSize.font15};
font-weight:${props => props.theme.fontWeight.font500};
margin:20px 0%;
cursor:pointer;
`

const NavItem = styled.span`
display:flex;
align-items:center;
justify-content:center;
width:100%;
height:auto;
padding:1.2em 0;
&:active {
    font-weight:${props => props.theme.fontWeight.font700};
}
`

