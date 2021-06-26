import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

// 컴포넌트 import
import ListForm from '../Common/List__Form';

// hooks
import useAxiosFetch from '@hooks/useAxiosFetch';

// reduce
import { AdminContext } from '../Store/Admin_Context';

export const AdminCopyright = () => {
  const { setIsAdmin, copyrightData, setCopyrightData } = useContext(AdminContext);

  //data
  const [userContentsData, setUserContentsData] = useState([
    { id: 1, email: 'asd@ads.com', _id: `@asasdd`, title: 'adasd', date: '2020-11-28', ban: false },
    { id: 2, email: 'ascvcvd@xcvx.com', _id: `@adf`, title: '1234', date: '2021-01-02', ban: true },
    { id: 3, email: 'asxzcvzxd@ads.com', _id: `@qwerrt`, title: 'qqqqq', date: '2021-02-28', ban: false },
  ]);
  console.log(copyrightData);
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
  // fetch
  const [ , reportApi, reportError, reportFetch] = useAxiosFetch();

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
  useEffect(() => {
    const params = {
      size:30,
      page:0,
      isCopyright:true
    }
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/report`;
    reportFetch(URL, 'get', null, null, params);
    }, []);

  useEffect(() => {
    if(reportApi?.result === 'ok'){
      setIsAdmin(true);
      setCopyrightData(reportApi?.data);

    } else if(reportError?.status === 401) {
      setIsAdmin(false);

    } else {
      return;
    }
  }, [reportApi, reportError]);

  const headerArr = ['번호', '아이디', '신고날짜', '처리하기'];
  const buttonType = [
    {title:'처리', value:'SanctionsHandle'}
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
            buttonType
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
