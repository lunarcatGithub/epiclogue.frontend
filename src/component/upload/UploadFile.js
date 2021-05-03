import React, { useState, useCallback, useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// 컴포넌트 import
import Slider from '@utils/Slider';
import UploadCategory from './UploadCategory';
import SliderEmpty from '@utils/Slider__Empty';
import UploadLanguage from './Upload.Language';

// Hooks & Reducer

const UploadFile = ({type, editData, boardUid}) => {
  const [dragging, toggleDragging] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [urlData, setUrlData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [indexNum, setIndexNum] = useState(0)
  // 언어 변수
  const {_dropImage} = UploadLanguage()
  // convert
  const handleDragEnter = (e) => {
    e.preventDefault();
    toggleDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    toggleDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    toggleDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let files;
    if (e.type === 'change') {
      files = [...e.target.files];
    } else {
      files = [...e.dataTransfer.files];
    }
    setInitialData(files);
  };

  const fetchImage = async() => {
    let box = [];
    if(type !== 'modify') return;
      for (let i = 0; i < editData?.boardImg.length; i++) {
        const res = await fetch(editData.boardImg[i], {
          mode: 'cors',
          cache: 'no-cache',
        });
        const blob = await res.blob();
        let name = editData.boardImg[i].split('/');
        let file = new File([blob], name[3]);
        box.push(file)
    }
    setInitialData(box);
}

  const dataConvertHandler = () => {
    let urlList = [];
    let imgList = [];

    initialData?.map((file, index) => {
      const url = { key: indexNum + index, url: URL.createObjectURL(file) };
      const img = { key: indexNum + index, img: file };
      urlList.push(url);
      imgList.push(img);
      setIndexNum(urlData.length  + 1)
    });

    if (initialData) {
      setImageData(imageData.concat(imgList));
      setUrlData(urlData.concat(urlList));
      toggleDragging(false);
    }
  }

  const removeImage = useCallback(
    (key) => {
      setUrlData(urlData.filter((item) => item.key !== key));
      setImageData(imageData.filter((item) => item.key !== key));
    },
    [urlData, imageData]
  );

  useEffect(() => {
    dataConvertHandler();
  }, [initialData])

  useEffect(() => {
    fetchImage();
  }, [type, editData?.boardImg])

  return (
    <MainContainer>
      <UploadLayout>
        <UploadLayoutInner onDragOver={(e) => handleDragOver(e)}>
          {dragging ? (
            <ToggleBox onDrop={(e) => handleDrop(e)} onDragEnter={(e) => handleDragEnter(e)} onDragLeave={(e) => handleDragLeave(e)}>
              <ToggleBoxInner>{_dropImage}</ToggleBoxInner>
            </ToggleBox>
          ) : null}
          {/* 슬라이더 */}
          <Slider imgData={urlData} onRemove={removeImage} />
          {/* //슬라이더 */}
          <Btn id="fileInputBtn" accept=".gif, .jpg, .jpeg, .png" multiple onChange={handleDrop} />
          {!dragging ? <LabelBtn /> : null}
        </UploadLayoutInner>
      </UploadLayout>
      <ContentContainer>
        <ContentImgBox>
          {
            urlData?.length === 0? 
              <SliderEmpty />
              : 
              urlData.map( file => (
                <PreviewImgWrap key={file.key}>
                  <PreviewImg src={file.url} draggable="false" />
                </PreviewImgWrap> ))
          }
        </ContentImgBox>
        <ContentOptionBox>
          <UploadCategory 
          boardImg={imageData} 
          editData={editData}
          type={type || 'upload'} />
        </ContentOptionBox>
        <DummyLayout />
      </ContentContainer>
    </MainContainer>
  );
};
//공통
/* 스타일 컴포넌트 영역 */
// 애니메이션
const Opacity = keyframes`
0% {
  opacity:0;
}
100% {
  opacity:1;
}
`;
//레이아웃
const MainContainer = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
`;
const ContentContainer = styled.div`
  display: flex;
  width: calc(100% - 40px);
  margin-top: 8px;
  @media (max-width: 900px) {
    width: 100%;
    margin-top: 0;
    flex-direction: column;
    z-index: 999;
  }
`;

const DummyLayout = styled.div`
  display: none;
  width: 100%;
  height: 100px;
  background: ${(props) => props.theme.color.backgroundColor};
  @media (max-width: 900px) {
    display: block;
  }
`;

// 작품 이미지 프리뷰
const ContentImgBox = styled.section`
  display: flex;
  flex-flow: column;
  width: 100%;
  min-height: 300px;
  margin-right: 10px;
  background: ${(props) => props.theme.color.whiteColor};
  @media (max-width: 900px) {
    margin-right: 0;
    margin-top: 6px;
    width: 100%;
    min-height: 180px;
  }
`;

// 프리뷰 이미지
const PreviewImgWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  -webkit-user-select: none;
  user-select: none;
  animation: ${Opacity} 0.4s ease-in-out;
`;

const PreviewImg = styled.img`
  object-fit: contain;
  width: auto;
  height: auto;
  max-width: 100%;
  -webkit-user-select: none;
  user-select: none;
`;

// 작품 옵션 컨테이너
const ContentOptionBox = styled.section`
  position: sticky;
  top: 59px;
  width: 100%;
  max-width: 480px;
  height: 100%;
  background: ${(props) => props.theme.color.backgroundColor};
  @media (max-width: 900px) {
    width: 100%;
    max-width: 100%;
    margin-top: 4px;
    z-index: 999999;
  }
`;

// 이미지 업로드 레이아웃
const UploadLayout = styled.div`
  display: flex;
  width: 100%;
  height: 130px;

  margin-top: 8px;
  @media (max-width: 900px) {
    margin-top: 10px;
    height: 110px;
  }
`;
const UploadLayoutInner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 20px;
  width: 100%;
  background: ${(props) => props.theme.color.whiteColor};
  overflow: hidden;
  @media (max-width: 900px) {
    margin: 0;
  }
`;
const ToggleBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 9;
`;
const ToggleBoxInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  width: calc(100% - 3%);
  height: calc(100% - 18%);
  border: 3px dashed #fff;
`;
// 업로드 버튼
const Btn = styled.input.attrs({ type: 'file' })`
  display: none;
`;

const LabelBtn = styled.label.attrs({ htmlFor: 'fileInputBtn' })`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 19px;
  height: 2.9em;
  width: 2.9em;
  border-radius: 999px;
  background: ${(props) => props.theme.color.softOrangeColor};
  transition: all 0.2s ease;
  cursor: pointer;
  &:after,
  &:before {
    content: '';
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:before {
    height: 1.3em;
    width: 0.2em;
  }
  &:after {
    height: 0.2em;
    width: 1.3em;
  }
  &:hover {
    box-shadow: ${(props) => props.theme.boxshadow.nav};
    background: ${(props) => props.theme.color.orangeColor};
  }
  @media (max-width: 900px) {
    height: 2.1em;
    width: 2.1em;
    &:before {
      height: 1em;
      width: 0.1em;
    }
    &:after {
      height: 0.1em;
      width: 1em;
    }
  }
`;

export default UploadFile;
