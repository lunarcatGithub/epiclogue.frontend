import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

// componenet
import ViewerUserForm from './Viewer__UserForm';
import ViewerStore from '../../store/ViewerStore';
import MorePopup from './MoreMenuPopup';
import ReportsPopup from '../report/ReportsPopup';
import ViewerReact from './Viewer__React';
import TranslatePopup from './TranslatePopup';
import ViewerWriteFeedbak from './Viewer__WriteFeedbak';
import FeedbackForm from './Feedback';

// Hooks
import { useModal } from '@hooks/useModal';
import useAxiosFetch from '@hooks/useAxiosFetch';
import { useToggle } from '@hooks/useToggle';
import { useUrlMove } from '@hooks/useUrlMove';

// reduce
import { ViewerContext } from '../../store/ViewerStore';

// utils
import { Meta } from '@utils/MetaTags';
import Modal from '@utils/Modal';
import ConfirmPopup from '@utils/ConfirmPopup';

export default function Viewer({ boardItem, nonError }) {
  const { viewerData, setViewerData, userPopup, setUserPopup, typeMenuPopup, setTypeMenuPopup, popupType, setPopupType } = useContext(ViewerContext);
  const [goBack] = useUrlMove();

  // board content script
  const [ boardImage, setBoardImage ] = useState([]);
  const [ category, setCategory ] = useState();
  const [ devidedBoard, setDevidedBoard ] = useState();
  const [ isPublic, setIsPublic ] = useState();

  const [accessConfirm, setAccessConfirm] = useState(false);

  // fetch
  const [ , dataApi, dataLoading, dataFetch ] = useAxiosFetch();

  // interation user popup
  const contentPopup = (screenId, user_id) => {
    setUserPopup(true)
    if (localStorage.getItem('userid') === screenId) {
      setTypeMenuPopup(
      <MorePopup type="MyContentPopup" />
      );
    } else {
      setTypeMenuPopup(
      <MorePopup type="UserContentPopup" />
      );
    }
  };

  console.log(popupType)
  const reportOrRemoveOrModifyOrTrans = () => { // useEffect에서 popup 관리
    if(popupType === 'ContentReport'){
      setTypeMenuPopup(<ReportsPopup onClose={setUserPopup} />)
    } else if(popupType === 'ContentModify'){
      return
    } else if (popupType === 'ContentRemove'){
      setTypeMenuPopup(<ConfirmPopup type="CONFIRM" setAccessConfirm={setAccessConfirm} />)

    } else if (popupType === 'WorkSecondary'){
      setTypeMenuPopup(<TranslatePopup/>)

    } else if (popupType === 'RemovedBoard'){ // 작품이 삭제되고 그걸 2차 창작하려 할 때 발생
      setTypeMenuPopup(<ConfirmPopup type="REMOVEORIGIN" handleModal={() => setUserPopup(false)} />)

    } else if (popupType === 'BannedSecondary'){ // 2차 창작 불허
      setTypeMenuPopup(<ConfirmPopup type="TRANS" handleModal={() => setUserPopup(false)} />)
    }
    // onclick으로 컨트롤 하는게 아님 - popupType이 바뀔 때 마다 popup => close 할 때 빈값으로 변경
    setPopupType('')
  };

  // remove board
  const removeBoard = () => {
    dataFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${viewerData._id}`, 'delete', null, null, null);
  }

  useEffect(() => {
    if (!boardItem) return;
    const boardData = boardItem.data;
    console.log(boardData);

    // global data
    setViewerData(boardData);
    
    // local data
    setBoardImage(boardData.boardImg);
    setCategory(Number(boardData.category));

    // content devide
    if(boardData.originUserId){
      setDevidedBoard(
        <>
          <ViewerUserForm type="ORIGIN" contentPopup={contentPopup} />
          <ViewerUserForm type="SECOND" contentPopup={contentPopup} />
        </>
      )
    } else {
      setDevidedBoard( <ViewerUserForm type="NOSECOND" contentPopup={contentPopup} /> )
    }
  }, [boardItem]);

  useEffect(() => {
    reportOrRemoveOrModifyOrTrans();
  }, [popupType, userPopup]);

  useEffect(() => {
    // 콘텐츠 삭제
    if(accessConfirm && popupType === 'ContentRemove'){
      removeBoard();
      setAccessConfirm(false);
      goBack({ pathname:'/' })
    }
  }, [accessConfirm]);

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

          { /* 반응 탭 */}
            <ViewerReact />

          {/* 유저 피드백 */}
            <ViewerWriteFeedbak/> 

          {/* 피드백 영역 */}
          <FeedbackForm type="Feedback" />

          </UserComment>
        </UserCommentWrap>
      </ViewerPortWrap>
      { /* 모달 팝업 관리 */ }
        <Modal visible={userPopup} onClose={() => setUserPopup(false)}>
          { typeMenuPopup }
        </Modal>
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
