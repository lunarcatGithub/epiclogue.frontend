import { useEffect, useState } from 'react';

export const useConvertURL = () => {
  const [path, setPath] = useState();
  const [file, setFile] = useState();

  const convertIamge = async (img) => {
    if (img) {
      const res = await fetch(img, {
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const blob = await res.blob();
      // let name = img.split("/");
      let newfile = new File([blob], img[3]);
      const url = URL.createObjectURL(newfile);
      setPath(url);
      setFile(newfile);
    }
  };

  useEffect(() => {
    convertIamge();
    return () => convertIamge();
  }, [path, file]);

  return [path, file, convertIamge];
};
