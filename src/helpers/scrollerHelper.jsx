import {useEffect, useState} from "react";


export function scrollerHelper() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [scrolled,setScrolled] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const headerHeight = document.querySelector('.header-container').offsetHeight;

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

