import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

// 컴포넌트 import
import OriginUserForm from './Upload__OriginUser';
import { useUrlMove } from '../Hook/useUrlMove';
import history from '../history';
import { ProgressSmall } from '../Utils/LoadingProgress';
import { langUploadCategory } from '../Languge/Lang.Upload';
import { LanguageContext, AlertContext } from '../../Component/Store/App_Store';
import UploadCategoryForm from './UploadCategory_Form';
import OriginUserSource from './Upload__Source';

// Hooks&&reducer import
import useFetchData from '../Hook/useFetchData';

// 아이콘 import
import { RoadDataContext } from '../Hook/useRoadDataContext';

export const uploadContext = React.createContext();

const UploadCategory = (props) => {
  const {categoryToggle, mergyImage, type, imageAdjust, urlToFileConvert, editorData, category, setCategory} = props;

  const { alertBool } = useContext(AlertContext);
  const { languageState } = useContext(LanguageContext);
  const { roadData, boardImg } = useContext(RoadDataContext);

  const _roadData = props.type === 'editor' ? [] : roadData;
  const uploadData = _roadData.uploadData;
  const boardUid = _roadData.boardUid;

  let _boardImg = props.type === 'editor' ? [] : boardImg;
  const location = useLocation();
  
  // 카테고리 선택 데이터
  const [boardTitle, setBoardTitle] = useState();
  const [boardBody, setBoardBody] = useState('');

  // 경고용
  const [alertTitle, setAlertTitle] = useState(false);
  const [goViewer] = useUrlMove();
  const [fileSize, setFileSize] = useState();

    // 카테고리 선택 데이터
    const [pub, setPublic] = useState(1);
    const [secondCreate, setSecondCreate] = useState(1);
  
    // 외부출처
    const [sourceToggleOn, setSourceToggleOn] = useState(false);
    const [sourceHref, setSourceHref] = useState(null);
  
    // 언어API 통신 관련
    const [sendLang, setSendLang] = useState();
  
    // 원작 여부
    const [originData, setOriginData] = useState();

    // 업로드 막기
    const [disabled, setDisabled] = useState(false);
  //fetch
  const [uploadLoding, uploadApi, uploadError, uploadFetch] = useFetchData();


  useEffect(() => {
    setOriginData(location.state || editorData);
  }, [location, editorData]);

  //언어 변수
  const { selectedLanguage, defaultLanguage } = languageState;
  const {
    titlePlaceholder,
    alertPlaceholder,
    descPlaceholder,
    uploadBtn,
    fileSizeErr,
    sourceAlert
  } = langUploadCategory;

  const _titlePlaceholder = titlePlaceholder[selectedLanguage] || titlePlaceholder[defaultLanguage],
    _alertPlaceholder = alertPlaceholder[selectedLanguage] || titlePlaceholder[defaultLanguage],
    _descPlaceholder = descPlaceholder[selectedLanguage] || descPlaceholder[defaultLanguage],
    _uploadBtn = uploadBtn[selectedLanguage] || uploadBtn[defaultLanguage],
    _fileSizeErr = fileSizeErr[selectedLanguage] || fileSizeErr[defaultLanguage],
    _sourceAlert = sourceAlert[selectedLanguage] || sourceAlert[defaultLanguage];

  const changeBoardTitle = (e) => {
    setBoardTitle(e.target.value);
    setAlertTitle(false);
  };

  const changeBoardBody = (e) => {
    setBoardBody(e.target.value);
  };

  const editorDevideHandler = (e) => {
    e.preventDefault();
    if(type === 'editor'){
      new Promise((res, rej) => {
        let adjustedData = imageAdjust()
        res(adjustedData)
      })
      .then((adjustedData) => {
        let merged = mergyImage(adjustedData)
        return merged
      })
      .then((merged)=>{
        let converted = urlToFileConvert(merged)
        return converted
      })
      .then((converted) => {
        // 에디터에서 받아온 이미지
        handleSubmit(converted)
      })
     } else {
       // 일반 업로드를 통해 받아온 이미지
      handleSubmit(_boardImg)
    }
  }

  const handleSubmit = (imageData) => {
    setDisabled(true);

    if (imageData?.length === 0) {
      alertBool({ type: 'UPLOADED_IMAGE', payload: true });
      setDisabled(false);
      return;
    }

    // ----- POST ------------------
    let sumByte = 0;
    for (let i = 0; i < imageData?.length; i++) {
      sumByte += imageData[i].img.size;
    }

    // 업로드 용량
    if (sumByte >= 52428800) {
      setFileSize(_fileSizeErr)
      setDisabled(false);
      return;
    } else {
      alertBool({ type: 'LOADING_PUSH', payload: true });

      let _uploadData = new FormData();
      for (let i = 0; i < imageData.length; i++) {
        _uploadData.append('boardImg', imageData[i].img);
      }
        _uploadData.append('boardTitle', boardTitle);
        _uploadData.append('boardBody', boardBody);
        _uploadData.append('category', category);
        _uploadData.append('pub', pub);
        _uploadData.append('language', sendLang);
        _uploadData.append('allowSecondaryCreation', secondCreate);
        _uploadData.append('sourceUrl', sourceHref);
        
        // 2차 창작 분류
        if(originData){
          if (originData.data.originUserId) {
          _uploadData.append('originUserId', originData?.data.originUserId._id);
          _uploadData.append('originBoardId', originData?.data.originBoardId._id);
        } else {
          _uploadData.append('originUserId', originData?.data.writer._id);
          _uploadData.append('originBoardId', originData?.boardUid);
        }
      }

      if (!_boardImg) {
        alertBool({ type: 'UPLOADED_IMAGE', payload: true });
        setDisabled(false);
        return;
      }

      if (!boardTitle) {
        alertBool({ type: 'UPLOADED_TITLE', payload: true });
        setDisabled(false);
        setAlertTitle(true);
        return;
      }
      
      // for (let [key, value] of _uploadData.entries()) {
      //   console.log(key, value);
      // }

        if (boardUid) {
          uploadFetch(`${process.env.REACT_APP_API_URL}/boards/${boardUid}/edit`, 'post', null, _uploadData);
        } else if (originData) {
          uploadFetch(`${process.env.REACT_APP_API_URL}/boards/sec`, 'post', null, _uploadData);
        } else {
          uploadFetch(`${process.env.REACT_APP_API_URL}/boards`, 'post', null, _uploadData);
        }
      setDisabled(false);
    }
  };
  useEffect(() => {
    if (uploadApi) {
      if (uploadApi?.result === 'ok') {
        alertBool({ type: 'UPLOADED_UPDATE', payload: true });
        goViewer(`/viewer/${uploadApi?.data._id}`);
        alertBool({ type: 'LOADING_PUSH', payload: false });
      } else {
        alertBool({ type: 'UPLOADED', payload: true });
        goViewer(`/viewer/${uploadApi?.data._id}`);
      }
    } else if (uploadApi?.result === 'error') {
      alertBool({ type: 'UPLOADED_FAIL', payload: true });
    } else {
      setDisabled(false);
      // goViewer(`/main`);
      return;
    }
  }, [uploadApi])


  useEffect(() => {
    if (_roadData && uploadData) {
      setBoardTitle(uploadData.boardTitle);
      setBoardBody(uploadData.boardBody);
      setCategory(Number(uploadData.category));
      setPublic(Number(uploadData.pub));
      setSecondCreate(uploadData.allowSecondaryCreation);
    }
  }, [_roadData, uploadData]);

  return (
    <uploadContext.Provider 
    value={{
      category,
      setCategory,
      setPublic,
      pub,
      setSecondCreate,
      secondCreate,
      setSendLang,
      sendLang,
      // 외부 출처
      sourceToggleOn,
      setSourceToggleOn,
      sourceHref,
      setSourceHref,
      //원작여부
      setOriginData,
      originData,
      //업로드 막기
      disabled,
      setDisabled
    }}
    >
      <ContentOptionBox>
        <ContentTitle alertTitle={alertTitle}>
          <TextAreaAutoSize
            alertTitle={alertTitle}
            placeholder={alertTitle ? _alertPlaceholder : _titlePlaceholder}
            name="boardTitle"
            onChange={changeBoardTitle}
            defaultValue={uploadData ? uploadData.boardTitle : ''}
            maxLength={50}
          />
        </ContentTitle>

        <ContentInfoBox>
          <ContentInfo defaultValue={uploadData ? uploadData.boardBody : ''} name="boardBody" onChange={changeBoardBody} placeholder={_descPlaceholder} />
        </ContentInfoBox>
        {/* 원작자 폼 */}
        {originData?.data ? <OriginUserForm originData={originData} /> : <OriginUserSource/>}
        
        <CategorySelectLayout>
          {/* 일러스트 & 만화 선택 카테고리 */}
          <UploadCategoryForm type='CONTENTS' initialNum={category} />
         
          {/* 작품 공개 or 비공개 선택 */}
          <UploadCategoryForm type='PUB' initialNum={pub} />

          {/* 2차 창작 허용 여부 */}
          {sourceToggleOn || originData ? null : <UploadCategoryForm type='SECONDARY' initialNum={secondCreate} />}
        
          {/* 작품의 언어 설정 */}
          <UploadCategoryForm type='LANGUAGE' initialNum={selectedLanguage || defaultLanguage}/>

        </CategorySelectLayout>
        <Form action="" onSubmit={editorDevideHandler} encType="multipart/form-data" autoComplete="off">
          <SubmitBox>
            <ArrowBtn onClick={() =>{
              location.pathname.match('/editor') ? categoryToggle(false) : history.goBack()
            }} />
             <AlertText>{ fileSize && fileSize }</AlertText>
            {sourceToggleOn && !fileSize && <AlertText>{ _sourceAlert }</AlertText>}
            
            <SubmitBtn>{disabled ? <ProgressSmall disabled={disabled} /> : _uploadBtn}</SubmitBtn>
          </SubmitBox>
        </Form>
      </ContentOptionBox>
    </uploadContext.Provider>
  );
};

/* 스타일 컴포넌트 영역 */
//레이아웃

// 작품 옵션 컨테이너
const ContentOptionBox = styled.section`
  display:flex;
  flex-direction:column;
  width: 100%;
  min-width: 420px;
  max-width: 480px;
  height: 100%;
  background: ${(props) => props.theme.color.backgroundColor};
  @media (max-width: 900px) {
    min-width: 100%;
    max-width: 100%;
    margin: 4px 0 0 0;
  }
`;
const ContentTitle = styled.div`
  width: 100%;
  height: auto;
  padding-top: 3px;
  background: ${(props) => props.theme.color.whiteColor};
  margin-bottom: 0.1em;
`;

//textarea autosize
const TextAreaAutoSize = styled.input.attrs({
  type: 'text',
})`
  display: flex;
  align-items: center;
  resize: none;
  width: 100%;
  height: 48px;
  padding: 8px 8px 8px 14px;
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  border: 2px solid ${(props) => (props.alertTitle ? props.theme.color.pinkColor : 'none')};

  &::placeholder {
    color: ${(props) => (props.alertTitle ? props.theme.color.middlePinkColor : props.theme.color.softBlackColor)};

    font-weight: ${(props) => props.theme.fontWeight.font700};
    user-select: none;
  }
`;

const ContentInfoBox = styled.div`
  display: flex;
  padding: 10px 16px;
  margin-bottom: 0.2em;
  background: ${(props) => props.theme.color.whiteColor};
`;

// 작품 설명란
const ContentInfo = styled.textarea.attrs({
  type: 'text',
  maxLength: 300,
})`
  width: 100%;
  min-height: 12em;
  height: auto;
  resize: none;
  font-weight: ${(props) => props.theme.fontWeight.font300};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.blackColor};
  &::placeholder {
    color: ${(props) => props.theme.color.softBlackColor};
    font-weight: ${(props) => props.theme.fontWeight.font300};
    user-select: none;
  }
  &::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera*/
  }
`;

// 옵션 선택란
const CategorySelectLayout = styled.div`
  display: flex;
  height: auto;
  flex-flow: column;
  padding: 1em 0.5em;
  margin-bottom: 0.2em;
  background: ${(props) => props.theme.color.whiteColor};
`;

// 카테고리 선택 모달

const Form = styled.form`
  user-select: none;
`;

const SubmitBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
padding: 7px;
 background: ${(props) => props.theme.color.whiteColor};
  @media (max-width: 900px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: ${(props) => props.theme.boxshadow.nav};
    z-index: 999;
  }
`;

const AlertText = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.pinkColor};
  margin-left: 12px;
  @media (max-width: 900px) {
    padding-left: 10px;
    font-size: ${(props) => props.theme.fontSize.font12};
    margin-left: 6px;
  }
`;

const SubmitBtn = styled.button.attrs({
  type: 'submit',
})`
  width: auto;
  height: auto;
  padding: 8px 20px;
  border-radius: 25px;
  white-space: nowrap;
  margin-right: 16px;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  font-size: ${(props) => props.theme.fontSize.font15};
  color: ${(props) => props.theme.color.whiteColor};
  background: ${(props) => props.theme.color.orangeColor};
  cursor: pointer;
`;

const ArrowBtn = styled.div`
  display: none;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-left: 8px;
  cursor: pointer;
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    margin-left: 8px;
    border-top: 3px solid ${(props) => props.theme.color.softBlackColor};
    border-right: 3px solid ${(props) => props.theme.color.softBlackColor};
    transform: rotate(-135deg);
  }
  @media (max-width: 900px) {
    display: flex;
  }
`;

export default UploadCategory;