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

const Contents = ({ type, searchType }) => {
  const router = useRouter();
  const { renderComponent, setRenderComponent, searchData, clickedComic, clickedIllust } = useContext(AppDataContext);
  // const { searchData, clickedComic, clickedIllust, paramsData } = useContext(AppDataContext);

  const [resultKeyword, setResultKeyword] = useState();

  const url = router.asPath;
  const keyword = router.query.text;

  // 콘텐츠 렌더링
  // const [renderComponent, setRenderComponent] = useState(null);
  const [initRender, setInitRender] = useState([]);
  const [userRender, setUserRender] = useState([]);
  const [onlyUser, setOnlyUser] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [lastContentId, setLastContentId] = useState(null);
  const [stopData, setStopData] = useState(true);

  // 유저 설정 가능한 fillter

  // 필터링
  const [filtering, setFiltering] = useState('');

  // fetch
  const [initDataLoading, initialApi, , initialFetch] = useAxiosFetch();

  // scroll
  const [page, scroll] = useScroll();

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
    initialFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`, 'get', null, null, params);
  };

  useEffect(() => {
    if (!stopData) return;
    if (type !== 'MAIN') return;
    fetchStore();
  }, [page, filtering, stopData]);

  // 검색 데이터
  const searchStore = () => {
    if (!resultKeyword) return;
    const params = {
      type: 'Board',
      size: 35,
      latestId: lastContentId,
      category: null,
      q: resultKeyword,
    };

    if (searchType === 'trend') {
      alert('서비스 개발 중이에요 (Preparing to open the service)');
      return;
    } else if (searchType === 'latest') {
      params.category = filtering;
    } else if (searchType === 'users') {
      params.type = 'User';
    } else return;

    initialFetch(`${process.env.NEXT_PUBLIC_API_URL}/search`, 'get', null, null, params);
  };

  useEffect(() => {
    if (!stopData) return;
    if (type !== 'SEARCH') return;
    searchStore();
  }, [page, filtering, stopData, searchType]);

  // 데이터 분리 렌더링
  const devideTypeData = () => {
    if (searchType === 'users') {
      initialApi && setUserRender(userRender ? [...userRender, ...initialApi?.data] : [...initialApi?.data]);
    } else {
      initialApi && setInitRender(initRender ? [...initRender, ...initialApi?.data] : [...initialApi?.data]);
    }
  };

  useEffect(() => {
    devideTypeData();
  }, [initialApi, type]);

  // latestId 설정
  useEffect(() => {
    initialApi && setLastContentId(initialApi?.data[initialApi?.data?.length - 1]?._id);
  }, [page, initialApi]);

  useEffect(() => {
    initialApi?.data?.length === 0 && setStopData(false);
  }, [initialApi]);

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
    if (searchType === 'users') {
      setOnlyUser(userRender);
    } else {
      setRenderList(initRender);
    }
  }, [initRender, userRender, searchType]);

  // 검색 탭 바뀔 때 마다 초기화
  useEffect(() => {
    setStopData(true);
  }, [type, searchType, filtering, url]);

  useEffect(() => {
    // setRenderList(null)
    // setOnlyUser(null)
    setUserRender(null);
    setInitRender(null);
    setLastContentId(null);
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

  return (
    <>
      <Layout>
        <LayoutInner>
          {!url.match('main') && renderComponent?.length !== 0 ? (
            <MasonryBox>{renderComponent}</MasonryBox>
          ) : (
            <NoResultWrap>
              <NoResultImg />
            </NoResultWrap>
          )}
        </LayoutInner>
        {initDataLoading && (
          <DummyLayout>
            <Progress />
          </DummyLayout>
        )}
        {!initDataLoading ? <RefLayout {...scroll} /> : null}
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
