import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// 컴포넌트 import
import { Progress } from '@utils/LoadingProgress';
import ContentsForm from './Contents__Form';
import ContentsUserForm from './Contents__UserForm';

// Hooks&&reducer import
import { AppDataContext, LanguageContext } from '@store/App_Store';
import useAxiosFetch from '@hooks/useAxiosFetch';

  const Contents = ({ type, searchType }) => {
    const router = useRouter();
  const loader = useRef(null);
  const {
    searchData,
    clickedComic,
    clickedIllust,
    myboardData,
    lastContentId,
    setLastContentId,
    renderList,
    setRenderList,
    page,
    setPage
  } = useContext(AppDataContext);

  const {availableLanguage} = useContext(LanguageContext)
  const [resultKeyword, setResultKeyword] = useState();

  const url = router.asPath;
  const keyword = router.query.text;

  // 콘텐츠 렌더링
  const [renderComponent, setRenderComponent] = useState();

  // 유저 설정 가능한 fillter
  const [items, setItems] = useState(35);

  // 마지막 콘텐츠id 감지하기

  // fetch
  const [initDataLoading, initialApi, , initialFetch] = useAxiosFetch();
  const [, userApi, , userFetch] = useAxiosFetch();

  useEffect(() => {
    searchData ? setResultKeyword(searchData) : setResultKeyword(keyword);
  }, [searchData, keyword]);

  const fixedEncodeURIComponent =(str)=> {
    return str.replace(/[!'()*]/gi, function (c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

// 검색시 받는 데이터
  const contentInitHandler = () => {
    if(page < 1) return;
    if(type === 'MAIN'){
      if (clickedComic && !clickedIllust) {
        initialFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards?type=Comic&size=${items}${lastContentId && `&latestId=${lastContentId}`}`, 'get', null, null, null);
      } else if (!clickedComic && clickedIllust) {
        initialFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards?type=Illust&size=${items}${lastContentId && `&latestId=${lastContentId}`}`, 'get', null, null, null);
      } else {
        initialFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards?size=${items}${lastContentId && `&latestId=${lastContentId}`}`, 'get', null, null, null);
      }
    }
  }

  // 검색시 받는 데이터
  const searchContentsHandler = () => {
    if(page < 1) return;
    if(type === 'SEARCH' && resultKeyword){
      setRenderList(null)
      const result = fixedEncodeURIComponent(resultKeyword);
      if (url.match('/search/trend') && searchType === 'trend') {
        initialFetch(`${process.env.NEXT_PUBLIC_API_URL}/search?type=Board&q=${null}`, 'get', null, null, null);
      } else if(url.match('/search/latest') && searchType === 'latest'){
        initialFetch(`${process.env.NEXT_PUBLIC_API_URL}/search?type=Board&size=${items}&q=${result}`, 'get', null, null, null);
      } else if(url.match('/search/users') && searchType === 'users'){
        userFetch(`${process.env.NEXT_PUBLIC_API_URL}/search?type=User&size=${items}&q=${result}`, 'get', null, null, null);
      }
    }
  }

  const finalRenderHandler = () => {
    if(type === 'SEARCH' && searchType === 'users'){
      if(!userApi) return;
      setRenderList(renderList ? [...renderList, ...userApi?.data] : [...userApi?.data]);
    } else if(type === 'MYBOARD') {
      if(!myboardData) return;
      setRenderList(myboardData);
    } else {
      if(!initialApi) return;
      setRenderList(renderList ? [...renderList, ...initialApi?.data] : [...initialApi?.data]);

    }
  }
  // 검색 탭 바뀔 때 마다 page 0으로 초기화
  useEffect(() => {
    setPage(0);
    setRenderList(null)
  }, [type, searchType]);


  useEffect(() => {
    searchContentsHandler()
    return ()=>searchContentsHandler()
  }, [page, url, type, searchType, resultKeyword])

  // 초기 코믹, 일러 필터링
  useEffect(() => {
    contentInitHandler();
  }, [clickedComic, clickedIllust, type, page, url])

  // hook 변수에 데이터 삽입
  useEffect(() => {
    finalRenderHandler()
  }, [initialApi, userApi, myboardData]);

  useEffect(() => {
    let contentData = initialApi?.data
    contentData && setLastContentId(contentData[contentData?.length - 1]?._id)
  }, [page, initialApi])

  useEffect(() => {
    setLastContentId(null)
  }, [clickedComic, clickedIllust])

  // 받은 데이터 각 컴포넌트에 뿌려서 렌더링
  useEffect(() => {
    if (searchType === 'users') {
      setRenderComponent(renderList?.map((item, index) => <ContentsUserForm searchData={item} key={index} />));
    } else {
      setRenderComponent(renderList?.map((item, index) => <ContentsForm key={index} contentData={item} />));
    }
    return () => setRenderComponent()
  }, [renderList, searchType])

  // 스크롤 이벤트 ****************************
  // overver 감지
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage(num => num + 1);
    }
  };

  useEffect(() => {

    let options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  return (
    <>
      <Layout>
        {
          !url.match('main') && !url.match('myboard') && renderList?.length === 0 && 
            <NoResultWrap>
              <NoResultImg />
            </NoResultWrap> 
        }
        <LayoutInner>
          <MasonryBox >{renderComponent}</MasonryBox>
        </LayoutInner>
        {
        initDataLoading && (
          <DummyLayout>
            <Progress />
          </DummyLayout> )
        }
        
          <RefLayout ref={loader}/>
        
      </Layout>
    </>
  );
};

const DummyLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

//레이아웃
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0.5em;
`;
const LayoutInner = styled.div`
  width: 100%;
  height: 100%;
  @media (max-width: 1280px) {
    width: 100%;
  }
`;

const MasonryBox = styled.section`
  display: grid;
  justify-content: center;
  height: 100%;
  grid-template-columns: repeat(auto-fill, minmax(14%, 1fr));
  column-gap: 0.4em;
  padding: 0.8em;
  @media (max-width: 1280px) {
    grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
  }
  @media (max-width: 980px) {
    grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  }
  @media (max-width: 380px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }`;

const RefLayout = styled.div`
  width: 100%;
  height: 20px;
`;

const NoResultWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 5em;
`;
const NoResultImg = styled.svg`
  background: url('/static/no_result.svg') no-repeat center center / contain;
  width: 24em;
  height: 24em;
`;

export default Contents;
