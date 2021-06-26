import React, { useState, useEffect } from 'react';
import UploadFile from './UploadFile';
import { useRouter } from 'next/router';
import useAxiosFetch from '@hooks/useAxiosFetch';

// 컴포넌트 import

import RoadDataContextProvider from '@hooks/useRoadDataContext';

const Upload = () => {
  const route = useRouter();
  const { _type, boardUid } = route.query;

  // fetch
  const [, editApi, , editFetch] = useAxiosFetch();
  const [editData, setEditData] = useState();

  const editHandler = () => {
    editFetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}/edit`, 'get');
  };

  useEffect(() => {
    if (!boardUid) return;
    editHandler();
  }, [boardUid]);

  useEffect(() => {
    setEditData(editApi?.data);
  }, [editApi?.result]);

  return (
    <RoadDataContextProvider boardUid={boardUid}>
      <UploadFile type={_type} editData={editData} boardUid={boardUid} />
    </RoadDataContextProvider>
  );
};

export default Upload;
