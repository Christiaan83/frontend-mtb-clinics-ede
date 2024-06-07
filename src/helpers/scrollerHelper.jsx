import {useEffect, useState} from "react";


export function scrollerHelper() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [scrolled,setScrolled] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const headerElement = document.querySelector('.header-container');

        const headerHeight = Math.min(headerElement.offsetHeight, 340);
        const handleScroll = () => {
            const isScrolled = window.scrollY > headerHeight;
            setScrolled(isScrolled);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
return scrolled;
}

