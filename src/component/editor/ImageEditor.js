import React, { useRef, useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { fabric } from 'fabric';

//컴포넌트 import
import { SelectFont } from './Editor_SelectFont';
import RoadDataContextProvider from '@hooks/useRoadDataContext';
import { EditorOutline } from './ImageEditor_Outline';
import { EditorTextSetting } from './ImageEditor_TextSetting';
import { EditorEyedropper } from './Editor_Eyedropper';
import { ImageEditorCategory } from './ImageEditor_Category';
import { ImageSetting } from './Editor_ImageSetting';
import { EditorMobilePrevent } from './Editor_Mobile_Prevent';
import { EditorCommon, EditorMain } from '@language/Lang.Editor';

// reducer && context
import { EditorContext } from './Editor_Store';
import { LanguageContext } from '@store/App_Store';
import { useUrlMove } from '@hooks/useUrlMove';

export const ImageEditor = (props) => {
  const { image, id } = props;
  const [goURL] = useUrlMove();

  const {
    imageSample,
    currentPage,
    setCurrentPage,
    saveCanvasData,
    canvasData,
    // 아웃라인 영역
    // textOutline,
    toggleTextOutline,
    setOutlineWidth,
    outlineWidth,
    setOutlineColor,
    outlineColor,
    // 텍스트 스타일링 영역
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
    radioBtn,
    UseRadioBtn,
    //공통
    useEyeDropper,
    setUseEyeDropper,
    eyeDropMode,
    setEyeDropMode,
    uploadData,
    canvas,
    setCanvas,
    saveCan,
    categoryToggle,
  } = useContext(EditorContext);

  const { langState } = useContext(LanguageContext);
  const { selectedLanguage, defaultLanguage } = langState;
  const { colorTxt } = EditorCommon;
  const { brushTxt, txtSize, outlineTxt, resetConfirm } = EditorMain;
  const _colorTxt = colorTxt[selectedLanguage] || colorTxt[defaultLanguage],
    _brushTxt = brushTxt[selectedLanguage] || brushTxt[defaultLanguage],
    _txtSize = txtSize[selectedLanguage] || txtSize[defaultLanguage],
    _outlineTxt = outlineTxt[selectedLanguage] || outlineTxt[defaultLanguage],
    _resetConfirm = resetConfirm[selectedLanguage] || resetConfirm[defaultLanguage];

  let undoRedoArr = [];

  const containerRef = useRef();
  // 캔버스
  const [mouseDown, setMouseDown] = useState(false);

  // 배경 이미지
  const [imageSize, setImageSize] = useState();

  // 공통
  const [redoing, setRedoing] = useState(false);

  // 드로잉
  const [drawWidth, setDrawWidth] = useState(5);
  const [lineColor, setLineColor] = useState('black');

  // 텍스트
  const [textWidth, settextWidth] = useState(100);
  const [textColor, setTextColor] = useState('black');
  const [selectObj, setSelectObj] = useState();

  // coordinate
  const [lastCoordinate, setLastCoordinate] = useState({});

  //pan mode
  //drawing mode
  const [mode, setMode] = useState();
  // keydown
  const [spaceBar, setSpaceBar] = useState();
  // mobile ver
  const [mobileVer, setMobileVer] = useState();
  const [relativeCoord, setRelativeCoord] = useState({ x: 0, y: 0 });
  const [initScale, setInitScale] = useState(0);
  const [initCoord, setInitCoord] = useState({ x: 0, y: 0 });
  // 초기 캔버스 값 세팅
  const initCanvas = (id) => {
    return new fabric.Canvas(id, {
      id,
      useCORS: true,
      width: window.innerWidth,
      height: window.innerHeight,
      selection: false,
    });
  };
  // 캔버스 배경 이미지 설정 및 중앙정렬

  const imageCanvas = () => {
    if (!imageSize) return;
    let _imageSize = new Image();
    _imageSize.src = imageSize.src;
    _imageSize.setAttribute('crossOrigin', 'anonymous');

    _imageSize.onload = () => {
      const [imgTop, imgLeft, minFactor] = ImageSetting(_imageSize);
      //초기 이미지 스케일 저장
      setInitScale(minFactor);
      // console.log({ x: imgLeft * minFactor , y: imgTop })
      canvas.absolutePan({ x: -imgLeft, y: -imgTop });
      canvas.zoomToPoint({ x: imgLeft, y: imgTop }, minFactor);

      // object position inital setting
      let setX = imageSize.width / 2;
      let setY = imageSize.height / 2;
      setLastCoordinate({ x: (imgLeft * minFactor + setX) / 2, y: -imgTop * minFactor + setY });
      let nsgImage = new fabric.Image(_imageSize);
      canvas.setBackgroundImage(
        nsgImage,
        () => {
          canvas.renderAll();
        },
        { crossOrigin: 'anonymous' }
      );
    };
    canvas.renderAll();
  };

  // 텍스트 추가
  const addText = () => {
    const text = new fabric.Textbox('text', {
      fontSize: textWidth,
      scaleX: 1,
      scaleY: 1,
      top: lastCoordinate.y,
      left: lastCoordinate.x,
      // lineHeight: 1,
      // fill:textColor,
      strokeWidth: 0,
      fontFamily: currentFont,
      paintFirst: 'stroke',
    });
    canvas.add(text).setActiveObject(text);
    canvas.renderAll(text);
  };

  // 선택한 순간 설정이 하나의 오브젝트에 맞춰서 다시세팅
  const textHandler = (e) => {
    if (!e) return;
    const { type } = e.target;
    let selection = canvas.getActiveObject();
    if (type !== 'textbox' || !selection || selection.type === null) return;
    setMode('text');
    if (selection.type === 'textbox') {
      settextWidth(selection.fontSize);
      setTextColor(selection.fill);
      toggleBold(selection.fontWeight);
      toggleUnderbar(selection.underline);
      toggleSlope(selection.fontStyle);
      setTextSpace(selection.charSpacing);
      setTextHeight(selection.lineHeight);
      setCurrentFont(selection.fontFamily);
      UseRadioBtn(selection.textAlign);
      setOutlineWidth(selection.strokeWidth);
      // setOutlineColor(selection.stroke);
      selection.strokeWidth == 0 || selection.stroke === null ? toggleTextOutline(false) : toggleTextOutline(true);
    } else {
      return;
    }
  };

  // 텍스트 수정
  const textChange = () => {
    let selection = canvas.getActiveObject();

    // if(!selection) return;
    new Promise((res, rej) => {
      textHandler();
      let change = {
        fontSize: textWidth,
        fill: textColor,
        underline: textUnderbar,
        fontWeight: textBold,
        fontStyle: textSlope,
        charSpacing: textSpace,
        lineHeight: textHeight,
        fontFamily: currentFont,
        textAlign: radioBtn,
        stroke: outlineColor,
        strokeWidth: outlineWidth,
        styles: {},
      };
      res(change);
    }).then((change) => {
      if (!selection) return;
      selection.set(change);
      canvas.renderAll();
    });
  };

  // 드로잉 수정하는 곳
  const drawingChange = () => {
    canvas.freeDrawingBrush.color = lineColor;
    canvas.freeDrawingBrush.width = parseInt(drawWidth, 10) || 1;
  };
  // 모드 툴 설정 하는 함수
  const modeHandler = (e, type = mode) => {
    if (!canvas) return;
    if (spaceBar) return;

    // 일반 선택시
    if (type === 'select') {
      setMode(type);
      canvas.isDrawingMode = false;
      canvas.isTextMode = false;
    }
    if (type === 'drawing') {
      setMode(type);

      canvas.isTextMode = false;
      !useEyeDropper ? (canvas.isDrawingMode = true) : (canvas.isDrawingMode = false);
    }
    if (type === 'text') {
      setMode(type);
      canvas.isTextMode = true;
      canvas.isDrawingMode = false;
    }
    if (type === 'pan') {
      setMode(type);
      if (mobileVer) return;
      canvas.isDrawingMode = false;
      canvas.isTextMode = false;
    }

    if (type === 'clearAll') {
      if (window.confirm(_resetConfirm)) {
        canvas.getObjects().forEach((obj) => {
          if (obj !== canvas.backgroundImage) {
            canvas.remove(obj);
          }
        });
      }
    }
  };
  const eyedropHandler = (e) => {
    if (!e) return;
    if (!useEyeDropper) return;
    const eyedrop = EditorEyedropper(e, canvas);
    if (eyeDropMode === 'draw') {
      setLineColor(eyedrop);
    } else if (eyeDropMode === 'text') {
      if (!selectObj) return;
      setTextColor(eyedrop);
      selectObj.set({ fill: eyedrop });
    } else if (eyeDropMode === 'outline') {
      if (!selectObj) return;
      setOutlineColor(eyedrop);
      selectObj.set({ stroke: eyedrop });
    } else {
      return;
    }
  };

  // 이미지 업로드
  const uploadImage = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function (file) {
      const data = file.target.result;
      fabric.Image.fromURL(data, (img) => {
        const oImg = img.set({ left: lastCoordinate.x / 1.4, top: lastCoordinate.y / 1.4, angle: 0 });
        canvas.add(oImg).renderAll();
        canvas.setActiveObject(oImg);
        // let dataURL = canvas.toDataURL({format: 'png', quality: 0.9});
      });
    };
    reader.readAsDataURL(file);
  };
  // 키 한번 눌렀을 때 함수 실행
  let _keys = {};
  onkeydown = onkeyup = (e) => {
    if (!e) return;
    _keys[e.keyCode] = e.type === 'keydown';
    if (_keys[17] && _keys[16] && _keys[90]) {
      redo();
    } else if (_keys[17] && _keys[90]) {
      undo();
    } else if (_keys[27] || _keys[46]) {
      removeObj();
    } else if (_keys[17] && _keys[67]) {
      objectCopyHandler();
    }
  };

  // 키 누르고 있을 때 함수 실행
  const keypressToolHandler = (e) => {
    if (!e) return;
    const keyboard = e.keyCode;

    if (keyboard === 32) {
      setSpaceBar(true);
      canvas.isDrawingMode = false;
      canvas.isTextMode = false;
    }
  };
  // 키 땠을 때 함수 실행
  const keyupToolHandler = (e) => {
    if (!e) return;
    const keyboard = e.keyCode;
    switch (keyboard) {
      case 32:
        setSpaceBar(false);
        modeHandler(e, mode);
        break;

      default:
        break;
    }
  };

  // 마우스 클릭할 때 발생하는 이벤트
  const startSomthing = (e) => {
    if (!e) return;
    setSelectObj(e.target && e.target.type === 'textbox' && canvas.getActiveObject());
    // console.log(selectObj)
    setMobileVer(e.e.type === 'touchstart' ? true : false);
    // setMouseDown(e.e.type === 'mousedown' ? true : false);
    e.e.type === 'touchstart' && setInitCoord({ x: e.e.touches[0].clientX, y: e.e.touches[0].clientY });
    setMouseDown(e.e.type === 'mousedown' || e.e.type === 'touchstart' ? true : false);
    e.target && textHandler(e);
    eyedropHandler(e);
  };

  // 마우스 클릭하면서 뭔가 하는 것 (드로잉)
  const doSomthing = (e) => {
    if (!e) return;
    if (!mouseDown) return;
    // if(!mobileVer) return;

    mobileZoom(e);

    const moveMouse = e.e;
    const delta = new fabric.Point(moveMouse.movementX, moveMouse.movementY);

    mobileGesture(e);
    if (mode === 'pan' || spaceBar) {
      if (mobileVer) {
        return;
      } else {
        canvas.relativePan(delta);
      }
    }
  };

  // 마우스 땠을 때 발생하는 이벤트
  const finishSomthing = (e) => {
    if (!e) return;
    setMouseDown(false);
    setMobileVer(false);
    setRelativeCoord({ x: 0, y: 0 });
    setInitCoord({ x: 0, y: 0 });
    setUseEyeDropper(false);
  };
  // 모바일 제스쳐
  const mobileGesture = (e) => {
    if (!e) return;
    if (!mobileVer) return;

    setRelativeCoord({ x: e.pointer.x, y: e.pointer.y });
    let coordsX = e.pointer.x;
    let coordsY = e.pointer.y;
    let absoluteCoordX = coordsX - relativeCoord.x;
    let absoluteCoordY = coordsY - relativeCoord.y;
    if (!relativeCoord.x || !relativeCoord.y) return;
    if (e.e.type === 'touchmove' && mode === 'pan') {
      if (e.e.touches.length === 2) return;
      let delta = new fabric.Point(absoluteCoordX, absoluteCoordY);
      canvas.relativePan(delta);
    }

    if (e.e.touches.length === 2 && e.e.type === 'touchmove') {
      // let num = 0;
      // let screenX = e.e.touches[0].clientX - e.e.touches[1].clientX * -1
      // let screenY = e.e.touches[0].clientY - e.e.touches[1].clientY * -1
      // setInitCoord({x:screenX, y:screenY})
      //     let zoomStartScale = canvas.getZoom();
      //     // console.log(zoomStartScale)
      //     console.log('initCoord', initCoord)
      //     console.log('lastCoord', {x:screenX, y:screenY})
      //     if(initCoord.x < screenX){
      //       num = +10;
      //       console.log(num)
      //       zoomStartScale *= 0.999 ** num;
      //     }else{
      //       num = -10;
      //       console.log(num)
      //       zoomStartScale *= 0.999 ** num;
      //     }
      //     canvas.zoomToPoint({ x: 0, y: 0 }, zoomStartScale);
      //     e.e.preventDefault();
      //     e.e.stopPropagation();
      // }
    }
  };

  // undo & redo
  const historyHandler = () => {
    if (!redoing) {
      undoRedoArr = [];
    }
    setRedoing(false);
  };

  const undo = () => {
    if (canvas._objects.length > 0) {
      undoRedoArr.push(canvas._objects.pop());
      canvas.renderAll();
    }
  };

  const redo = () => {
    if (undoRedoArr.length > 0) {
      setRedoing(true);
      canvas.add(undoRedoArr.pop());
    }
  };

  const objectCopyHandler = () => {
    let selectedObj = canvas.getActiveObject();
    if (selectedObj.text === undefined) return;
    let clipboard;
    selectedObj.clone((cloned) => {
      clipboard = cloned;
    });

    clipboard.clone((clonedObj) => {
      canvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });

      if (clonedObj.type === 'activeSelection') {
        // active selection needs a reference to the canvas.
        clonedObj.canvas = canvas;
        clonedObj.forEachObject((obj) => {
          canvas.add(obj);
        });
        // this should solve the unselectability
        clonedObj.setCoords();
      } else {
        canvas.add(clonedObj);
      }
      clipboard.top += 50;
      clipboard.left += 50;
      canvas.setActiveObject(clonedObj);
      canvas.requestRenderAll();
    });
  };

  // desktop zoom 함수
  const zoomHandler = (opt) => {
    // zoom 이후 text center 위치 조정
    let tr_X = canvas.vptCoords.tr.x;
    let tl_X = canvas.vptCoords.tl.x;
    let tl_Y = canvas.vptCoords.tl.y;
    let br_Y = canvas.vptCoords.br.y;
    let currentViewX = (tl_X - tr_X) / 2;
    let currentViewY = (tl_Y - br_Y) / 2;
    setLastCoordinate({ x: tr_X + currentViewX, y: br_Y + currentViewY });

    const delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.1) zoom = 0.1;
    // 휠에 따른 캔버스 확대 및 축소
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  };

  // mobile zoom 함수
  let pausePanning = null;
  let zoomStartScale = null;
  let lastX = null;
  let lastY = null;

  const mobileZoom = (e) => {
    let self = this;
    if (e.e.touches && e.e.touches.length === 1) {
      canvas.pausePanning = true;
      let point = new fabric.Point(e.pointer.x, e.pointer.y);
      if (e.e.type === 'touchmove') {
        zoomStartScale = canvas.getZoom();
      }
      //   let delta = zoomStartScale * e.self.scale;
      //   canvas.zoomToPoint(point, delta);
      //   canvas.pausePanning = false;
    }
  };

  // 다음 및 이전 작품 이동
  const moveTab = (type, id) => {
    if (type === 'left') {
      if (id <= 0) return;
      setCurrentPage(id - 1);
      saveHandler();
    }
    if (type === 'right') {
      if (id >= imageSample.length - 1) return;

      setCurrentPage(id + 1);
      saveHandler();
    }
    if (type === 'click') {
      setCurrentPage(id);
      saveHandler();
    }
  };

  const saveHandler = () => {
    let canvasJSON = canvas.toJSON();
    canvas.getObjects().length !== 0 && saveCanvasData(id, canvasJSON);

    canvasData.map((i) => {
      i.id === id && canvas.loadFromJSON(i.canvasJSON, () => canvas.renderAll(canvas));
    });

    saveCan(canvas, image);
  };

  // 선택 오브젝트 삭제
  const removeObj = () => {
    const obj = canvas.getActiveObject();
    canvas.remove(obj);
  };
  // 선택 오브젝트 front or back 보내기
  const sendToFrontOrBack = (type) => {
    const obj = canvas.getActiveObject();
    if (type === 'front') {
      canvas.bringToFront(obj);
    } else {
      canvas.sendBackwards(obj);
    }
  };

  // transformer custom style
  const transformerStyle = () => {
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = 'green';
    fabric.Object.prototype.cornerStyle = 'circle';
    fabric.Object.prototype.borderColor = 'rgba(3,109,108,0.2)';
    fabric.Object.prototype.cornerStrokeColor = 'white';
    fabric.Object.prototype.cornerSize = 8;
    fabric.Object.prototype.padding = 3;
  };

  useEffect(() => {
    setCanvas(initCanvas(id.toString()));
    setImageSize(image);
    transformerStyle();
  }, []);

  useEffect(() => {
    if (!canvas) return;
    document.addEventListener('keyup', keyupToolHandler);
    document.addEventListener('keypress', keypressToolHandler);

    canvas.on({
      'mouse:down': startSomthing,
      'mouse:move': doSomthing,
      'mouse:up': finishSomthing,
      'object:added': historyHandler,
      'mouse:wheel': zoomHandler,
      'touch:gesture': mobileGesture,
    });

    return () => {
      document.removeEventListener('keyup', keyupToolHandler);
      document.removeEventListener('keypress', keypressToolHandler);

      canvas.off({
        'mouse:down': startSomthing,
        'mouse:move': doSomthing,
        'mouse:up': finishSomthing,
        'object:added': historyHandler,
        'mouse:wheel': zoomHandler,
        'touch:gesture': mobileGesture,
      });
    };
  }, [canvas, selectObj, relativeCoord, lastCoordinate, initCoord, textColor, eyeDropMode, mouseDown, mobileVer, useEyeDropper, lineColor, drawWidth, redoing, textWidth]);

  useEffect(() => {
    modeHandler();
    historyHandler();
  }, [canvas, useEyeDropper, spaceBar, mode, lineColor, drawWidth]);

  useEffect(() => {
    if (!canvas) return;
    saveHandler();
    imageCanvas();
    moveTab();
  }, [canvas, currentPage]);

  useEffect(() => {
    if (!canvas) return;
    addText();
  }, []);

  useEffect(() => {
    if (!canvas) return;
    textChange();
    textHandler();
  }, [canvas, textColor, textWidth, currentFont, radioBtn, eyeDropMode, useEyeDropper, textUnderbar, textBold, textSlope, textSpace, textHeight, outlineColor, outlineWidth]);

  useEffect(() => {
    if (!canvas) return;
    drawingChange();
  }, [lineColor, drawWidth]);

  useEffect(() => {
    if (!canvas) return;
    eyedropHandler();
  }, [canvas, eyeDropMode, useEyeDropper, selectObj]);

  return (
    <RoadDataContextProvider>
      {/* mobile ver prevent */}
      <EditorMobilePrevent />
      {/* // mobile ver prevent */}
      <AllLayout>
        <EditorInner>
          <EditorHeader hide={mode === 'pan' || mode === 'select'}>
            <EditorHeaderInner>
              {/* ================= Logo button ========================*/}
              <LogoWrap onClick={() => goURL({ pathname: `/` })}>
                <LogoImg />
              </LogoWrap>
              {/* ================================= text toolbar ======================= */}
              {mode === 'text' && (
                <EditorTextWrap id="TextMode">
                  <AddTextBox onClick={addText}>
                    <AddTextImg />
                  </AddTextBox>
                  {/* 텍스트 폰트 설정 */}
                  <TextFontWrap>
                    <SelectFont />
                  </TextFontWrap>

                  <TextSizeWrap>
                    <TextSizeTxt>{_txtSize}</TextSizeTxt>
                    {/* 텍스트 사이즈 선택 */}
                    <TextSize onChange={(e) => settextWidth(Number(e.target.value))} value={textWidth} />
                  </TextSizeWrap>
                  {/* 텍스트 칼라 */}
                  <TextColorAllWrap>
                    <TextColorWrap>
                      <TextColorTxt>{_colorTxt}</TextColorTxt>
                      <TextColorLabel styling={textColor}>
                        <ColorInput onChange={(e) => setTextColor(e.target.value)} value={textColor} />
                      </TextColorLabel>
                    </TextColorWrap>
                    <EyedropperBox
                      onClick={() => {
                        setUseEyeDropper(!useEyeDropper);
                        setEyeDropMode('text');
                      }}
                      styling={useEyeDropper}
                    >
                      <EyedropperImg styling={useEyeDropper} />
                    </EyedropperBox>
                  </TextColorAllWrap>
                  {/* 텍스트 세부설정 */}
                  <EditorTextSetting />
                  {/* 텍스트 아웃라인 */}
                  <EditorOutline outlineTxt={_outlineTxt} />
                  {/* 텍스트 복사 & 삭제 */}
                  <TextCopyAndDeleteWrap>
                    <TextFrontSend onClick={() => sendToFrontOrBack('front')} />
                    <TextBackSend onClick={() => sendToFrontOrBack('back')} />
                    <TextCopyBtn onClick={objectCopyHandler} />
                    <TextRemoveBtn onClick={removeObj} />
                  </TextCopyAndDeleteWrap>
                  {/* // 텍스트 헤더 바 끝 */}
                </EditorTextWrap>
              )}
              {/* ================================= draw toolbar ======================= */}
              {/* 드로잉 헤더 바 시작 */}
              {mode === 'drawing' && (
                <EditorDrawWrap>
                  <LineWidthWrap>
                    <LineWidthTxt>{_brushTxt}</LineWidthTxt>
                    <LineWidthBox>
                      <LineWidthSlide id="lineWidth" onChange={(e) => setDrawWidth(e.target.value)} value={drawWidth} />
                      <LineWidthNum>{drawWidth}</LineWidthNum>
                    </LineWidthBox>
                  </LineWidthWrap>
                  <LineColorWrap>
                    <TextColorTxt>{_colorTxt}</TextColorTxt>
                    <LineColorLabel styling={lineColor}>
                      <ColorInput
                        onChange={(e) => {
                          setLineColor(e.target.value);
                        }}
                        value={lineColor}
                      />
                    </LineColorLabel>
                  </LineColorWrap>
                  <EyedropperBox
                    onClick={() => {
                      setUseEyeDropper(!useEyeDropper);
                      setEyeDropMode('draw');
                    }}
                    styling={useEyeDropper}
                  >
                    <EyedropperImg styling={useEyeDropper} />
                  </EyedropperBox>
                </EditorDrawWrap>
              )}
              {/* ================================= shape toolbar ======================= */}
            </EditorHeaderInner>
            {/* // 에디터 헤더 끝 */}
          </EditorHeader>
          {/* ================================= side toolbar ======================= */}
          <EditorBody>
            <EditorToolBoxWrap>
              {/* 에디터 툴 선택 영역 */}
              <EditorTool>
                {/* Undo 버튼 */}
                <ToolWrap onClick={() => undo()}>
                  <UndoBtnImg />
                </ToolWrap>
                {/* Redo 버튼 */}
                <ToolWrap onClick={() => redo()}>
                  <RedoBtnImg />
                </ToolWrap>
                <DummyLine />
                {/* Select 버튼 */}
                <ToolWrap onClick={(e) => modeHandler(e, 'select')}>
                  <SelectBtnImg styling={mode} />
                  <DescriptName styling={mode === 'select' ? true : false}>Select</DescriptName>
                </ToolWrap>

                {/* Pan 버튼 */}
                <ToolWrap onClick={(e) => modeHandler(e, 'pan')}>
                  <PanningBtnImg styling={mode} />
                  <DescriptName styling={mode === 'pan' ? true : false}>Move</DescriptName>
                </ToolWrap>
                {/* 드로잉 버튼 */}
                <ToolWrap onClick={(e) => modeHandler(e, 'drawing')}>
                  <DrawBtnImg styling={mode} />
                  <DescriptName styling={mode === 'drawing' ? true : false}>Brush</DescriptName>
                </ToolWrap>
                {/* 텍스트 버튼 */}
                <ToolWrap onClick={(e) => modeHandler(e, 'text')}>
                  <TextBtnImg id="textBtn" styling={mode === 'text' ? true : false} />
                  <DescriptName styling={mode === 'text' ? true : false}>Text</DescriptName>
                </ToolWrap>
                {/* 이미지 삽입 버튼 */}
                <ImageUploadWrap>
                  <ImageBtnImg />
                  <ImageUpload id="imageUp" onChange={uploadImage} onClick={(e) => modeHandler(e, 'select')} />
                  <DescriptName>Image</DescriptName>
                </ImageUploadWrap>
                {/* 지우개 버튼 */}
                {/* <ToolWrap >
                    <EraserBtnImg styling={''} />
                  </ToolWrap> */}
                <DummyLine />
                {/* 삭제 버튼 */}
                <ToolWrap onClick={removeObj}>
                  <DeleteBtnImg />
                  <DescriptName>Delete</DescriptName>
                </ToolWrap>
                {/* 테스트 저장 버튼 */}
                {/* <ToolWrap>
                    <button onClick={testHandler}>저장</button>
                  </ToolWrap> */}

                {/* 캔버스 클리어 버튼 */}
                <ToolWrap onClick={(e) => modeHandler(e, 'clearAll')}>
                  <ClearBtnImg />
                  <DescRemoveBtn>Clear</DescRemoveBtn>
                </ToolWrap>
                {/* 페이지 이동 */}
              </EditorTool>
            </EditorToolBoxWrap>

            <CanvasListWrap>
              {/* 캔버스 상단 리스트 */}
              <CanvasListInner>
                <ToolDummy />
                <LeftMoveBtn onClick={() => moveTab('left', currentPage)}>{`<<`}</LeftMoveBtn>
                <CanvasListBox>
                  {imageSample.map((i, key) => (
                    <CanvasList styling={currentPage === i.id} key={key} onClick={() => moveTab('click', i.id)}>{`Image ${i.id + 1}`}</CanvasList>
                  ))}
                  <CanvasListFakeBox />
                </CanvasListBox>
                <RightMoveBtn onClick={() => moveTab('right', currentPage)}>{`>>`}</RightMoveBtn>
              </CanvasListInner>
              <CanvasLayout ref={containerRef}>
                {/* 캔버스 영역 */}
                <Canvas
                  id={id.toString()}
                  // image={originImage && originImage.src}
                />
              </CanvasLayout>
              <UploadBtn
                onClick={() => {
                  uploadData(id, canvas);
                  categoryToggle(true);
                }}
              />
            </CanvasListWrap>
          </EditorBody>
        </EditorInner>
      </AllLayout>
      {/* 카테고리 */}
      <ImageEditorCategory />
    </RoadDataContextProvider>
  );
};

const Canvas = styled.canvas`
  /* width:100%;
height:100%; */
`;

// 공통
const TextCommon = css`
  font-size: ${(props) => props.theme.fontSize.font13};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.blackColor};
`;

// 레이아웃

const AllLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const EditorInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background: #2222; */
`;
const EditorBody = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const CanvasListWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const ToolDummy = styled.div`
  display: flex;
  width: 4.7em;
  height: 100%;
  background: #fff;
  @media (max-width: 900px) {
    display: none;
  }
`;
// 에디터 툴 영역
const EditorToolBoxWrap = styled.div`
  position: fixed;
  top: 5.2em;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.2em;
  height: 100%;

  z-index: 9999;
  @media (max-width: 900px) {
    position: fixed;
    top: initial;
    bottom: 0;
    width: 100%;
    height: auto;
  }
`;
const EditorTool = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 62px;
  height: 100%;
  background: ${(props) => props.theme.color.whiteColor};

  @media (max-width: 900px) {
    flex-direction: row;
    width: 100%;
    height: auto;
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

const ToolWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.7em;
  cursor: pointer;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
    margin-left: 0.8em;
    padding: 4px 0;
  }
  &:nth-child(1) {
    @media (max-width: 900px) {
      margin: 0;
    }
  }
  &:nth-child(2) {
    @media (max-width: 900px) {
      margin: 0;
    }
  }
`;

const ImageUploadWrap = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.7em;
  cursor: pointer;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
    margin-left: 0.8em;
    padding: 4px 0;
  }
`;
const ImageUpload = styled.input.attrs({
  type: 'file',
})`
  display: none;
`;
const DummyLine = styled.span`
  width: 40px;
  height: 3px;
  border-radius: 8px;
  margin: 8px 0 14px 0;
  background: ${(props) => props.theme.color.hoverColor};
  @media (max-width: 900px) {
    display: none;
  }
`;

// 에디터 툴 - 버튼 영역
const SelectBtnImg = styled.button`
  display: block;
  background: url(${(props) => (props.styling === 'select' ? '/static/editor/selectOn.svg' : '/static/editor/select.svg')}) no-repeat center / contain;
  width: 1.8em;
  height: 1.8em;
  cursor: pointer;
  @media (max-width: 900px) {
    margin-bottom: 0.1em;
    width: 1.7em;
    height: 1.7em;
  }
`;
const PanningBtnImg = styled(SelectBtnImg)`
  background: url(${(props) => (props.styling === 'pan' ? '/static/editor/panOn.svg' : '/static/editor/pan.svg')}) no-repeat center / contain;
  width: 2em;
  height: 2em;
  @media (max-width: 900px) {
    width: 1.8em;
    height: 1.8em;
  }
`;

const DrawBtnImg = styled(SelectBtnImg)`
  background: url(${(props) => (props.styling === 'drawing' ? '/static/editor/drawOn.svg' : '/static/editor/draw.svg')}) no-repeat center / contain;
  width: 1.9em;
  height: 1.9em;
  @media (max-width: 900px) {
    width: 1.7em;
    height: 1.7em;
  }
`;
// undo & redo
const UndoBtnImg = styled(SelectBtnImg)`
  background: url('/static/editor/undo.svg') no-repeat center / contain;
  width: 3em;
  height: 3em;

  &:active {
    background: url('/static/editor/undoOn.svg') no-repeat center / contain;
  }
  @media (max-width: 900px) {
    margin-left: 8px;
  }
`;

const RedoBtnImg = styled(UndoBtnImg)`
  background: url('/static/editor/redo.svg') no-repeat center / contain;
  &:active {
    background: url('/static/editor/redoOn.svg') no-repeat center / contain;
  }
`;

// text
const TextBtnImg = styled(DrawBtnImg)`
  background: url(${(props) => (props.styling ? '/static/editor/textOn.svg' : '/static/editor/text.svg')}) no-repeat center / contain;
`;
const ImageBtnImg = styled.label.attrs({
  htmlFor: 'imageUp',
})`
  display: block;
  width: 2em;
  height: 2em;
  background: url('/static/editor/image.svg') no-repeat center / contain;
  &:active {
    background: url('/static/editor/imageOn.svg') no-repeat center / contain;
  }
  @media (max-width: 900px) {
    width: 1.7em;
    height: 1.7em;
  }
`;

const EyedropperBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1.8em;
  min-height: 1.8em;
  border: 1px solid ${(props) => (props.styling ? props.theme.color.greenColor : `#2222`)};
  border-radius: 50%;
`;

const EyedropperImg = styled(SelectBtnImg)`
  background: url(${(props) => (props.styling ? '/static/editor/eyedropperOn.svg' : '/static/editor/eyedropper.svg')}) no-repeat center / contain;
  width: 1.5em;
  height: 1.5em;
`;

const DeleteBtnImg = styled(SelectBtnImg)`
  background: url('/static/editor/delete.svg') no-repeat center / contain;

  &:active {
    background: url('/static/editor/deleteOn.svg') no-repeat center / contain;
  }
  @media (max-width: 900px) {
    width: 1.8em;
    height: 1.8em;
  }
`;

const ClearBtnImg = styled(SelectBtnImg)`
  background: url('/static/editor/clear.svg') no-repeat center / contain;
  margin-top: 6px;

  @media (max-width: 900px) {
    /* margin-right: 10px; */
    width: 1.8em;
    height: 1.8em;
    margin-top: 0;
  }
`;
// 에디터 툴 - 버튼 네임
const DescriptName = styled.span`
  font-size: ${(props) => props.theme.fontSize.font13};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => (props.styling ? props.theme.color.greenColor : props.theme.color.popupColor)};
  user-select: none;
  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font12};
  }
`;
const DescRemoveBtn = styled(DescriptName)`
  margin-top: 0.3em;
  color: ${(props) => (props.styling ? props.theme.color.greenColor : props.theme.color.middlePinkColor)};
  @media (max-width: 900px) {
    margin-top: 0;
  }
`;

// 에디터 헤더
const EditorHeader = styled.div`
  position: sticky;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 48px;
  background: #fff;
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  z-index: 99999;
  @media (max-width: 900px) {
    display: ${(props) => (props.hide ? 'none' : 'flex')};
    position: fixed;
    top: initial;
    bottom: 3.3em;
    left: 0;
    height: 46px;
  }
`;
const EditorHeaderInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px;
  @media (max-width: 900px) {
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

const EditorTextWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  @media (max-width: 900px) {
    padding-right: 30px;
  }
`;

// 에디터 헤더 - 뒤로가기 버튼
const LogoWrap = styled.div`
  display: flex;
  width: 55px;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    display: none;
  }
`;

const LogoImg = styled.button`
  background: url('/static/Logo.svg') no-repeat center center / contain;
  width: 3em;
  height: 3em;
  cursor: pointer;
`;
// 에디터 헤더 - 텍스트 추가
const AddTextBox = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.1em 0.8em;
  max-width: 100%;
  height: auto;
  white-space: nowrap;
  border: 1px solid #2222;
  border-radius: 0.4em;
  margin: 0 0.3em;
  cursor: pointer;
  &:active {
    border: 1px solid ${(props) => props.theme.color.greenColor};
  }
`;
const AddTextImg = styled.span`
  background: url('/static/editor/addText.svg') no-repeat center center / contain;
  width: 2.3em;
  height: 1.9em;
`;

// 에디터 헤더 - 버튼 영역 - 글꼴
const TextFontWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.2em;
`;

// 헤더 - 버튼 영역 - 텍스트 사이즈
const TextSizeWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1em;
`;
const TextSizeTxt = styled.span`
  ${TextCommon};
  margin: 2px 0 6px 0;
`;

const TextSize = styled.input.attrs({ type: 'range', min: '1', max: '300' })`
  -webkit-appearance: none;
  width: 108px;
  height: 3px;
  outline: none;
  background: ${(props) => props.theme.color.softGreenColor};
  margin: 6px 0;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(3, 109, 108, 1);
    border: 2px solid #fff;
    z-index: 99;
  }
`;

// 텍스트 color
const TextColorAllWrap = styled.div`
  display: flex;
  align-items: center;
`;

const TextColorWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.7em;
`;
const TextColorTxt = styled.span`
  ${TextCommon};
  /* margin: 3px 0; */
`;

const ColorInput = styled.input.attrs({
  type: 'color',
})`
  display: none;
`;
const TextColorLabel = styled.label`
  width: 2em;
  height: 1em;
  border-radius: 25px;
  border: 1px solid ${(props) => props.theme.color.hoverColor};
  background: ${(props) => props.styling};
  margin: 4px 0 2px 0;
  cursor: pointer;
`;

const TextCopyAndDeleteWrap = styled.div`
  /* position:relative; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding: 0.3em 0.8em 0.3em 1.3em;
  margin-left: 2em;
  border-radius: 0.2em;
  background: ${(props) => props.theme.color.backgroundColor};
`;
const TextCopyBtn = styled.button`
  position: relative;
  display: flex;
  margin-top: 0.4em;
  border-radius: 0.1em;
  width: 1.1em;
  height: 1.2em;
  border-radius: 0.1em;
  border: 2px solid ${(props) => props.theme.color.soSoGrayColor};
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    top: -0.4em;
    left: -0.4em;
    width: 0.7em;
    height: 0.8em;

    border-top: 2px solid ${(props) => props.theme.color.soSoGrayColor};
    border-left: 2px solid ${(props) => props.theme.color.soSoGrayColor};
  }
  &:active {
    border: 2px solid ${(props) => props.theme.color.soSoGreenColor};

    &::before {
      border-top: 2px solid ${(props) => props.theme.color.soSoGreenColor};
      border-left: 2px solid ${(props) => props.theme.color.soSoGreenColor};
    }
  }
`;

const TextFrontSend = styled(TextCopyBtn)`
  margin-right: 1.2em;
  width: 1em;
  height: 1em;
  &:after {
    content: '';
    position: absolute;
    bottom: -0.35em;
    right: -0.4em;
    width: 0.7em;
    height: 0.7em;
    border-radius: 0.1em;
    border-bottom: 2px solid ${(props) => props.theme.color.soSoGrayColor};
    border-right: 2px solid ${(props) => props.theme.color.soSoGrayColor};
  }
  &:active {
    border: 2px solid ${(props) => props.theme.color.soSoGreenColor};
    &:before {
      border-top: 2px solid ${(props) => props.theme.color.soSoGreenColor};
      border-left: 2px solid ${(props) => props.theme.color.soSoGreenColor};
    }
    &:after {
      border-bottom: 2px solid ${(props) => props.theme.color.soSoGreenColor};
      border-right: 2px solid ${(props) => props.theme.color.soSoGreenColor};
    }
  }
`;

const TextBackSend = styled(TextCopyBtn)`
  margin-right: 1.2em;
  width: 1em;
  height: 1em;

  &:after {
    content: '';
    position: absolute;
    bottom: -0.35em;
    right: -0.4em;
    width: 0.5em;
    height: 0.5em;
    border: 1px solid ${(props) => props.theme.color.soSoGrayColor};
    background: ${(props) => props.theme.color.soSoGrayColor};
  }

  &::before {
    top: -0.4em;
    left: -0.4em;
    width: 0.5em;
    height: 0.5em;
    border: 1px solid ${(props) => props.theme.color.soSoGrayColor};
    background: ${(props) => props.theme.color.soSoGrayColor};
  }

  &:active {
    border: 2px solid ${(props) => props.theme.color.soSoGreenColor};
    &:before {
      border: 1px solid ${(props) => props.theme.color.soSoGreenColor};
      background: ${(props) => props.theme.color.soSoGreenColor};
    }
    &:after {
      border: 1px solid ${(props) => props.theme.color.soSoGreenColor};
      background: ${(props) => props.theme.color.soSoGreenColor};
    }
  }
`;
const TextRemoveBtn = styled.button`
  background: url('/static/editor/delete.svg') no-repeat center center / contain;
  width: 1.7em;
  height: 1.7em;
  margin-left: 0.6em;
  cursor: pointer;
  &:active {
    background: url('/static/editor/deleteOn.svg') no-repeat center center / contain;
  }
`;

// 드로잉 영역
const EditorDrawWrap = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.3em;
`;
// 드로잉 영역 - 드로잉 굵기
const LineWidthWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const LineWidthTxt = styled.span`
  ${TextCommon};
`;
const LineWidthBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LineWidthSlide = styled(TextSize).attrs({
  min: '1',
  max: '100',
  name: 'lineWidth',
})`
  margin-right: 5px;
`;
const LineWidthNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.font12};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.greenColor};
  padding: 2px 8px;
  margin-bottom: 6px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.softGreenColor};
  background: ${(props) => props.theme.color.semiGreenColor};
`;
// 드로잉 영역 - 드로잉 색상
const LineColorWrap = styled(TextColorWrap)`
  margin-left: 16px;
`;

const LineColorLabel = styled(TextColorLabel)`
  position: relative;
  background: ${(props) => props.styling};
`;

/* 에디터 디자인 영역 */
const CanvasLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* height: ${window.innerHeight}px !important; */
  align-items: stretch;
  background: #9999;
  overflow: hidden;
`;

const UploadBtn = styled.button`
  position: fixed;
  bottom: 3em;
  right: 3em;
  width: 4.5em;
  height: 4.5em;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  &::before {
    content: '';
    position: absolute;
    top: 48%;
    left: 46%;
    transform: translate(-50%, -50%);
    background: url('/static/paper-plane.svg') no-repeat center center / contain;
    width: 2.5em;
    height: 2.5em;
  }
  @media (max-width: 900px) {
    bottom: 5.5em;
    right: 2em;
    width: 4em;
    height: 4em;

    &::before {
      top: 50%;
      left: 48%;
      width: 2.2em;
      height: 2.2em;
    }
  }
`;

const CanvasListInner = styled.div`
  position: sticky;
  top: 48px;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  max-height: 30px;

  background: ${(props) => props.theme.color.backgroundColor};
  z-index: 999;
  @media (max-width: 900px) {
    top: 0;
  }
`;
const LeftMoveBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 0.3em;
  margin-right: 1px;
  background: ${(props) => props.theme.color.whiteColor};
  box-shadow: 1px -1.5px 3px 1px rgba(0, 0, 0, 0.2);
  z-index: 9;
  cursor: pointer;
`;
const RightMoveBtn = styled(LeftMoveBtn)`
  margin-right: 0;
  box-shadow: -1px -1.5px 3px 1px rgba(0, 0, 0, 0.2);

  @media (max-width: 900px) {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
const CanvasListBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background: ${(props) => props.theme.color.hoverColor};
`;
const CanvasListFakeBox = styled.div`
  display: flex;
  width: auto;
  height: 100%;
  padding-right: 6em;
`;

const CanvasList = styled.button`
  white-space: nowrap;
  width: auto;
  padding: 0.2em 0.7em;
  margin: 0 1px;
  height: 100%;
  background: ${(props) => (props.styling ? props.theme.color.whiteColor : props.theme.color.backgroundColor)};
`;
