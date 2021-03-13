import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// 컴포넌트 import
import { ImageEditor } from './ImageEditor';

// reducer && context
import { useModal } from '@hooks/useModal';
import { useToggle } from '@hooks/useToggle';

// 이미지
export const EditorContext = React.createContext();

export const EditorStore = () => {
  const router = useRouter();
  const { boardImg, data, boardUid } = router?.query;

  // 원작 유저 정보
  const [originData, setOriginData] = useState();
  const [URLs, setURLs] = useState([]);
  const [index, setIndex] = useState(0);
  const [imageSample, setImageSample] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectPage, setSelectPage] = useState(null);
  const [canvasData, setCanvasData] = useState([{ id: 0, cnavasJSON: null }]);
  const [finishCanvas, setFinishCanvas] = useState();

  // 아웃라인 컴포넌트
  const [textOutline, toggleTextOutline] = useToggle(false);
  const [outlineWidth, setOutlineWidth] = useState(0);
  const [outlineColor, setOutlineColor] = useState('#fff');

  // 텍스트 스타일링
  const [radioBtn, UseRadioBtn] = useState('left');
  const [textBold, toggleBold] = useState('normal');
  const [textSlope, toggleSlope] = useState('normal');
  const [textUnderbar, toggleUnderbar] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const [textSpace, setTextSpace] = useState(0);
  const [currentFont, setCurrentFont] = useState('Arial');

  // 공통
  // const [canvas, setCanvas] = useState('');
  const [useEyeDropper, setUseEyeDropper] = useState(false);
  const [eyeDropMode, setEyeDropMode] = useState(null);

  const [saveCanvas, setSaveCanvas] = useState([]);

  const [canvas, setCanvas] = useState('');
  const [categoryShowing, categoryToggle] = useModal();

  const getFiletoImgPath = async () => {
    let boardImgArr = [];
    boardImgArr.push(boardImg);
    const _uploadData = Array.isArray(boardImg) ? boardImg : boardImgArr;
    getImages(_uploadData);

    let Urls = [];
    for (let i = 0; i < _uploadData?.length; i++) {
      await fetch(_uploadData[i], {
        mode: 'cors',
        cache: 'no-cache',
      });
      const urlData = {
        id: index + i,
        canvas: _uploadData[i],
      };
      Urls.push(urlData);
    }

    setURLs(Urls);
  };

  const getImages = (images) => {
    if (!images) return;
    const imgLoad = (url) => {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url;
        img.onload = () => {
          resolve(img);
        };
        img.onerror = reject;
      });
    };
    let imageLoadpromises = images?.map(imgLoad);

    Promise.all(imageLoadpromises)
      .then((images) => {
        let arr = [...images];
        arr.map((img, i) => {
          imageSample.push({ id: i, canvas: img });
        });
      })
      .catch((err) => {
        alert(err, 'Image Upload Error');
      });
  };

  const saveCanvasData = (id, canvasJSON) => {
    if (id === undefined) return;

    currentPage === id ? canvasData.splice(id, 1, { id, canvasJSON }) : setCanvasData([...canvasData, { id, canvasJSON }]);
  };

  const saveCan = (_canvas, imgSize) => {
    let _id = _canvas.id;
    currentPage === Number(_id) && saveCanvas.splice(Number(_id), 1, { id: Number(_id), canvas: _canvas, img: imgSize });
  };

  // 업로드 버튼 눌렀을 때, 실행
  // 이미지가 한 개만 있을 경우
  const uploadData = (id, canvas) => {
    if (id === 0) {
      let firstJson = JSON.stringify(canvas);
      setCanvasData([{ id: 0, canvasJSON: firstJson }]);
    }
  };

  useEffect(() => {
    getFiletoImgPath();
    getImages();
  }, []);

  useEffect(() => {
    if (!canvas) return;
    saveCanvasData();
  }, [canvas, currentPage]);

  useEffect(() => {
    uploadData();
  }, []);

  useEffect(() => {
    setOriginData(JSON.parse(data));
  }, [router?.query]);

  return (
    <EditorContext.Provider
      value={{
        imageSample,
        setSelectPage,
        currentPage,
        setCurrentPage,
        saveCanvasData,
        canvasData,
        saveCanvas,
        // 아웃라인 영역
        textOutline,
        toggleTextOutline,
        setOutlineWidth,
        outlineWidth,
        setOutlineColor,
        outlineColor,
        // 텍스트 스타일링 영역
        radioBtn,
        UseRadioBtn,
        textBold,
        toggleBold,
        textSlope,
        toggleSlope,
        textUnderbar,
        toggleUnderbar,
        textHeight,
        setTextHeight,
        textSpace,
        setTextSpace,
        currentFont,
        setCurrentFont,
        // 공통
        useEyeDropper,
        setUseEyeDropper,
        eyeDropMode,
        setEyeDropMode,
        uploadData,
        canvas,
        setCanvas,
        saveCan,
        //토글
        categoryShowing,
        categoryToggle,
        // 최종
        originData,
        boardUid,
        setFinishCanvas,
        URLs,
      }}
    >
      {imageSample.map((img) => {
        if (img.id === currentPage) {
          return <ImageEditor key={img.id} id={img.id} image={img.canvas} />;
        }
      })}
    </EditorContext.Provider>
  );
};
