import React,{ useRef, useState } from 'react'
import styled from 'styled-components';

// 컴포넌트 import
import ListForm from '../Utils/List__Form';

// utils

export const AdminUsers =()=> {
    const tableRef = useRef();
    //toggle

    const [userContentsData, setUserContentsData] = useState([
        {id:1, email:'asd@ads.com', _id:`@asasdd`, type:'정지', join:'2020-11-28', ban:false},
        {id:2, email:'ascvcvd@xcvx.com', _id:`@adf`, type:'탈퇴', join:'2021-01-02', ban:true},
        {id:3, email:'asxzcvzxd@ads.com', _id:`@qwerrt`, type:'정상', join:'2021-02-28', ban:false}
    ]);

    const categorySelec = [
        {title:'전체', value:'all'},
        {title:'일러스트', value:'illust'},
        {title:'코믹', value:'comic'}];
    const hideOrNot = [
        {title:'전체', value:'all'},
        {title:'표시', value:'view'},
        {title:'숨김', value:'hide'}];
    const searchFilter = [
        {title:'전체', value:'all'},
        {title:'이메일', value:'view'},
        {title:'아이디', value:'hide'},
        {title:'제목', value:'title'}
    ];
    
    const [selectNum, setSelectNum] = useState();
    const [toggleSelect, setToggleSelect] = useState();

    const dataHadler = (e, type) => {
    
    }  

    const headerArr = ['번호', '이메일', '아이디', '회원유형', '가입일', '', '정지', '탈퇴'];

    return (
        <Layout>
            <LayoutInner>
                    <ListForm 
                    type='USERS' 
                    contentsData={{
                        headerArr,
                        userContentsData
                        }} />
            </LayoutInner>
        </Layout>
    )
}

const Layout = styled.div`
width:100%;
height:100%;
margin-top:2em;
`

const LayoutInner = styled.div`
display:flex;
flex-direction:column;
width:100%;
height:100%;
`


