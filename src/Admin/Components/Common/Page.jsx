import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components';
import { useRouter } from 'next/router';

//hooks && reduce
import { AdminContext } from '../Store/Admin_Context';

export default function Page() {
  const { currentPage, setCurrentPage } = useContext(AdminContext);
  const [ viewPage, setViewPage ] = useState(50);
  const [ pageArr, setPageArr ] = useState([]);
  const initPage = 30;
  
  const route = useRouter(); 

  const pageHandler = (type, idx) => {
    // if(currentPage === idx - 1) return; // 같은 페이지 요청 방지
    if(type === 'left'){
      if(currentPage < 1){
        return;
      } else {
        setCurrentPage((page) => page + idx);
      }
    } else if(type === 'num'){ // 번호를 직접 눌렀을 때
      setCurrentPage(idx);

    } else if(type === 'right') {
      if(currentPage > initPage.length - 1){
        return;
      } else {
        setCurrentPage((page) => page + idx);
      }
    }
  };

  useEffect(() => {
    let pageArrList = [];
    let pages;
    let initPages;
    if(initPage < viewPage){
      initPages = 20
    }

    for(pages = 0; pages < initPages; pages++){
      pageArrList.push(pages + 1);
    }

      let test;
      if(currentPage > 4){
        test = pageArrList.slice(currentPage - 5, currentPage + 5);
      } else if(currentPage >= initPages - 8){
        // console.log('test');
        // test = pageArrList.slice(currentPage + 5, currentPage - 5);
      } else {
        test = pageArrList.slice(0, 10);
      }

    setPageArr(test);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(0)
  }, [route.asPath]);

    console.log(currentPage)
  return (
    <Layout>
      <PageButton onClick={() => pageHandler('left', -1)}>{'<'}</PageButton>
      { 
        pageArr?.map((i,index) => (
          <PageButton 
            key={index} 
            styling={currentPage + 1 === i} 
            onClick={() => pageHandler('num', i - 1)}
          >
            { i }
          </PageButton>
        ) )
      }
        <PageButton onClick={() => pageHandler('right', +1)}>{'>'}</PageButton>
    </Layout>
  )
}

const Layout = styled.div`
display:flex;
justify-content: center;
align-items: center;
width:100%;
margin-top:1em;
`;

const PageButton = styled.button`
border:1px solid ${props => props.styling ? props.theme.color.orangeColor : `#999`};
color:${props => props.styling ? props.theme.color.orangeColor : `#999`};
border-radius: 4px;
max-width:3em;
padding:0.5em 0.6em;
margin:0 0.1em;
cursor:pointer;
`;