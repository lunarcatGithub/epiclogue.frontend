
import React from "react";
import UploadFile from "./UploadFile";
// 컴포넌트 import

import RoadDataContextProvider from "../Hook/useRoadDataContext";

// 아이콘 import
// import OriginUserImg from "../../svg/originUser.svg";

const Upload = (props) => {
  const boardUid = props.match.params.boardUid;

  return (
      <RoadDataContextProvider boardUid={boardUid}>
        <UploadFile />
      </RoadDataContextProvider>
  );
};

export default Upload;
