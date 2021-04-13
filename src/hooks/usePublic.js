import { useState, useEffect } from 'react';

export default function usePublic({ pub, _writer, sessionId }) {
  const [_public, setPublic] = useState();

  // 공개 비공개 함수
  const contentPubHandler = () => {
    if (_writer !== sessionId && pub === 0) {
      setPublic(false);
    } else {
      setPublic(true);
    }
  };

  useEffect(() => {
    contentPubHandler();
  }, [pub]);

  return _public;
}
