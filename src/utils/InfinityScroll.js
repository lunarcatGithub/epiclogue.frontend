import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

// 컴포넌트 import

export default function InfinityScroll() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(20);
  const [preItems, setPreItems] = useState(20);

  const [preUrl, setPreUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  const API = () => {

  };
  const pageHeight = useCallback(() => {
    let scrollHT = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientheight = Math.max(document.documentElement.clientHeight);

    if (scrollTop + clientheight > scrollHT - 150) {
      setItems(items + 20);
      let slice = coverUrl.slice(items, items + 20);
      // let push = preUrl.concat()
      const newArr = [...preUrl, ...slice];
      setPreUrl(newArr);
    }
  }, [preUrl]);

  useEffect(() => {
    window.addEventListener('scroll', pageHeight, true);
    return window.addEventListener('scroll', pageHeight, true);
  }, [pageHeight]);

  useEffect(() => {
    API();
  }, []);

  return (
    <Layout>
      <Contents>
        <ImgBox>
          {preUrl
            ? preUrl.map((i) => (
                <ImgLayout key={i.id}>
                  <Img src={i.author_url} />
                </ImgLayout>
              ))
            : ''}
        </ImgBox>

        <DummyLayout>
          {/* <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock />
          <DummyBlock /> */}
        </DummyLayout>
      </Contents>
    </Layout>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
`;

const Contents = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 180px;
`;
const DummyLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
const DummyBlock = styled.div`
  display: block;
  width: 140px;
  height: 140px;
  margin-bottom: 8px;
  background: #555555;
`;
const ImgBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;
const ImgLayout = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  background: #9999;
  margin: 8px;
`;

const Img = styled.span`
  width: 100%;
  height: auto;
`;
