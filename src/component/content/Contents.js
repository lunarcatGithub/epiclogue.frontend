import React, { useState, useEffect, useContext, useRef, memo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// 컴포넌트 import
import { Progress } from '@utils/LoadingProgress';
import ContentsForm from './Contents__Form';
import ContentsUserForm from './Contents__UserForm';

// Hooks&&reducer import
import { AppDataContext } from '@store/App_Store';
import useAxiosFetch from '@hooks/useAxiosFetch';

  const Contents = ({ type, searchType }) => {
    const router = useRouter();
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
    setPage,
  } = useContext(AppDataContext);

  const [resultKeyword, setResultKeyword] = useState();

  const url = router.asPath;
  const keyword = router.query.text;

  // 콘텐츠 렌더링
  const [renderComponent, setRenderComponent] = useState(null);
  const [initRender, setInitRender] = useState([]);
  const [userRender, setUserRender] = useState([]);
  const [onlyUser, setOnlyUser] = useState([]);

  // 유저 설정 가능한 fillter
  // const [items, setItems] = useState(35);
  let items = 35
  // 순서 감지하기
  const [itmesNum, setItemsNum] = useState(0);
  
  // 필터링
  const [filtering, setFiltering] = useState('');

  // fetch
  const [initDataLoading, initialApi, , initialFetch] = useAxiosFetch();

  useEffect(() => {
    searchData ? setResultKeyword(searchData) : setResultKeyword(keyword);
  }, [searchData, keyword]);

// 초기 데이터
  const contentInitHandler = () => {
    if(initialApi?.data?.length === 0) return;
    if(type === 'MAIN'){
      const params = {
        type:filtering || '',
        size:items || 35,
        latestId:lastContentId || null
      }
      initialFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`, 'get', null, null, params);
    }
  }

  // 검색시 받는 데이터
  const searchContentsHandler = () => {
    if(type === 'SEARCH' && resultKeyword){
      const params = {
        type:'',
        size:items || 35,
        latestId:lastContentId || null,
        q:resultKeyword
      }
      if (searchType === 'trend') {
        params.type = 'Board'
      } else if(searchType === 'latest'){
        params.type = filtering || 'Board'
      } else if(searchType === 'users'){
        params.type = 'User'
      }
      initialFetch(`${process.env.NEXT_PUBLIC_API_URL}/search`, 'get', null, null, params);
    }
  }

  const finalRenderHandler = () => {
    // 콘텐츠 위주 렌더링 처리 함수
    if(type === 'MYBOARD') {
      myboardData && setInitRender(myboardData)
    } else if(type === 'MAIN') {
      if(initialApi?.data?.length === 0 && !lastContentId) return
      initialApi && setInitRender(initRender ? [...initRender, ...initialApi?.data] : [...initialApi?.data]);
    }
  }

  const initRenderHandler = () => {
    // 검색 결과 콘텐츠
    if(!initialApi) return;
    if(initialApi?.data?.length === 0 && !lastContentId) return
    if(searchType === 'latest'){ 
      setInitRender(initRender ? [...initRender, ...initialApi?.data] : [...initialApi?.data])
    } else if(searchType === 'users') {
      setUserRender(userRender ? [...userRender, ...initialApi?.data] : [...initialApi?.data])
    }
  }

  useEffect(() => {
    setPage(0);
    setInitRender(null)
    setLastContentId(null)
    if(clickedComic && !clickedIllust){
      setFiltering('Comic')
    } else if(!clickedComic && clickedIllust) {
      setFiltering('Illust')
    } else {
      setFiltering('')
    }

  }, [clickedComic, clickedIllust]);
  
  useEffect(() => {
    if(searchType === 'users'){
      setOnlyUser(userRender)
    }else {
      setRenderList(initRender)
    }
    setItemsNum(userRender?.length || initRender?.length)
  }, [initRender, userRender, searchType])

  // 검색 탭 바뀔 때 마다 page 0으로 초기화
  useEffect(() => {
    setPage(0);
    setRenderList(null)
    setOnlyUser(null)
    setUserRender(null)
    setInitRender(null)
    setLastContentId(null)
    console.log('실행')
  }, [type, searchType, resultKeyword, keyword, url]);
  
  //  검색 데이터
  useEffect(() => {
    setRenderList(null)
    searchContentsHandler()
  }, [page, searchType, resultKeyword, filtering])

  // 초기 코믹, 일러 필터링
  useEffect(() => {
    contentInitHandler();
  }, [page, filtering])

  // hook 변수에 데이터 삽입
  useEffect(() => {
    finalRenderHandler()
  }, [initialApi, myboardData, type]);

  // 검색 결과 렌더링
  useEffect(() => {
    initRenderHandler()
  }, [initialApi])
  
  useEffect(() => {
    initialApi && setLastContentId(initialApi?.data[initialApi?.data?.length - 1]?._id)
  }, [page, initialApi])

  // 받은 데이터 각 컴포넌트에 뿌려서 렌더링
  useEffect(() => {
    if (searchType === 'users') {
      setRenderComponent(onlyUser?.map((item, index) => <ContentsUserForm searchData={item} key={index} />));
    } else {
      setRenderComponent(renderList?.map((item, index) => <ContentsForm key={index} contentData={item} />));
    }
    return () => setRenderComponent()
  }, [renderList, onlyUser, searchType])

  // 스크롤 ****************************
  const loader = useRef(null);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage(num => num + 1);
    }
  }

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

  }, [loader.current]);

  return (
    <>
      <Layout>
        {
          !url.match('main') && !url.match('myboard') && renderList?.length === 0 || onlyUser?.length === 0 && 
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
          {itmesNum > 34 ? <RefLayout ref={loader}/> : null}
        
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
  display:flex;
  color:#222;
  width: 200px;
  height: 50px;
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

export default memo(Contents);
