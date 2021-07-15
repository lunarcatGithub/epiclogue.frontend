import React, { useState, useEffect, useContext, memo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// 컴포넌트 import
import { Progress } from '@utils/LoadingProgress';
import MainContent from './Contents__Form';
import ContentsUserForm from './Contents__UserForm';

// Hooks&&reducer import
import { AppDataContext } from '@store/App_Store';
import useAxiosFetch from '@hooks/useAxiosFetch';
import useScroll from '@hooks/useScroll';

const Contents = ({ type, searchType, contentsRender }) => {
  const router = useRouter();

  const {
    renderComponent,
    setRenderComponent,
    searchData,
    clickedComic,
    clickedIllust
  } = useContext(AppDataContext);
  // const { searchData, clickedComic, clickedIllust, paramsData } = useContext(AppDataContext);

  const [resultKeyword, setResultKeyword] = useState();

  const url = router.asPath;
  const keyword = router.query.text;

  // 콘텐츠 렌더링
  const [initRender, setInitRender] = useState([]);
  const [viewerRender, setViewerRender] = useState([]);
  const [userRender, setUserRender] = useState([]);
  const [onlyUser, setOnlyUser] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [stopData, setStopData] = useState(true);
  const [lastContentId, setLastContentId] = useState(null);
  const [lastUserId, setLastUserId] = useState(null);

  // 유저 설정 가능한 fillter

  // 필터링
  const [filtering, setFiltering] = useState('');

  // fetch
  const [initDataLoading, initialApi, , initialFetch] = useAxiosFetch();
  const [viewerDataLoading, viewerApi, , viewerFetch] = useAxiosFetch();
  const [userLoading, userApi, , userFetch] = useAxiosFetch();

  // scroll
  const [page, scroll, ,setPage] = useScroll();
  const initSize = 35;
  useEffect(() => {
    searchData ? setResultKeyword(searchData) : setResultKeyword(keyword);
  }, [searchData, keyword]);

  // 메인 데이터
  const fetchStore = () => {
    if (resultKeyword) return;
    const params = {
      type: filtering || '',
      size: 35,
      latestId: lastContentId || null,
    };

    if(type === 'MAIN'){
      initialFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`, 'get', null, null, params);
    } else if(type === 'VIEWER') {
      if(!contentsRender) return;
        viewerFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`, 'get', null, null, params);
    }
  };

  useEffect(() => {
    if (!stopData) return;
    // if (type !== 'MAIN' || type !== 'VIEWER') return;
    fetchStore();
  }, [page, filtering, stopData, contentsRender]);

  // 검색 데이터
  const searchStore = () => {
    if (!resultKeyword) return;
    const params = {
      type: 'Board',
      size: 35,
      latestId: lastContentId || null,
      category: null,
      q: resultKeyword,
    };

    if (searchType === 'trend') {
      alert('서비스 개발 중이에요 (Preparing to open the service)');
      return;
    } else if (searchType === 'latest') {
      params.category = filtering;
      initialFetch(`${process.env.NEXT_PUBLIC_API_URL}/search`, 'get', null, null, params);
    
    } else if (searchType === 'users') {
      params.type = 'User';
      userFetch(`${process.env.NEXT_PUBLIC_API_URL}/search`, 'get', null, null, params);
    } else return;
  };

  useEffect(() => {
    if (!stopData) return;
    if (type !== 'SEARCH') return;
    searchStore();
  }, [page, filtering, stopData, searchType, resultKeyword]);

  // 데이터 분리 렌더링
  const devideTypeData = () => { // 메인 전용
    if (searchType === 'users' || type === 'VIEWER') return;
    initialApi && setInitRender(initRender ? [...initRender, ...initialApi?.data] : [...initialApi?.data]);
  };

  const viewerTypeData = () => { // 뷰어 전용
    if (searchType === 'users' || type === 'MAIN') return;
    viewerApi && setViewerRender(viewerRender ? [...viewerRender, ...viewerApi?.data] : [...viewerApi?.data]);
  };

  const userTypeData = () => {

    if(searchType !== 'users') return;
    userApi && setUserRender(userRender ? [...userRender, ...userApi?.data] : [...userApi?.data]);
  }

  useEffect(() => { // 메인 전용
    devideTypeData();
  }, [initialApi, type]);

  useEffect(() => { // 뷰어 전용
    viewerTypeData();
  }, [viewerApi, type]);


  useEffect(() => {
    userTypeData();
  }, [userApi, searchType]);

  // latestId 설정
  useEffect(() => {
    // if(type.match(['MAIN', 'SEARCH'])) return;
    initialApi && setLastContentId(initialApi?.data[initialApi?.data?.length - 1]?._id);
  }, [type, page, initialApi]);

  useEffect(() => {
    if(type !== 'VIEWER') return;
    viewerApi && setLastContentId(viewerApi?.data[viewerApi?.data?.length - 1]?._id);
  }, [page, viewerApi]);

  useEffect(() => {
    if(searchType !== 'users' || type !== 'SEARCH') return;
    userApi && setLastUserId(userApi?.data[userApi?.data?.length - 1]?._id);
  }, [page, userApi]);

  useEffect(() => {
    initialApi?.data?.length < initSize && setStopData(false);
  }, [initialApi]);

  useEffect(() => {
    viewerApi?.data?.length < initSize && setStopData(false);
  }, [viewerApi]);

  useEffect(() => {
    userApi?.data?.length < initSize && setStopData(false);
  }, [userApi]);

  useEffect(() => {
    setInitRender(null);
    setLastContentId(null);
    if (clickedComic && !clickedIllust) {
      setFiltering('Comic');
    } else if (!clickedComic && clickedIllust) {
      setFiltering('Illust');
    } else {
      setFiltering('');
    }
  }, [clickedComic, clickedIllust]);

  useEffect(() => {
    if (searchType === 'users') return;
    setRenderList(initRender || viewerRender);
    
  }, [initRender, viewerRender, searchType]);

  useEffect(() => {
    if (searchType !== 'users') return;
      setOnlyUser(userRender);
    
  }, [userRender, searchType]);

  // 검색 탭 바뀔 때 마다 초기화
  useEffect(() => {
    setStopData(true);
  }, [type, searchType, filtering, url]);

  useEffect(() => {
    setPage(0)
    setUserRender(null);
    setInitRender(null);
    setLastContentId(null);
    setLastUserId(null)

  }, [type, searchType, resultKeyword, url]);

  // 받은 데이터 각 컴포넌트에 뿌려서 렌더링
  useEffect(() => {
    if (searchType === 'users') {
      setRenderComponent(onlyUser?.map((item, index) => <ContentsUserForm searchData={item} key={index} />));
    } else {
      setRenderComponent(renderList?.map((item, index) => <MainContent key={index} contentData={item} />));
    }
    return () => setRenderComponent();
  }, [renderList, onlyUser, searchType]);

  const RefReturn = () => {
    if(initDataLoading) return
    if(userLoading) return
    if(viewerDataLoading) return
      return <RefLayout {...scroll} />
  }

  return (
    <>
      <Layout>
        <LayoutInner>
          {renderComponent?.length !== 0 ? (
            <MasonryBox>{renderComponent}</MasonryBox>
          ) : (
            <NoResultWrap>
              <NoResultImg />
            </NoResultWrap>
          )}
        </LayoutInner>
        { initDataLoading || userLoading && (
          <DummyLayout>
            <Progress />
          </DummyLayout>
        ) }
        { RefReturn() }
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
  }
`;

const RefLayout = styled.div`
  display: flex;
  color: #222;
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
