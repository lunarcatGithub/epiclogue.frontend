import {useState, useEffect, useCallback} from 'react'

export default function AutoHiding() {
    const [scrollPos, setScrollPos] = useState(0);
    const [show, setShow] = useState(true);

    // 헤더 스크롤 함수
    const handleScroll = useCallback(()=> {
        const currentScrollPos = window.pageYOffset;
        setShow(scrollPos > currentScrollPos)
        // setShow((scrollPos > currentScrollPos && -scrollPos - currentScrollPos > 70) || currentScrollPos < 10);
        setScrollPos(currentScrollPos)
      },[scrollPos])
    
      useEffect(()=> {
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        }
      },[scrollPos])
    
    return show
}
