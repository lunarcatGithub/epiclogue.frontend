import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

// componenet
import ViewerUserForm from './Viewer__UserForm';
import ViewerStore from '../../store/ViewerStore';

// Hooks

// reduce
import { ViewerContext } from '../../store/ViewerStore';

// utils

import { Meta } from '@utils/MetaTags';

export default function Viewer({ boardItem, nonError }) {
  const { viewerData, setViewerData } = useContext(ViewerContext);

  // board content script
  const [ boardImage, setBoardImage ] = useState([]);
  const [ category, setCategory ] = useState();
  const [ devidedBoard, setDevidedBoard ] = useState();
  const [ isPublic, setIsPublic ] = useState();

  useEffect(() => {
    if (!boardItem) return;
    const boardData = boardItem.data;
    console.log(boardData)

    // global data
    setViewerData(boardData);
    
    // local data
    setBoardImage(boardData.boardImg);
    setCategory(Number(boardData.category));

    // content devide
    if(boardData.originBoardId){
      setDevidedBoard(
      <>
        <ViewerUserForm type="ORIGIN" />
        <ViewerUserForm type="SECOND" />
      </>
      )
    } else {
      setDevidedBoard( <ViewerUserForm type="NOSECOND" /> )
    }
  }, [boardItem]);

  return (
  <>
    {/* <Meta meta={''} /> */}
      <ViewerPortWrap>
        {/* 뷰어 콘텐츠 레이아웃 */}
        <ContentsAllView>
          <ViewerPort>{ boardImage.map((item, index) => <ViewImg key={index} src={item} category={category} /> ) }</ViewerPort>
        </ContentsAllView>
      {/* 유저 인터렉션 레이아웃 */}
        <UserCommentWrap>
          <UserComment>
            { /* 원작 유저 */}
            { devidedBoard }
          {/* 모바일용 뷰어 */}
          <MobileViewerPort>
            { boardImage.map((item, index) => <ViewImg key={index} src={item} /> ) }
          </MobileViewerPort>
          </UserComment>
        </UserCommentWrap>
      </ViewerPortWrap>
  </>
  );
}

// 전체 레이아웃
const ViewerPortWrap = styled.section`
  display: flex;
  width: 100%;

  @media (max-width: 900px) {
    flex-flow: column;
  }
`;

// 뷰어 콘텐츠 레이아웃

const ContentsAllView = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  flex:2.5;
  margin-right: 10px;
  background: ${(props) => props.theme.color.whiteColor};
  user-select: none;
  @media (max-width: 900px) {
    display: none;
  }
`;

// 뷰어 콘텐츠 레이아웃 -- 이미지
const ViewerPort = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  width: 100%;
  height: auto;
  @media (max-width: 900px) {
    padding: 3px 0;
  }
`;

// 유저 코멘트 부분
const UserCommentWrap = styled.section`
  position: sticky;
  top: 60px;
  right: 3px;
  flex:1;
  max-height: 100%;
  background: #999;
  -ms-overflow-style: none;
  /* IE and Edge */
  overflow-x: scroll;
  overflow-x: hidden;
  background: ${(props) => props.theme.color.backgroundColor};
  &::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera*/
  }
  @media (max-width: 900px) {
    position: static;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-height: 100%;
    padding-top: 10px;
    overflow-x: auto;
  }
`;
// 뷰어 이미지
const ViewImg = styled.img`
  object-fit: contain;
  width: 100%;
  height: auto;
  max-width: ${(props) => (props.category === 0 ? '100%' : '48em')};
  @media (max-width: 900px) {
    width: 100%;
    height: auto;
  }
`;

const UserComment = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
`;

// 모바일 버전 뷰어
const MobileViewerPort = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: flex;
  }
`;