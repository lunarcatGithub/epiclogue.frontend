import { useRef, useCallback, useEffect, useState } from 'react';

export default function useScroll() {
  const dom = useRef();
  const [trigger, setTrigger] = useState(false);
  const [page, setPage] = useState(1);

  const handleScroll = useCallback(([entry]) => {

    if (entry.isIntersecting) {
      setPage((page) => page + 1);
    }
  }, []);

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
  }, [handleScroll]);

  return [
    page,
    {
      ref: dom,
      trigger,
    },
  ];
}
