import React, { Component } from 'react';
import styled from 'styled-components';

export const Gnb =()=> {

    return (
            <Layout>
                <LayoutInner>
                    {/* GNB 중간 부분*/}
                    <CenterLayout>

                    </CenterLayout>
                    {/* GNB 우측 부분*/}
                    <RightLayout>
                        <AdminImg/>
                        <AdminInformBox>
                            <AdminInId>dadadasdas</AdminInId>
                            <AdminInClass>관리자 1급</AdminInClass>
                        </AdminInformBox>
                        <HamburgMenuBox>
                        <HamburgMenu/>
                        </HamburgMenuBox>
                    </RightLayout>
                </LayoutInner>
            </Layout>                
        )
    }

// 스타일 영역
// 공통

// 레이아웃

const Layout = styled.div`
display:flex;
width:100%;
height:46px;
z-index:999;
`
const LayoutInner = styled.div`
position:fixed;
display:flex;
justify-content:flex-end;
top:0;
left:0;
padding: 4px;
width:100%;
height:46px;
background:#222222;
`
const CenterLayout = styled.div`
display:flex;
align-items:center;
width:auto;
height:100%;

`
const RightLayout = styled(CenterLayout)`

`
const AdminImg = styled.img`
width:38px;
height:38px;
border-radius:50%;
margin:0 14px;
background:${props => props.theme.adminColor.whiteColor};
cursor:pointer;
`

const AdminInformBox = styled.div`
display:flex;
flex-direction:column;
`

const AdminInId = styled.span`
color:${props => props.theme.adminColor.whiteColor};
font-size:${props => props.theme.fontSize.font15};
font-weight:${props => props.theme.fontWeight.font500};

`
const AdminInClass = styled.span`
color:${props => props.theme.adminColor.whiteColor};
font-size:${props => props.theme.fontSize.font12};
font-weight:${props => props.theme.fontWeight.font300};
margin-top:3px;
`

const HamburgMenuBox = styled.button`
display:flex;
justify-content:center;
align-items:center;
padding:20px;
cursor:pointer;

`
const HamburgMenu = styled.div`
position:relative;
display:inline-block;
width:18px;
height:2px;
background:${props => props.theme.adminColor.whiteColor};
margin:0 18px;

&::before {
    content:'';
    position:absolute;
    top:8px;
    left:0;
    width:18px;
    height:2px;
    border:25px;
    background:${props => props.theme.adminColor.whiteColor};
}
&::after{
    content:'';
    position:absolute;
    top:-8px;
    left:0;
    width:18px;
    height:2px;
    border:25px;
    background:${props => props.theme.adminColor.whiteColor};
}
`
export default Gnb