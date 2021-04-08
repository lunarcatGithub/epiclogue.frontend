import React, { useRef, useState } from 'react';
import styled from 'styled-components';

// 컴포넌트 import
import ListForm from '../Utils/List__Form';

// utils

export const AdminContents = () => {
  const tableRef = useRef();
  //toggle
  const [toggleSelect, setToggleSelect] = useState();

  const [userContentsData, setUserContentsData] = useState([
    { id: 1, email: 'asd@ads.com', _id: `@asasdd`, title: 'test', category: 'illus', date:'2020-08-02', view: 'view' },
    { id: 2, email: 'ascvcvd@xcvx.com', _id: `@adf`, title: 'cxvxcvxc', category: 'illus', date:'2020-08-02', view: 'hide' },
    { id: 3, email: 'asxzcvzxd@ads.com', _id: `@qwerrt`, title: 'xvzvc', category: 'comic', date:'2020-08-02', view: 'view' },
  ]);

  const categorySelec = [
    { title: '전체', value: 'all' },
    { title: '일러스트', value: 'illust' },
    { title: '코믹', value: 'comic' },
  ];
  const hideOrNot = [
    { title: '전체', value: 'all' },
    { title: '표시', value: 'view' },
    { title: '숨김', value: 'hide' },
  ];
  const searchFilter = [
    { title: '전체', value: 'all' },
    { title: '이메일', value: 'view' },
    { title: '아이디', value: 'hide' },
    { title: '제목', value: 'title' },
  ];
  const warnBtn = [
    { title: '삭제', value: 'remove' },
  ]

  const dataHadler = (e, type) => {
    userContentsData?.forEach((_contentsData) => {
      if (Number(toggleSelect) === _contentsData.id) {
        let data = userContentsData;
        if (type === 'main') {
          data.splice(Number(toggleSelect) - 1, 1);
          setUserContentsData(data);
        } else if (type === 'sub') {
          if (userContentsData.hide === true) {
            data.hide = false;
          } else {
            data.hide = true;
          }
          setUserContentsData(data);
        }
      } else return;
      
    });
  };

  const headerArr = ['번호', '이메일', '아이디', '제목', '카테고리', '작성일', '삭제'];


  return (
    <Layout>
      <LayoutInner>
        <ListForm
          type="CONTENTS"
          contentsData={{
            categorySelec,
            hideOrNot,
            searchFilter,
            userContentsData,
            headerArr,
            tableRef,
            setToggleSelect,
            //removed
            toggleSelect,
            userContentsData,
            setUserContentsData,
            warnBtn
          }}
        />
      </LayoutInner>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2em;
`;

const LayoutInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
