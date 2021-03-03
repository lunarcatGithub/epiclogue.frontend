
import React from "react";
import UploadFile from "./UploadFile";
// 컴포넌트 import

import RoadDataContextProvider from "@hooks/useRoadDataContext";

const Upload = (props) => {
  // const boardUid = props.match.params.boardUid;

  return (
    // <RoadDataContextProvider boardUid={boardUid}>
      <RoadDataContextProvider >
        <UploadFile />
      </RoadDataContextProvider>
  );
};

export default Upload;
