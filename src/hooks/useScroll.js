import { useRef, useEffect, useState} from 'react';

export default function useScroll() {

  const dom = useRef();
  const [page, setPage] = useState(0);

  const handleScroll = (entry) => {
    if (entry[0].isIntersecting) {
      setPage(num => num + 1);
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
  }, [dom.current]);

  return [
    page,
    { ref: dom },
    setPage
  ];
}
