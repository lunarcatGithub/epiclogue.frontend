import { useRef, useEffect, useState } from 'react';

export default function useScroll(_ref = null) {
  const dom = useRef();
  const [page, setPage] = useState(0);
  const [check, setCheck] = useState(false);

  const handleScroll = (entry) => {
    if (entry[0].isIntersecting) {
      setPage((num) => num + 1);
      setCheck(true);
    }
  };

  useEffect(() => {
    const { current } = dom;
    let options = {
      root: null,
      rootMargin: '200px',
      threshold: 0.3,
    };

    if (current) {
      let observer = new IntersectionObserver(handleScroll, options);
      observer?.observe(current);
      return () => observer?.disconnect();
    }
  }, [dom.current, _ref]);

  return [page, { ref: dom }, check, setPage];
}
