import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import qs from 'query-string';

// 컴포넌트 import
import ConfirmPopup from '@utils/ConfirmPopup';

// Hooks&&reducer import
import useAxiosFetch from '@hooks/useAxiosFetch';

export function FindPass() {
  const [accessConfirm, setAccessConfirm] = useState(false);

  //fetch
  const [findPassLoding, findPassApi, findPassError, findPassFetch] = useAxiosFetch();

    useEffect(() => {
        let query = qs.parse(window.location.search)
        accessConfirm &&  findPassFetch(
            `${process.env.API_URL}/auth/findPass`, 
            'get,', 
            null, 
            null, 
            {email: query.email, token: query.token}
          )
        }, [])

        useEffect(()=> {
          findPassApi && console.log(findPassApi)
          findPassError && alert(findPassError)
        },[findPassApi, findPassError])

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
    )
}

// 공통

// 레이아웃
const Layout = styled.div`
  display: flex;
  position:absolute;
  top:0;
  left:0;
  width: 100%;
  height:100%;
`;

const LayoutInner = styled.div`
  display: flex;
  width:100%;
  height:100%;
  background:#888888;

`;
