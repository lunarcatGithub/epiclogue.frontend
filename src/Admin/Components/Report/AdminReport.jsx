import React,{ useState } from 'react'
import styled from 'styled-components';

// 컴포넌트 import
import ListForm from '../Utils/List__Form';

export const AdminReport =()=> {
    //data
    const [userContentsData, setUserContentsData] = useState([
        {id:1, email:'asd@ads.com', _id:`@asasdd`, type:'정지', result:'미정', kind:'대댓글', content:'asdasd', resultDate:'2020-11-28', count:5, category:'혐오', view:'view', ban:false, hide:false},
        {id:2, email:'ascvcvd@xcvx.com', _id:`@adf`, type:'탈퇴', result:'삭제',  kind:'대댓글',content:'qwwqw', resultDate:'2021-01-02', count:2, category:'갈등유발', view:'hide', ban:true, hide:true},
        {id:3, email:'asxzcvzxd@ads.com', _id:`@qwerrt`, type:'정상', result:'숨김', kind:'대댓글', content:'12341', resultDate:'2021-02-28', count:1, category:'광고/홍보', view:'hide', ban:false, hide:false},
        {id:4, email:'asxzcvzxd@ads.com', _id:`@qwerrt`, type:'정상', result:'숨김', kind:'대댓글', content:'s2d1', resultDate:'2021-02-28', count:1, category:'헤헤', view:'view', ban:false, hide:false}
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

    const headerArr = ['번호', '이메일', '아이디', '회원유형', '종류', '처리결과', '콘텐츠','내용', '처리일자', '신고횟수', '상태', '정지', '숨김여부','삭제', '탈퇴'];

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
                        setToggleSelect
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


