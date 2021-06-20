import React,{ useState, useEffect, useContext } from 'react'
import styled from 'styled-components';

// 컴포넌트 import
import ListForm from '../Common/List__Form';

// hooks
import useAxiosFetch from '@hooks/useAxiosFetch';

// reduce
import { AdminContext } from '../Store/Admin_Context';

export const AdminReport =()=> {
    const { setReportData, reportData, setIsAdmin } = useContext(AdminContext);

    //data


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
    
    const buttonType = [
      {title:'처리', value:'SanctionsHandle'},
    ]   

  // fetch
    const [ , reportApi, reportError, reportFetch] = useAxiosFetch();
    
    const [toggleSelect, setToggleSelect] = useState();

    // const dataHadler = (e, type) => {
    //   userContentsData?.forEach(_contentsData => {
    //     if( Number(toggleSelect) === _contentsData.id ){
    //       let data = userContentsData
    //       if(type === 'main'){
    //         // 회원 탈퇴
    //         data.splice(Number(toggleSelect)-1, 1)
    //         setUserContentsData(data);
            
    //       } else if( type === 'sub'){
    //         // 회원 정지
    //         if(userContentsData.hide === true){
    //             data.hide = false
    //         }else {
    //             data.hide = true
    //         }
    //         setUserContentsData(data)
    //       }
    //     } else {
    //         return;
    //     }
    //   });
    // } 

    useEffect(() => {
    const params = {
      size:30,
      page:0,
    }
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/report`;
    reportFetch(URL, 'get', null, null, params)
    }, []);

    useEffect(() => {
      if(reportApi?.result === 'ok'){
        setIsAdmin(true);
        setReportData(reportApi?.data);
      } else {
        setIsAdmin(false);
      }      
    }, [reportApi, reportError]);

    console.log(reportApi)
    const headerArr = ['번호', '아이디', '콘텐츠', '신고횟수', '최근 신고날짜', '처리하기'];


    return (
      <Layout>
        <LayoutInner>
          <ListForm 
            type='REPORT' 
            contentsData={{
            headerArr,
            categorySelec,
            searchFilter,
            setToggleSelect,
            buttonType
          } } />
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


