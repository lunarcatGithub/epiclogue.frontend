import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

//hooks && reduce
import { useDate } from '@hooks/useDate';
import { AdminContext } from '../Store/Admin_Context';

export default function ResultList({ content, setWarnConfirm, mainType }) {
  const { setCurrentData } = useContext(AdminContext);

  const [ setGetDate, , dateResult ] = useDate('Admin');

  let contentStatus;
  const contentTypeArr = {0:'삭제', 1:'정지', 2:'탈퇴', 3:'반려'};
  for(let [key, value] of Object .entries(contentTypeArr)){
    if(content?.reportStatus === Number(key)){
      contentStatus = value
    }
  }

  let reportStatus;
  const reportTypeArr = {
    0: '스팸성',
    1: '음란물',
    2: '혐오유발',
    3: '폭력성',
    4: '거짓정보',
    5: '분쟁유발',
    6: '불법 콘텐츠',
    7: '저작권 분쟁',
    8: '기타'
  };
  for(let [key, value] of Object .entries(reportTypeArr)){
    if(content?.reportStatus === Number(key)){
      reportStatus = value
    }
  }

  useEffect(() => {
    setGetDate(content?.closedAt);
  }, [content]);

  return (
    <TableRowBox>
      <TableDataBox>
        <CheckBox
          name="contents"
          value={content.id}
          // onChange={(e) => allCheckHandle(e, 'one')}
          defaultChecked={content.isSelect}
        />
      </TableDataBox>
      <TableDataBox >{0}</TableDataBox>{
        mainType === 'REPORTSRESULT' ? 
          <>
          <TableDataBox>{content?._id}</TableDataBox>
          { reportStatus && <TableDataBox>{reportStatus}</TableDataBox>}
          { contentStatus && <TableDataBox>{contentStatus}</TableDataBox> }
          { dateResult && <TableDataBox>{dateResult}</TableDataBox> }
          </>
          :
          <>
          <TableDataBox>{content?.suspectUserInfo[0]?.screenId}</TableDataBox>
          { reportStatus && <TableDataBox>{reportStatus}</TableDataBox>}
          { contentStatus && <TableDataBox>{contentStatus}</TableDataBox> }
          { dateResult && <TableDataBox>{dateResult}</TableDataBox> }
          </>
        }
        <TableDataBox type='btn' >
          <AllButton
            value={content._id}
            onClick={ () => {
              // setToggleSelect(e.currentTarget.id);
              // lastDataConfirm(e);
              setWarnConfirm(true);
              setCurrentData(content);
            } } > 복구
          </AllButton>
      </TableDataBox>
    </TableRowBox>
  );
}



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

const TableDataBox = styled.td`
  text-align: center;
  padding: 0.8em 0.5em;
`;

// 본문 레이아웃 - 헤더 UI
const CheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  width: 1em;
  height: 1em;
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