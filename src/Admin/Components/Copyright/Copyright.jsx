import React, { useState } from 'react';
import styled from 'styled-components';

// 컴포넌트 import
import ListForm from '../Common/List__Form';

// utils

export const AdminCopyright = () => {
  //data
  const [userContentsData, setUserContentsData] = useState([
    { id: 1, email: 'asd@ads.com', _id: `@asasdd`, title: 'adasd', result:'미정', date: '2020-11-28', ban: false },
    { id: 2, email: 'ascvcvd@xcvx.com', _id: `@adf`, title: '1234', result:'삭제', date: '2021-01-02', ban: true },
    { id: 3, email: 'asxzcvzxd@ads.com', _id: `@qwerrt`, title: 'qqqqq', result:'미정', date: '2021-02-28', ban: false },
  ]);

  const categorySelec = [
    { title: '전체', value: 'all' },
    { title: '정상', value: 'normal' },
    { title: '정지', value: 'banned' },
    { title: '탈퇴', value: 'leave' },
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

  const headerArr = ['번호', '아이디', '이메일', '제목', '처리결과', '신고날짜', '정지', '삭제', '탈퇴'];
  const warnBtn = [
    { title: '메일발송', value: 'sendMail' },
    { title: '정지', value: 'ban' },
    { title: '탈퇴', value: 'leave' },
    { title: '삭제', value: 'remove' },
]
  return (
    <Layout>
      <LayoutInner>
        <ListForm
          type="COPYRIGHT"
          contentsData={{
            headerArr,
            categorySelec,
            userContentsData,
            searchFilter,
            dataHadler,
            setToggleSelect,
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
