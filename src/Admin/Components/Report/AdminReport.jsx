import React,{ useState, useEffect, useContext } from 'react'
import styled from 'styled-components';

// 컴포넌트 import
import ListForm from '../Common/List__Form';

// hooks
import useAxiosFetch from '../../../hooks/useAxiosFetch';

// reduce
import { AdminContext } from '../Store/Admin_Context';

export const AdminReport =()=> {
    const { setReportData, reportData } = useContext(AdminContext);

    //data
    const [userContentsData, setUserContentsData] = useState([
      {id:1, _id:`@asasdd`, title:'신고받을만한 콘텐츠임니다ㅎ', kind:'대댓글', count:5},
      {id:2, _id:`@adf`, title:'신고쟁이 ㅎㅎㅋㅎ',  kind:'대댓글',  count:2},
      {id:3, _id:`@qwerrt`, title:'qwrqsfa', kind:'대댓글', count:1},
      {id:4, _id:`@qwerrt`, title:'ghhtttt',  kind:'대댓글',  count:1, }
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
    
    const buttonType = [
      {title:'처리', value:'SanctionsHandle'},
    ]   

  // fetch
    const [ , reportApi, reportError, reportFetch] = useAxiosFetch();

    const [toggleSelect, setToggleSelect] = useState();

    const dataHadler = (e, type) => {
      userContentsData?.forEach(_contentsData => {
        if( Number(toggleSelect) === _contentsData.id ){
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

    useEffect(() => {
    const params = {
      size:30,
      page:0,
    }
    reportFetch(`${process.env.NEXT_PUBLIC_API_URL}/report`, 'get', null, null, params)
    }, []);

    useEffect(() => {
      setReportData(reportApi?.data);
      return () => setReportData(null);

    }, [reportApi])
    
    const headerArr = ['번호', '아이디', '콘텐츠', '신고횟수', '신고날짜', '처리하기'];


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


