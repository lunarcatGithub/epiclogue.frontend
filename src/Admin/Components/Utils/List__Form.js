import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

//utils
import Dropdown from '../Utils/Dropdown';

//hooks && reduce
import Modal from '@utils/Modal'
import {AdminContext} from '../Store/Admin_Context';

//component
import {AdminConfirmPopup} from './Admin_Confirm_Popup';

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
    setUserContentsData
  } = contentsData;
  
  const {reportList} = useContext(AdminContext);

  const [dropDown1, setDropDown1] = useState([]);
  const [dropDown2, setDropDown2] = useState([]);
  const [dropDown3, setDropDown3] = useState([]);
  const [headerArray, setHeaderArray] = useState();
  const [bodyData, setBodyData] = useState([]);
  const [warnBtn, setWarnBtn] = useState([]);
  // confirm
  const [warnConfrim, setWarnConfirm] = useState({type:null, bool:false});

  const typeHandler = () => {
    let arr = [];
    userContentsData?.forEach((data, i) => {
      arr.push({ ...data, isSelect: false });
    });
    setBodyData(arr);

    switch (type) {
      case 'CONTENTS':
        setDropDown1(categorySelec);
        setDropDown2(hideOrNot);
        setDropDown3(searchFilter);
        setHeaderArray(headerArr);

        setWarnBtn([
          { title: '삭제', value: 'remove' },
          { title: '숨기기 ', value: 'hide' },
        ]);
        break;
      case 'USERS':
        setDropDown1(categorySelec);
        setDropDown2('');
        setDropDown3(searchFilter);
        setHeaderArray(headerArr);

        setWarnBtn([
          { title: '메일발송', value: 'sendMail' },
          { title: '정지', value: 'ban' },
          { title: '탈퇴', value: 'leave' },
        ]);

        break;
      case 'REPORT':
        setDropDown1('');
        setDropDown2('');
        setDropDown3('');
        setHeaderArray(headerArr);
        setWarnBtn([
          { title: '메일발송', value: 'sendMail' },
          { title: '정지', value: 'ban' },
          { title: '탈퇴', value: 'leave' },
          { title: '삭제', value: 'remove' },
        ]);
        break;

      default:
        break;
    }
  };

  const lastDataConfirm = (e, type) => {
    setWarnConfirm({type, bool:true})
  };

  const allCheckHandle = (e, type) => {
    
    bodyData.forEach((list) => {
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

  useEffect(() => {
    contentsData && typeHandler();
  }, [type]);

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
          {
            warnBtn.map((btn, i) => (
              <TopmenuBtn key={i} onClick={(e) => dataHandle(e, btn.value)}>
                {btn.title}
              </TopmenuBtn>
            ))
          }
        </TopLeftLayout>
        {/* 상단 중앙 레이아웃 */}
        <TopCenterLayout>
          <Dropdown data={viewNum} />
          <Dummy2 />
          <Dropdown data={dropDown1} type={type} />
          {
            type !== 'USERS' && (
              <>
                <Dummy />
                <Dropdown data={dropDown2} type={type} />
              </> )
          }
        </TopCenterLayout>
        <TopRightLayout>
          <Dropdown data={dropDown3} type={type} />
          <Dummy />
          <SearchInput />
          <AllButton>검색</AllButton>
        </TopRightLayout>
      </TopLayout>
      <MainLayout>
        {/* 본문 테이블 */}
        <TableBox ref={tableRef}>
          <TableHead>
            <TableRowBox>
              {/*  테이블 헤더 */}
              <TableHeadLine>
                <CheckBox onChange={(e) => allCheckHandle(e, 'all')} />
              </TableHeadLine>
              {
                headerArray?.map((item, key) => (
                  <TableHeadLine key={key}>{item}</TableHeadLine> ))
              }
            </TableRowBox>
          </TableHead>
          {/*  테이블 본문 시작 */}
          <TableBody>
            {
              bodyData?.map((content, i) => (
                <TableRowBox key={i}>
                  <TableDataBox>
                    <CheckBox
                      name="contents"
                      value={content.id}
                      onChange={(e) => allCheckHandle(e, 'one')}
                      defaultChecked={content.isSelect}
                    />
                  </TableDataBox>
                  <TableDataBox >{content.id}</TableDataBox>
                  <TableDataBox>{content.email}</TableDataBox>
                  <TableDataBox>{content._id}</TableDataBox>
                  {content.type && <TableDataBox>{content.type}</TableDataBox>}
                  {content.join && <TableDataBox>{content.join}</TableDataBox>}
                  {content.title && <TableDataBox>{content.title}</TableDataBox>}
                  {content.category && <TableDataBox>{content.category}</TableDataBox>}
                  {content.result && <TableDataBox>{content.result}</TableDataBox>}
                  {content.kind && <TableDataBox>{content.kind}</TableDataBox>}
                  {content.content && <TableDataBox>{content.content}</TableDataBox>}
                  {content.date && <TableDataBox>{content.date}</TableDataBox>}
                  {content.count && <TableDataBox>{content.count}</TableDataBox>}
                  {content.view && <TableDataBox>{content.view === 'view' ? '보임' : '숨김' }</TableDataBox>}
                  {
                    type !== 'CONTENTS' && (
                      <TableDataBox>
                        <AllButton
                          id={content.id}
                          onClick={(e) => {
                            setToggleSelect(e.currentTarget.id);
                            lastDataConfirm(e, 'Suspension ');
                          }}
                        >
                          {content.ban ? '해제' : '정지'}
                        </AllButton>
                      </TableDataBox> )
                  }
                  {
                    type !== 'USERS' && (
                      <TableDataBox>
                        <AllButton
                          id={content.id}
                          onClick={(e) => {
                            setToggleSelect(e.currentTarget.id);
                            lastDataConfirm(e, 'Hide');
                          }}
                        >
                          {content.hide ? '보이기' : '숨기기'}
                        </AllButton>
                      </TableDataBox> )
                  }
                  {
                    type !== 'USERS' && (
                      <TableDataBox>
                        <AllButton
                          id={content.id}
                          onClick={(e) => {
                            setToggleSelect(e.currentTarget.id);
                            lastDataConfirm(e, 'Remove');
                          }}
                        >
                          삭제
                        </AllButton>
                      </TableDataBox> )
                  }
                  {
                    type !== 'CONTENTS' && (
                      <TableDataBox>
                        <AllButton
                          id={content.id}
                          onClick={(e) => {
                            setToggleSelect(e.currentTarget.id);
                            lastDataConfirm(e, 'Withdrawal');
                          }}
                        >
                          탈퇴
                        </AllButton>
                      </TableDataBox> )
                  }
                </TableRowBox> ))
            }
          </TableBody>
        </TableBox>
      </MainLayout>
        {
          warnConfrim.bool &&
        <Modal visible={warnConfrim.bool} closable={true} maskClosable={true} onClose={() => setWarnConfirm({...warnConfrim, bool:false})}>
          < AdminConfirmPopup 
            type={warnConfrim.type}
            dataHandler={dataHandler}
            reportList={reportList}
            closePopup={setWarnConfirm}
          />
        </Modal>
        }
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

const Layout = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2em;
`;

const LayoutInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
`;
const TableDataBox = styled.td`
  text-align: center;
  padding: 0.8em 1em;
`;
// 본문 레이아웃 - 헤더 UI
const CheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  width: 1em;
  height: 1em;
`;

