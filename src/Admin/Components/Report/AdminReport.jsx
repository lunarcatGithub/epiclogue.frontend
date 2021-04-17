import React,{ useState } from 'react'
import styled from 'styled-components';

// 컴포넌트 import
import ListForm from '../Common/List__Form';

export const AdminReport =()=> {
    //data
    const [userContentsData, setUserContentsData] = useState([
        {id:1, _id:`@asasdd`,  result:'미정', kind:'대댓글',  date:'2020-11-28', count:5, view:'view', ban:false, hide:false},
        {id:2, _id:`@adf`, result:'삭제',  kind:'대댓글', date:'2021-01-02', count:2,  view:'hide', ban:true, hide:true},
        {id:3, _id:`@qwerrt`, result:'숨김', kind:'대댓글', date:'2021-02-28', count:1, view:'hide', ban:false, hide:false},
        {id:4, _id:`@qwerrt`, result:'숨김', kind:'대댓글', date:'2021-02-28', count:1, view:'view', ban:false, hide:false}
    ]);

    const categorySelec = [
        {title:'전체', value:'all'},
        {title:'정상', value:'green'},
        {title:'정지', value:'banned'},
        {title:'탈퇴', value:'leave'}];

    const searchFilter = [
        {title:'전체', value:'all'},
        {title:'이메일', value:'email'},
        {title:'아이디', value:'id'},
        {title:'제목', value:'title'}];
    
    const [toggleSelect, setToggleSelect] = useState();

    const dataHadler = (e, type) => {
        userContentsData?.forEach(_contentsData => {
            if(Number(toggleSelect) === _contentsData.id){
                let data = userContentsData
                if(type === 'main'){
                    // 회원 탈퇴
                    data.splice(Number(toggleSelect)-1, 1)
                    setUserContentsData(data);
                    
                } else if( type === 'sub'){
                    // 회원 정지
                    if(userContentsData.hide === true){
                        data.hide = false
                    }else {
                        data.hide = true
                    }
                    setUserContentsData(data)
                }
            } else {
                return;
            }
        });
    }  

    const headerArr = ['번호', '아이디', '처리결과', '콘텐츠', '처리일자', '신고횟수', '정지', '삭제', '탈퇴'];
    const warnBtn = [
        { title: '메일발송', value: 'sendMail' },
        { title: '정지', value: 'ban' },
        { title: '탈퇴', value: 'leave' },
        { title: '삭제', value: 'remove' },
    ]

    return (
        <Layout>
            <LayoutInner>
                    <ListForm 
                    type='REPORT' 
                    contentsData={{
                        headerArr,
                        categorySelec,
                        userContentsData,
                        searchFilter,
                        dataHadler,
                        setToggleSelect,
                        warnBtn
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


