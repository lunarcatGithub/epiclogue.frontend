import { useRef, useEffect, useState} from 'react';

export default function useScroll(handleScroller) {

  const dom = useRef();
  const [params, setParams] = useState();
  const handleScroll = (entry) => {

    if (entry[0].isIntersecting) {
      handleScroller(params);
    }
  }

  useEffect(() => {
    const { current } = dom;
    let options = {
      root: null,
      rootMargin: '10px',
      threshold: 0.7,
    };

    if (current) {
      let observer = new IntersectionObserver(handleScroll, options);
      observer?.observe(current);
      return () => observer?.disconnect();
    }
  }, [dom.current, params]);

  return [
    { ref: dom },
    setParams
  ];
}
