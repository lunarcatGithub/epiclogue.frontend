import React, { useContext, useState, useEffect } from 'react';

// 컴포넌트 import
import MypageForm from './Mypage__Form';

// Hooks&&reducer import
import { AppDataContext, LanguageContext, AlertContext } from '@store/App_Store';
import useAxiosFetch from '@hooks/useFetchData';

const MypageGeneral = () => {
  const { loginOn } = useContext(AppDataContext);
  const {availableLangPatch} = useContext(LanguageContext)
  const {alertPatch} = useContext(AlertContext)
  const [formData, setFormData] = useState();
  const [isLogin, setIsLogin] = useState();

  // fetch
  const [, , , langFetch] = useAxiosFetch();

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
      const listArr = data?.filter((each) => each.isChecked).map((list) => list.value);
      
      if(listArr.length === 0){
        alertPatch({type: 'FAIL_LANGUAGE_UPDATE', payload:true });
        return;
      } else {
        formData.append('userAvailableLang', listArr);
        langFetch(`${process.env.NEXT_PUBLIC_API_URL}/user/editProfile`, 'post', null, formData, null);
        availableLangPatch({type:'AVAILABLE_LANG', payload:listArr});
        alertPatch({type: 'SUCCESS_LANGUAGE_UPDATE', payload:true });
      }

    }
  };

  useEffect(() => {
    loginOn && setIsLogin(loginOn);
  }, [loginOn]);

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

export default MypageGeneral;
