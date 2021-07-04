import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';

//hooks && reduce
import { useDate } from '@hooks/useDate';
import { AdminContext } from '../Store/Admin_Context';

export default function List({ content, setWarnConfirm, mainType }) {
  const { setCurrentData } = useContext(AdminContext);

  const [ setGetDate, , dateResult ] = useDate('Admin');
  const [ reportData, setReportData ] = useState(null);
  console.log(content)
  useEffect(() => {
    setGetDate(content?._createdAt);
    setReportData(content)
  }, [content]);

  return (
    <TableRowBox>
      <TableDataBox>
        <CheckBox
          name="contents"
          value={reportData?.id}
          // onChange={(e) => allCheckHandle(e, 'one')}
          defaultChecked={reportData?.isSelect}
        />
      </TableDataBox>
      <TableDataBox >{0}</TableDataBox>
        <TableDataBox>{reportData?.suspectUserInfo[0]?.screenId}</TableDataBox>
        { mainType === 'COPYRIGHT' ?
        [
          <TableDataBox key={0} >{dateResult}</TableDataBox>,
        ]
        :
        <>
          { reportData?._contentType && 
          <TableDataBox> 
            <a href={`https://www.epiclogue.com/viewer/${reportData?._id}`} 
              target="_blank" 
              rel="noreferrer"
            >
            {reportData?._contentType}
            </a>
          </TableDataBox> }
          { reportData?.join && <TableDataBox>{reportData.join}</TableDataBox> }
          { reportData?.category && <TableDataBox>{reportData.category}</TableDataBox> }
          { reportData?.kind && <TableDataBox>{reportData.kind}</TableDataBox> }
          { reportData?.reportData && <TableDataBox>{reportData.content}</TableDataBox> }
          { reportData?.count && <TableDataBox>{reportData.count}</TableDataBox> }
          { reportData?.result && <TableDataBox>{reportData.result}</TableDataBox> }
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
              setCurrentData(reportData);
            } } > 처리
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