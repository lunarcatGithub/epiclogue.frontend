import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components';

//컴포넌트 import
import UploadCategory from "../upload/UploadCategory";

// reducer && context
import Modal from '@utils/Modal';
import {EditorContext} from './Editor_Store';

export const ImageEditorCategory =()=> {
    const { 
        categoryShowing,
        categoryToggle,
        originData,
        boardUid,
        saveCanvas,
        imageSample
       } = useContext(EditorContext);

       // 작업 이미지 가져와서 file convert
       // 최종 이미지 캔버스 맞추기
    const imageAdjust = async() => {
        if(!categoryShowing) return;
        let worked = saveCanvas.map(async(data) => {
            await data.canvas.setWidth(data.img.width);
            await data.canvas.setHeight(data.img.height);
            await data.canvas.setZoom(1);
            await data.canvas.absolutePan({x:0, y:0});
            return {id:data.id, canvas:data.canvas.toDataURL()}
        })
          
        return Promise.all(worked).then((data) => {
            return data
            })
    }
    // 빠져있는 이미지 객체 채워넣기
    const mergyImage = async(converted) => {
        if(imageSample.length === converted.length) return converted;
        console.log(imageSample)
        return await Promise.all(
            await converted.concat(
                await imageSample.filter(urls => 
                    converted.every(conv => conv.id !== urls.id)
                    )
                )
            )
        .then((converted) => {
            converted.sort((b, a) => b.id - a.id)
            return converted
        })
        
    }
    // 조절 된 캔버스를 file 형태로 전송
    const urlToFileConvert = async(arr) => {
        console.log(arr)
        return await Promise.all(
                arr.map(async(data, i) => {
                const response = await fetch(data.canvas);
                const blob = await response.blob();
                const file = new File([blob], `worked${i}.jpg`, {type: blob.type});
                console.log(response)

                return {id:i, img:file}
              }
            )).then(res => {
                return res
          })
        }

    useEffect(() => {
        categoryShowing && categoryToggle(true)
    })
    
    return (
        <>
            {
            categoryShowing && 
            <Modal visible={Boolean(categoryShowing)} closable={true} maskClosable={true} onClose={() => categoryToggle(false)}>
                <CategoryLayout>
                    <XbtnWrap onClick={()=>categoryToggle(false)}><Xbtn/></XbtnWrap>
                    <UploadCategory 
                    imageAdjust={imageAdjust}
                    urlToFileConvert={urlToFileConvert}
                    mergyImage={mergyImage}
                    categoryToggle={categoryToggle} 
                    editorData={originData}
                    editorUid={boardUid}
                    type={'editor'} 
                    />
                </CategoryLayout>
            </Modal>
            }
        </>
    )
}

const CategoryLayout = styled.div`
position:relative;
display:flex;
align-items:center;
justify-content:center;
min-height:480px;
@media (max-width:900px){
width:100%;
min-height:100%;
height:100%;
}
`
const XbtnWrap = styled.button`
position:absolute;
display:flex;
 justify-content:center;
 align-items:center;
padding:0.5em;
top:-2.5em;
right:-2.6em;
width: 3em;
height: 3em;

`
const Xbtn = styled.span`
display:flex;
 width:100%;
 height:100%;
 
  cursor:pointer;
  &::before, &::after{
    content: "";
    position: absolute;
    left: 15px;
    height: 28px;
    width: 3px;
    background-color: ${props => props.theme.color.whiteColor};
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
}

`