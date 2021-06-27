import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

//utils
import Dropdown from '../Utils/Dropdown';
import Modal from '@utils/Modal'

//hooks && reduce
import { AdminContext } from '../Store/Admin_Context';

//component
import { AdminConfirmPopup } from './Admin_Confirm_Popup';
import List from './List';


export default function ListForm({ type, contentsData }) {
  const {
    categorySelec,
    hideOrNot,
    searchFilter,
    headerArr,
    userContentsData,
    tableRef,
    setToggleSelect,
    //remove
    toggleSelect,
    setUserContentsData,
    buttonType
  } = contentsData;

  const { reportList, reportData, setCurrentTargetData, copyrightData } = useContext(AdminContext);

  // console.log(reportData[0]?.suspactUserInfo[0])

  // data 분류
  const [ listData, setListData ] = useState([]);
  // const [ suspectScreenId, setSuspectScreenId ] = useState();

  const [dropDown1, setDropDown1] = useState([]);
  const [dropDown2, setDropDown2] = useState([]);
  const [dropDown3, setDropDown3] = useState([]);
  const [bodyData, setBodyData] = useState([]);

  const [selectedData, setSelectedData] = useState([]);
 
  // confirm
  const [warnConfirm, setWarnConfirm] = useState(false);
  const [userEmail, setUserEmail] = useState({type:null, bool:false});

  const typeHandler = () => {
    let arr = [];

    userContentsData?.map((data, i) => {
      arr.push({ ...data, btnArr:buttonType, isSelect: false });
    });

    setBodyData(arr);

    switch (type) {
      case 'CONTENTS':
        setDropDown1(categorySelec);
        setDropDown2(hideOrNot);
        setDropDown3(searchFilter);

        break;
      case 'USERS':
        setDropDown1(categorySelec);
        setDropDown2('');
        setDropDown3(searchFilter);

        break;
      case 'REPORT':
        setDropDown1('');
        setDropDown2('');
        setDropDown3('');
        break;

      case 'COPYRIGHT':
        setDropDown1('');
        setDropDown2('');
        setDropDown3('');
        break;

      default:
        break;
    }
  };

  const lastDataConfirm = (e, type) => {
    setWarnConfirm(true);
    listData?.filter( uid => uid._id === Number(e.target.id) && setSelectedData(uid));
    setCurrentTargetData()
  };

  const userSendEmail = (e, type) => {
    setUserEmail(true);
    const { target: value } = e
    console.log(value)
  }

  const allCheckHandle = (e, type) => {
    bodyData.forEach( ( list ) => {
      if (type === 'one') {
        if (Number(e.target.value) === list.id) {
          list.isSelect = e.target.checked;
        }
      } else {
        list.isSelect = e.target.checked;
      }
    });
    setBodyData(bodyData);
  };

  const dataHandler = (e, subType) => {
    userContentsData?.forEach((_contentsData) => {
      if (Number(toggleSelect) === _contentsData.id) {
        let data = userContentsData;

        if(type === 'REPORT'){
          if (subType === 'main') {
            data.splice(Number(toggleSelect) - 1, 1);
            setUserContentsData(data);

          } else if (subType === 'sub') {
            if (userContentsData.hide === true) {
              data.hide = false;

            } else {
              data.hide = true;
            }
            setUserContentsData(data);
          }
        }
      } else return;
      
    });
  };

  // 최종 확인
  const dangerConfirm = () => {

  };

  useEffect(() => {
    typeHandler();
  }, [type]);

  useEffect(() => {
    if(reportData?.length === 0) return;
    if( type === 'REPORT' ){
      setListData(reportData);

    } else {
      setListData(copyrightData);

    }
  }, [reportData, copyrightData])

  const viewNum = [
    { title: '10개', value: 10 },
    { title: '30개', value: 30 },
    { title: '50개', value: 50 },
  ];

  return (
    <>
      <TopLayout>
        {/* 상단 좌측 레이아웃 */}
        <TopLeftLayout>

        </TopLeftLayout>
        {/* 상단 중앙 레이아웃 */}
        <TopCenterLayout>
          {/* <Dropdown data={viewNum} /> */}
          <Dummy2 />
          {/* <Dropdown data={dropDown1} type={type} /> */}
          { type !== 'USERS' && (
            <>
              <Dummy />
              <Dropdown
                data={dropDown2} 
                type={type} 
              />
            </> ) }
        </TopCenterLayout>
        <TopRightLayout>
          {/* <Dropdown data={dropDown3} type={type} /> */}
          <Dummy />
          <SearchInput />
          <AllButton>검색</AllButton>
        </TopRightLayout>
      </TopLayout>
      <MainLayout>
        {/* 본문 테이블 */}
        <TableBox ref={tableRef}>
          <TableHead>
            <TableRowBox styling="header" >
              {/*  테이블 헤더 */}
              <TableHeadLine>
                <CheckBox onChange={(e) => allCheckHandle(e, 'all')} />
              </TableHeadLine>
              {
                headerArr?.map((item, key) => (
                <TableHeadLine key={key}>{item}</TableHeadLine> ))
              }
            </TableRowBox>
          </TableHead>
          {/*  테이블 본문 시작 */}
          <TableBody>
            { listData?.map( ( content, i ) => ( 
              <List key={i} content={content} setWarnConfirm={setWarnConfirm} mainType={type}/> 
              ) ) }
          </TableBody>
        </TableBox>
      </MainLayout>
      {/* 정지, 탈퇴, 블라인드 팝업 */}
        {
          warnConfirm &&
          <Modal visible={warnConfirm} closable={true} maskClosable={true} onClose={ () => setWarnConfirm(false) }>
            <AdminConfirmPopup 
              // type={warnConfirm}
              mainType={type}
              dataHandler={dataHandler}
              reportList={reportList}
              setWarnConfirm={setWarnConfirm}
              listData={selectedData}
              dangerConfirm={dangerConfirm}
              lastDataConfirm={lastDataConfirm}
            />
          </Modal>
        }
        { /* 유저 정보 확인 (저작권 신고) */ }
        {
          userEmail.bool &&
          <Modal visible={userEmail.bool} closable={true} maskClosable={true} onClose={() => setUserEmail({...userEmail, bool:false})}>
            <AdminConfirmPopup 
              type={userEmail.type}
              mainType={type}
              closePopup={setUserEmail}
            />
          </Modal>
        }
        {/* 콘텐츠 내용, 댓글 내용, 유저 정보 팝업 */}
    </>
  );
}

//레이아웃
const Dummy = styled.div`
  display: flex;
  width: 1em;
`;
const Dummy2 = styled(Dummy)`
  display: flex;
  width: 2em;
`;

// 상단 레이아웃
const TableHead = styled.thead``;

const TopLayout = styled.div`
  display: flex;
  justify-content: space-around;
  /* width:100%; */
  height: 100%;
  padding: 0.5em 1em;
  background: ${(props) => props.theme.adminColor.whiteColor};
  margin-bottom: 0.2em;
`;
// 상단 좌측 레이아웃
const TopLeftLayout = styled.div`
  display: flex;
  /* justify-content:center; */
  align-items: center;
  width: 100%;
  height: 100%;
`;

const AllButton = styled.button.attrs({
  type: 'submit',
})`
  padding: 0.4em 0.6em;
  border-radius: 0.3em;
  background: ${(props) => props.theme.adminColor.replyOrange};
  color: ${(props) => props.theme.adminColor.whiteColor};
  cursor: pointer;
`;
const TopmenuBtn = styled(AllButton)`
  margin-right: 0.5em;
`;

// 상단 중앙 레이아웃
const TopCenterLayout = styled(TopLeftLayout)``;

// 상단 우측 레이아웃
const TopRightLayout = styled(TopLeftLayout)``;
const SearchInput = styled.input.attrs({
  type: 'text',
})`
  border: 1px solid ${(props) => props.theme.adminColor.replyOrange};
  padding: 0.4em 0;
  border-radius: 0.4em;
  margin-right: 0.2em;
`;

// 본문 레이아웃
const TableBody = styled.tbody``;

const MainLayout = styled.div`
  width: 100%;
  height: 100%;
`;

const TableBox = styled.table`
  width: 100%;
`;
const TableHeadLine = styled.th`
  font-size: ${(props) => props.theme.fontSize.font16};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  padding: 0.8em 1em;
  border-bottom: 2px solid ${(props) => props.theme.adminColor.hoverColor};
`;

const TableRowBox = styled.tr`
  background: ${(props) => props.theme.adminColor.whiteColor};
  &:hover {
    background: ${
    (props) => props.styling !== "header" ?
    props.theme.adminColor.semiOrangeColor
    :
    null
  };
  }
`;

// 본문 레이아웃 - 헤더 UI
const CheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  width: 1em;
  height: 1em;
`;

