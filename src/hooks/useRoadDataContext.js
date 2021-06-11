import React, { useState, useEffect } from 'react';

let G_index = 2000;

export const RoadDataContext = React.createContext();

const RoadDataContextProvider = (props) => {
  const [roadData, setRoadData] = useState([]);
  const [boardImg, setBoardImg] = useState([]);
  const [URLs, setURLs] = useState([]);
  const boardUid = props.boardUid;
  const getFiletoImgPath = async () => {
    const article = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardUid}/edit`, {
      method: 'get',
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
      credentials: 'include',
    });
    const articledata = await article.json();
    const uploadData = articledata?.data;
    console.log(uploadData);

    let urlList = [];
    let imgList = [];
    for (let i = 0; i < uploadData?.boardImg?.length; i++) {
      const res = await fetch(uploadData?.boardImg[i], {
        mode: 'cors',
        cache: 'no-cache',
      });
      const blob = await res.blob();
      let name = uploadData.boardImg[i].split('/');
      let file = new File([blob], name[3]);
      const url = { key: G_index + i, url: URL.createObjectURL(file) };
      const img = { key: G_index + i, img: file };
      urlList.push(url);
      imgList.push(img);
    }

    if (uploadData?.boardImg) {
      setBoardImg(boardImg.concat(imgList));
      setURLs(URLs.concat(urlList));
    }
    setRoadData({ uploadData, boardUid });
    G_index = G_index + uploadData?.boardImg?.length;
  };

  useEffect(() => {
    if (boardUid) {
      getFiletoImgPath();
    } else {
      return;
    }
  }, []);
  return <RoadDataContext.Provider value={{ roadData, boardImg, URLs, setRoadData, setBoardImg, setURLs, boardUid }}>{props.children}</RoadDataContext.Provider>;
};

export default RoadDataContextProvider;
