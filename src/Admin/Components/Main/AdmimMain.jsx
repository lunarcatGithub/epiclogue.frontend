import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// context
import { AdminContext } from '../Store/Admin_Context';

// 컴포넌트 import
import { Dashboard } from '../Dashboard/Dashboard';
import { AdminContents } from '../Contents/AdminContents';
import { AdminReport } from '../Report/AdminReport';
import { AdminCopyright } from '../Copyright/Copyright';
import { AdminReportResult } from '../Report/AdminReport_Result';
import { CopyRightReportResult } from '../Copyright/Copyright_Result';
import { AdminUsers } from '../User/User';


// hooks
import { useUrlMove } from '@hooks/useUrlMove';


import GNB from '@Component/GNB/Gnb';
import { Nav } from '@Component/NAV/Nav';

export const AdmimMain = () => {
  const router = useRouter();
  const { isAdmin } = useContext(AdminContext);

  const [goURL] = useUrlMove();

  const [viewTab, setViewTab] = useState();

  useEffect(() => {
    if (router.query.tab === 'dashboard') {
      setViewTab(<Dashboard />);
    } else if (router.query.tab === 'contents') {
      setViewTab(<AdminContents />);
    } else if (router.query.tab === 'users') {
      setViewTab(<AdminUsers />);
    } else if (router.query.tab === 'reports') {
      setViewTab(<AdminReport />);
    } else if (router.query.tab === 'copyright') {
      setViewTab(<AdminCopyright />);
    } else if (router.query.tab === 'copyrightresult') {
      setViewTab(<CopyRightReportResult/>);
    }else if (router.query.tab === 'reportsresult') {
      setViewTab(<AdminReportResult/>);
    }
  }, [router.query]);

  useEffect(() => {
    // !isAdmin && alert('넌 어드민이 아니야');
    !isAdmin && goURL({pathname:'/'});

  }, [isAdmin])

  return (
    <Layout> 
       { isAdmin &&
        <>
          <GNB />
          <LayoutDivision>
            <Nav routeCheck={router.query.tab} />
            <LayoutInner>{viewTab}</LayoutInner>
          </LayoutDivision>
        </>
      }
    </Layout>
  );
};

// 스타일 영역
// 공통
// 레이아웃
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const LayoutDivision = styled.section`
  display: flex;
  width: 100%;
`;
const LayoutInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* padding:30px; */
  margin: 0 1.5em;

  @media (max-width: 480px) {
    padding: 8px;
    margin: 0;
  }
`;
