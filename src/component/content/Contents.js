import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// 컴포넌트 import
import { Progress } from '@utils/LoadingProgress';
import ContentsForm from './Contents__Form';
import ContentsUserForm from './Contents__UserForm';

// Hooks&&reducer import
import { AppDataContext, LanguageContext } from '@store/App_Store';
import useAxiosFetch from '@hooks/useAxiosFetch';

// utils
import {dataHiddenFilter} from '@utils/dataHidden'

let initialCount = 35;

const Contents = (props) => {
  const { type, searchType, boardItem } = props;

  //차후 viewer === 더보기 같으면 filtering

  const router = useRouter();
  const loader = useRef(null);
  const { searchData, clickedComic, clickedIllust, myboardData } = useContext(AppDataContext);
  const {availableLanguage} = useContext(LanguageContext)

  const [resultKeyword, setResultKeyword] = useState();

  const url = router.asPath;
  const keyword = router.query.text;

  const [initialLoading, setInitialLoading] = useState(false);
  const [hasMoreLoading, setHasMoreLoading] = useState(false);
  const [contentsList, setContentsList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [items, setItems] = useState(initialCount);
  const [hasMore, setHasMore] = useState(false);
  // 마지막 콘텐츠id 감지하기
  const [lastContentId, setLastContentId] = useState({initId:null, comicId:null, illustId:null});
  // 콘텐츠 리스트
  const [comicList, setComicList] = useState([]);
  const [illustList, setIllustList] = useState([]);
  const [initialList, setInitialList] = useState([]);

  // fetch
  const [, initialApi, , initialFetch] = useAxiosFetch();
  const [, comicApi, , comicFetch] = useAxiosFetch();
  const [, illustApi, , illustFetch] = useAxiosFetch();
  const [, searchApi, , searchFetch] = useAxiosFetch();
  const [, userApi, , userFetch] = useAxiosFetch();
  const [page, setPage] = useState(0);
  // console.log('illustApi', illustApi)
  console.log('comicList', comicList)
  console.log('initialApi', initialApi)

  // devide type
  const devideTypeHandler = () => {
    setInitialLoading(true);
    switch (type) {
      case 'MAIN':
        if (initialApi && clickedComic && clickedIllust) {
          if(!initialApi) return

          let initData = initialApi?.data
          latesIdDetect(initData, 'initial');
          setLastContentId({initId:initData[initData?.length - 1]?._id, comicId:0, illustId:0})
        } else if ((comicApi && clickedComic) && !clickedIllust) {
          if(!comicApi) return
          let comicData = comicApi?.data
          latesIdDetect(comicData, 'comic');
          setLastContentId({initId:0, comicId:comicData[comicData?.length - 1]?._id, illustId:0})
        } else if ((illustApi && clickedIllust) && !clickedComic) {
          if(!illustApi) return
          let illustData = illustApi?.data
          latesIdDetect(illustData, 'illust');
          setLastContentId({initId:0, comicId:0, illustId:illustData[illustData?.length - 1]?._id})
        }
        
        // latesIdDetect(initialApi?.data || comicApi?.data || illustApi?.data, 'content');
        
        break;

      case 'MYBOARD':
        latesIdDetect(myboardData, 'content');
      
        break;
      case 'VIEWER':
        // 향후 알고리즘 작품 (현재 메인과 통합)
        break;

      case 'SEARCH':
        // if (searchType === 'users') {
        //   renderDataHandler(userApi?.data, 'user');
        // } else {
        //   renderDataHandler(searchApi?.data, 'content');
        // }
        latesIdDetect(userApi?.data || searchApi?.data, searchType === 'users' ? 'user' : 'content')
        break;

      default:
        break;
    }
    setInitialLoading(false);
  };

  const latesIdDetect = (data, type) => {
    if(!data || data.length === 0) return;
    if(type === 'comic'){
      setComicList([...comicList, ...data])
      setRenderList(comicList)
      setIllustList([])
      setInitialList([])

    } else if(type === 'illust') {
      setIllustList([...illustList, ...data])
      setRenderList(illustList)
      setComicList([])
      setInitialList([])

    } else {
      setInitialList([...initialList, ...data])
      setRenderList(initialList)
      setIllustList([])
      setComicList([])
    }
      // setLastContentId(data ? data[data?.length - 1]._id : null)
  }

  useEffect(() => {
    latesIdDetect()
  }, [initialList])

  useEffect(() => {
    devideTypeHandler();
    return () => devideTypeHandler();
  }, [initialApi, comicApi, illustApi, myboardData, userApi, searchApi, searchType]);

  // 코믹 && 일러스트 요청
  console.log('lastContentId', lastContentId)
  useEffect(() => {
    setItems(initialCount);
    setHasMore(true);
    if (clickedComic && !clickedIllust) {
      comicFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards?type=Comic&size=${items}${lastContentId?.comicId && `&latestId=${lastContentId?.comicId}`}`, 'get', null, null, null);
    } else if (!clickedComic && clickedIllust) {
      illustFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards?type=Illust&size=${items}${lastContentId?.illustId && `&latestId=${lastContentId?.illustId}`}`, 'get', null, null, null);
    } else {
      initialFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards?size=${items}${lastContentId?.initId && `&latestId=${lastContentId?.initId}`}`, 'get', null, null, null);
    }
  }, [clickedComic, clickedIllust, page]);

  // 검색단어 가져오기
  useEffect(() => {
    searchData ? setResultKeyword(searchData) : setResultKeyword(keyword);
  }, [searchData, keyword]);

  const fixedEncodeURIComponent =(str)=> {
    return str.replace(/[!'()*]/gi, function (c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

  // 검색단어로 데이터 요청하기
  useEffect(() => {
    setItems(initialCount); 
    setInitialLoading(true);
    setHasMore(true);

    if (resultKeyword) {
      const Url = keyword;
      const encodedUrl = encodeURIComponent(Url);
      const result = fixedEncodeURIComponent(encodedUrl);
      if (url.match('/search/trend') && type === 'SEARCH' && searchType === 'trend') {
        searchFetch(`${process.env.NEXT_PUBLIC_API_URL}/search?type=Board&q=${null}`, 'get', null, null, null);
      } else if (url.match('/search/latest') && type === 'SEARCH' && searchType === 'latest') {
        searchFetch(`${process.env.NEXT_PUBLIC_API_URL}/search?type=Board&q=${result}`, 'get', null, null, null);
      } else if (url.match('/search/users') && type === 'SEARCH' && searchType === 'users') {
        userFetch(`${process.env.NEXT_PUBLIC_API_URL}/search?type=User&q=${result}`, 'get', null, null, null);
      }
      setInitialLoading(false);
    }
  }, [searchType, resultKeyword, searchData, router.asPath]);

  // 스크롤 이벤트

  // overver 감지
  const handleObserver = (entities) => {

    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    if(initialApi?.data?.lenght === 0) return

    let options = {
      root: null,
      rootMargin: '10px',
      threshold: 0.8,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [loader.current]);

  let renderContents;
  if (searchType === 'users') {
    renderContents = renderList?.map((item, index) => <ContentsUserForm searchData={item} key={index} />);
  } else {
    renderContents = renderList?.map((item, index) => <ContentsForm key={index} contentData={item} />);
  }

  return (
    <>
      <Layout>
        {
          !url.match('main') && !url.match('myboard') && renderList?.length === 0 && (
            <NoResultWrap>
              <NoResultImg />
            </NoResultWrap> )
        }
        {
          initialLoading && (
            <DummyLayout>
              <Progress />
            </DummyLayout> )
        }
        <LayoutInner>
          <MasonryBox >{renderContents}</MasonryBox>
        </LayoutInner>
        {
        hasMoreLoading && (
          <DummyLayout>
            <Progress />
          </DummyLayout> )
        }
        {
          hasMore && (
            <>
              <RefLayout ref={loader}></RefLayout>
            </> )
        }
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
  width: 1px;
  height: 1px;
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
