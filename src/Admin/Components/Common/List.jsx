import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

//hooks && reduce
import { useDate } from '@hooks/useDate';
import { AdminContext } from '../Store/Admin_Context';

export default function List({ content, setWarnConfirm, mainType }) {
  const { setCurrentData } = useContext(AdminContext);

  const [ setGetDate, , dateResult ] = useDate('Admin');

  useEffect(() => {
    setGetDate(content?._createdAt);
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
      <TableDataBox >{0}</TableDataBox>
        <TableDataBox>{content?.suspectUserInfo[0]?.screenId}</TableDataBox>
        { mainType === 'COPYRIGHT' ?
        [
          <TableDataBox key={0} >{dateResult}</TableDataBox>,
        ]
        :
        <>
          { content?._contentType && <TableDataBox>{content?._contentType}</TableDataBox> }
          { content?.join && <TableDataBox>{content.join}</TableDataBox> }
          { content?.category && <TableDataBox>{content.category}</TableDataBox> }
          { content?.kind && <TableDataBox>{content.kind}</TableDataBox> }
          { content?.content && <TableDataBox>{content.content}</TableDataBox> }
          { content?.count && <TableDataBox>{content.count}</TableDataBox> }
          { content?.result && <TableDataBox>{content.result}</TableDataBox> }
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