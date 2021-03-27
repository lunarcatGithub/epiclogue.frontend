import React, { useState } from 'react';
import styled from 'styled-components';

// 컴포넌트 import
import ListForm from '../Utils/List__Form';

// utils

export const AdminUsers = () => {
  //data
  const [userContentsData, setUserContentsData] = useState([
    { id: 1, email: 'asd@ads.com', _id: `@asasdd`, type: '정지', join: '2020-11-28', ban: false },
    { id: 2, email: 'ascvcvd@xcvx.com', _id: `@adf`, type: '탈퇴', join: '2021-01-02', ban: true },
    { id: 3, email: 'asxzcvzxd@ads.com', _id: `@qwerrt`, type: '정상', join: '2021-02-28', ban: false },
  ]);

  const categorySelec = [
    { title: '전체', value: 'all' },
    { title: '정상', value: 'green' },
    { title: '정지', value: 'banned' },
    { title: '탈퇴', value: 'reave' },
  ];

  const searchFilter = [
    { title: '전체', value: 'all' },
    { title: '이메일', value: 'email' },
    { title: '아이디', value: 'id' },
    { title: '제목', value: 'title' },
  ];

  const [toggleSelect, setToggleSelect] = useState();

  const dataHadler = (e, type) => {
    userContentsData?.forEach((_contentsData) => {
      if (Number(toggleSelect) === _contentsData.id) {
        let data = userContentsData;
        if (type === 'main') {
          // 회원 탈퇴
          data.splice(Number(toggleSelect) - 1, 1);
          setUserContentsData(data);
        } else if (type === 'sub') {
          // 회원 정지
          if (userContentsData.hide === true) {
            data.hide = false;
          } else {
            data.hide = true;
          }
          setUserContentsData(data);
        }
      } else {
        return;
      }
    });
  };

  const headerArr = ['번호', '이메일', '아이디', '회원유형', '가입일', '', '정지', '탈퇴'];

  return (
    <Layout>
      <LayoutInner>
        <ListForm
          type="USERS"
          contentsData={{
            headerArr,
            categorySelec,
            userContentsData,
            searchFilter,
            dataHadler,
            setToggleSelect,
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
