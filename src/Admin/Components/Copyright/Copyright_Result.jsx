import React,{ useState, useEffect, useContext } from 'react'
import styled from 'styled-components';

// 컴포넌트 import
import ListForm from '../Common/List__Form';

// reduce
import { AdminContext } from '../Store/Admin_Context';

// hooks
import useAxiosFetch from '@hooks/useAxiosFetch';

export const CopyRightReportResult =()=> {
  const { setCopyrightResultData, setIsAdmin } = useContext(AdminContext);

  // fetch
  const [ reportLoading, reportApi, reportError, reportFetch] = useAxiosFetch();

    //data
    const [userContentsData, setUserContentsData] = useState([
      {id:1, _id:`@asasdd`, title:'신고받을만한 콘텐츠임니다ㅎ',  result:'삭제',  date:'2019-05-14'},
      {id:2, _id:`@adf`, title:'신고쟁이 ㅎㅎㅋㅎ', result:'삭제',   date:'2019-05-14'},
      {id:3, _id:`@qwerrt`, title:'qwrqsfa', result:'탈퇴',  date:'2019-05-14'},
      {id:4, _id:`@qwerrt`, title:'ghhtttt', result:'정지',  date:'2019-05-14'}
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
      {title:'복구', value:'Restore'},
    ]   

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

    useEffect(() => {
      const params = {
        size:30,
        page:0,
        isCopyright:true
      }
      const URL = `${process.env.NEXT_PUBLIC_API_URL}/report/processedReports`;
      reportFetch(URL, 'get', null, null, params)
      }, []);
      
    useEffect(() => {
      if(reportApi?.result === 'ok'){
        setIsAdmin(true);
        setCopyrightResultData(reportApi?.data);

      } else if(reportError?.status === 401) {
        setIsAdmin(false);

      } else {
        return;
      }
    }, [reportApi, reportError]);

    const headerArr = ['번호', '아이디', '처리결과', '처리일자', '복구'];


  return (
    <Layout>
      <LayoutInner>
        <ListForm 
        type='COPYRIGHTRESULT' 
        contentsData={{
          headerArr,
          categorySelec,
          userContentsData,
          searchFilter,
          dataHadler,
          setToggleSelect,
          buttonType,
          reportLoading
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


