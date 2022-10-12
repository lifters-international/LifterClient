import React, { useState, useEffect } from 'react';

export const useIsMobile = () => {
    const [ isMobile, setIsMobile ] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 845;

    function HandleWidthChange() {
        setWidth(window.innerWidth);
        setIsMobile(width < breakpoint);
    }

    useEffect(() => {
        window.addEventListener('resize', HandleWidthChange);
        return () => window.removeEventListener('resize', HandleWidthChange);
    }, []);

    return isMobile;
}