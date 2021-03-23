import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

// 컴포넌트 import
import MypageForm from './Mypage__Form';

// Hooks&&reducer import
import { AppDataContext } from '@store/App_Store';
import useAxiosFetch from '@hooks/useFetchData';

const MypageGeneral = () => {
  const { loginOn } = useContext(AppDataContext);
  const [formData, setFormData] = useState();
  const [isLogin, setIsLogin] = useState();

  // fetch
  const [langLoding, langApi, langError, langFetch] = useAxiosFetch();

  // 차후 살릴 수도 있음
  // const countryList = [
  //     {id:1, title:'대한민국', value:'korea'},
  //     {id:2, title:'日本', value:'japan'},
  //     {id:3, title:'America', value:'usa'},
  //     {id:4, title:'中国-简体', value:'cn-Simplified'},
  //     {id:5, title:'中国-繁體', value:'cn-Traditional'},
  // ]
  const submit = (e, type, data) => {
    e.preventDefault();
    if (!loginOn) return;
    let formData = new FormData();
    if (type === 'language') {
      formData.append('userDisplayLang', data);
      langFetch(`${process.env.NEXT_PUBLIC_API_URL}/user/editProfile`, 'post', null, formData, null);
    } else if (type === 'interest') {
      let listArr = [];
      data.forEach( list => {
        if(list.isChecked) listArr.push(list.value)
      });
    }
  };

  useEffect(()=> {
    loginOn && setIsLogin(loginOn)
  },[loginOn])

  return (
    <>
      {/* 일반 언어 설정 */}
      <MypageForm type="language" formDatas={{ formData, setFormData, submit }} />
      {/* 관심 언어 설정 */}
      <MypageForm type="interest" formDatas={{ formData, setFormData, submit }} />
      {/* 뮤트 설정 */}
      {isLogin && <MypageForm type="mute" />}
    </>
  );
};

//공통
// 레이아웃
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default MypageGeneral;
