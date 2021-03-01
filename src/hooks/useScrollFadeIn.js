import {useRef, useCallback, useEffect, useState} from 'react'

export default function useScrollFadeIn() {
    const dom = useRef();
    const [trigger, setTrigger] = useState(false);

    const handleScroll = useCallback(([entry]) => {
        const { current } = dom;
        
        
        if(entry.isIntersecting) {
            setTrigger(true)
          // 원하는 이벤트를 추가 할 것
          current.style.transitionProperty = 'opacity transform';
          current.style.transitionDuration = '1s';
          current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
          current.style.transitionDelay = '0s';
          current.style.opacity = 1;
          setTrigger(entry.target.dataset.set)
        }
    }, []);
    
    useEffect(() => {
    const { current } = dom;
    let observer;
    if (current) {
        observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
        observer?.observe(current);
    
        return () => observer?.disconnect();
    };
    }, [handleScroll]);

    return {
        ref: dom,
        style: {
            opacity: 0,
          },
          trigger
    };
}
