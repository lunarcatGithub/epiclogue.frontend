import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// 컴포넌트 import
import OriginUserForm from './Upload__OriginUser';
import { useUrlMove } from '@hooks/useUrlMove';
import { ProgressSmall } from '@utils/LoadingProgress';
import { LanguageContext, AlertContext } from '@store/App_Store';
import UploadCategoryForm from './UploadCategory_Form';
import OriginUserSource from './Upload__Source';
import UploadLanguage from './Upload.Language';

// Hooks&&reducer import
import useFetchData from '@hooks/useFetchData';

export const uploadContext = React.createContext();

const UploadCategory = (props) => {
  const { editData, boardImg, categoryToggle, mergyImage, type, imageAdjust, urlToFileConvert, editorData, editorUid } = props;
  const router = useRouter();

  // 직접 업로드 하기에서 가져온 데이터
  const { data, boardUid, _type } = router.query;

  const { alertPatch } = useContext(AlertContext);

  // 카테고리 선택 데이터
  const [boardTitle, setBoardTitle] = useState();
  const [boardBody, setBoardBody] = useState('');
  const [pub, setPublic] = useState(1);
  const [secondCreate, setSecondCreate] = useState(1);
  const [category, setCategory] = useState(0);

  // 경고용
  const [alertTitle, setAlertTitle] = useState(false);
  const [goViewer] = useUrlMove();
  const [fileSize, setFileSize] = useState();
  // type [noneEditor(직접업로드), upload(기본업로드), editor(에디터 업로드)]
  const [uploadType, setUploadType] = useState(type || _type);

  // 외부출처
  const [sourceToggleOn, setSourceToggleOn] = useState(false);
  const [sourceHref, setSourceHref] = useState('');

  // 언어API 통신 관련
  const [sendLang, setSendLang] = useState();

  // 원작 여부
  const [originData, setOriginData] = useState();

  // 업로드 막기
  const [disabled, setDisabled] = useState(false);

  //fetch
  const [, uploadApi, ,uploadFetch] = useFetchData();

  useEffect(() => {
    
    switch (uploadType) {
      case 'noneEditor':
        setOriginData(JSON.parse(data))
        break;

      case 'modify':
        setOriginData(editData)
        break;
    
      case 'upload':
        setOriginData('')
        break;

      case 'editor':
        setOriginData(editorData)
        // setOriginData('')
        break;

      default:
        break;
    }

  }, [uploadType, editData, editorData])

  // useEffect(() => {
  //   setOriginData(uploadType === 'noneEditor' ? JSON.parse(data) : uploadData);
  // }, [router, editorData, data]);

  //언어 변수
  const { langState } = useContext(LanguageContext);
  const { selectedLanguage, defaultLanguage } = langState;

  const {
    _titlePlaceholder,
    _alertPlaceholder,
    _descPlaceholder,
    _uploadBtn,
    _fileSizeErr,
    _sourceAlert

  } = UploadLanguage()

  const changeBoardTitle = (e) => {
    setBoardTitle(e.target.value);
    setAlertTitle(false);
  };

  const changeBoardBody = (e) => {
    setBoardBody(e.target.value);
  };

  const editorDevideHandler = (e) => {
    e.preventDefault();
    if (uploadType === 'editor') {
      new Promise((res, rej) => {
        let adjustedData = imageAdjust();
        res(adjustedData);
      })
        .then((adjustedData) => {
          // 작업된 에디터 파일과 작업 되지 않은 이미지를 병합
          let merged = mergyImage(adjustedData);
          return merged;
        })
        .then((merged) => {
          // url을 file로 convert하는 작업
          let converted = urlToFileConvert(merged);
          return converted;
        })
        .then((converted) => {
          // 에디터에서 받아온 이미지 최종 업로더에 전달
          handleSubmit(converted);
        });
    } else {
      // 일반 업로드를 통해 받아온 이미지
      handleSubmit(boardImg);
    }
  };

  const handleSubmit = (imageData) => {
    setDisabled(true);

    if (imageData?.length === 0) {
      alertPatch({ type: 'UPLOADED_IMAGE', payload: true });
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
      setFileSize(_fileSizeErr);
      setDisabled(false);
      return;
    } else {
      alertPatch({ type: 'LOADING_PUSH', payload: true });

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

      // 2차 창작 및 수정하기 분류
      if (originData) {
        if (originData?.originUserId) {
          _uploadData.append('originUserId', originData?.originUserId._id);
          _uploadData.append('originBoardId', originData?.originBoardId._id);
        } else {
          _uploadData.append('originUserId', originData?.writer._id);
          _uploadData.append('originBoardId', editorUid || boardUid);
        }
      }

      if (uploadType !== 'editor' && !boardImg) {
        alertPatch({ type: 'UPLOADED_IMAGE', payload: true });
        setDisabled(false);
        return;
      }

      if (!boardTitle) {
        alertPatch({ type: 'UPLOADED_TITLE', payload: true });
        setDisabled(false);
        setAlertTitle(true);
        return;
      }

      for (let [key, value] of _uploadData.entries()) { // 전송 전 데이터 검사
        console.log(key, value);
      }
      console.log(uploadType)
      if (uploadType === 'modify') {
        uploadFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}/edit`, 'post', null, _uploadData);
      } else if (uploadType === 'noneEditor' || uploadType === 'editor') {
        uploadFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/sec`, 'post', null, _uploadData);
      } else {
        uploadFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`, 'post', null, _uploadData);
      }
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (uploadApi) {
      if (uploadApi?.result === 'ok') {
        alertPatch({ type: 'UPLOADED_UPDATE', payload: true });
        goViewer(`/viewer/${uploadApi?.data._id}`);
        alertPatch({ type: 'LOADING_PUSH', payload: false });
      } else {
        alertPatch({ type: 'UPLOADED', payload: true });
        goViewer(`/viewer/${uploadApi?.data._id}`);
      }
    } else if (uploadApi?.result === 'error') {
      alertPatch({ type: 'UPLOADED_FAIL', payload: true });
    } else {
      setDisabled(false);
      // goViewer(`/`);
      return;
    }
  }, [uploadApi]);
  
  useEffect(() => {
    // 콘텐츠 수정하기 할 때 기존의 데이터 대입
    if (!originData) return;
      setBoardTitle(originData?.boardTitle);
      setBoardBody(originData?.boardBody);
      setCategory(Number(originData?.category));
      setPublic(Number(originData?.pub));
      setSecondCreate(originData?.allowSecondaryCreation);
      setSourceHref(originData?.sourceUrl)
      setSourceToggleOn(originData?.sourceUrl && true)
  }, [originData, uploadType, editorData]);

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
        setDisabled,
      }}
    >
      <ContentOptionBox>
        <ContentTitle alertTitle={alertTitle}>
          <TextAreaAutoSize
            alertTitle={alertTitle}
            placeholder={alertTitle ? _alertPlaceholder : _titlePlaceholder}
            name="boardTitle"
            onChange={changeBoardTitle}
            defaultValue={boardTitle}
            maxLength={50}
          />
        </ContentTitle>

        <ContentInfoBox>
          <ContentInfo defaultValue={boardBody} name="boardBody" onChange={changeBoardBody} placeholder={_descPlaceholder} />
        </ContentInfoBox>
        {/* 원작자 폼 */}
        {uploadType === 'noneEditor' || uploadType === 'editor' || originData ? <OriginUserForm originData={originData} /> : <OriginUserSource />}

        <CategorySelectLayout>
          {/* 일러스트 & 만화 선택 카테고리 */}
          <UploadCategoryForm type="CONTENTS" initialNum={category} />

          {/* 작품 공개 or 비공개 선택 */}
          <UploadCategoryForm type="PUB" initialNum={pub} />

          {/* 2차 창작 허용 여부 */}
          { uploadType === 'upload' ? <UploadCategoryForm type="SECONDARY" initialNum={secondCreate} /> : null}

          {/* 작품의 언어 설정 */}
          <UploadCategoryForm type="LANGUAGE" initialNum={selectedLanguage || defaultLanguage} />
        </CategorySelectLayout>
        <Form action="" onSubmit={editorDevideHandler} encType="multipart/form-data" autoComplete="off">
          <SubmitBox>
            <ArrowBtn
              onClick={() => {
                router.pathname.match('/editor') ? categoryToggle(false) : router.back();
              }}
            />
            <AlertText>
              {fileSize && fileSize} {sourceToggleOn && !fileSize && _sourceAlert}
            </AlertText>

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
  display: flex;
  flex-direction: column;
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
