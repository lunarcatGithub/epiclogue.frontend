import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// 컴포넌트 import
import ConfirmPopup from '@utils/ConfirmPopup';

// Hooks&&reducer import
import useAxiosFetch from '@hooks/useAxiosFetch';

export function FindPass() {
  const [accessConfirm, setAccessConfirm] = useState(false);
  const router = useRouter();

  //fetch
  const [findPassLoding, findPassApi, findPassError, findPassFetch] = useAxiosFetch();

  useEffect(() => {
    const { email, token } = router.query;
    accessConfirm && findPassFetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/findPass`, 'get,', null, null, { email, token });
  }, [router.query]);

  useEffect(() => {
    // findPassApi && console.log(findPassApi);
    findPassError && alert(findPassError);
  }, [findPassApi, findPassError]);

  return (
    <Layout>
      <LayoutInner>
        <ConfirmPopup
          handleModal={true}
          setAccessConfirm={setAccessConfirm}
          type={'PWCHANGE'}
          // pw = {handleuserPwNew}
          // repw = {handleUserPwNewRe}
        />
      </LayoutInner>
    </Layout>
  );
}

// 공통

// 레이아웃
const Layout = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LayoutInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #888888;
`;
