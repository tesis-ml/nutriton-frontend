import { useState, useEffect } from 'react';

const useMediaQuery = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const updateMedia = () => {
            const mobile = window.matchMedia('(max-width: 767px)').matches;
            const tablet = window.matchMedia('(min-width: 768px) and (max-width: 1024px)').matches;
            const desktop = window.matchMedia('(min-width: 1025px)').matches;

            setIsMobile(mobile);
            setIsTablet(tablet);
            setIsDesktop(desktop);
        };

        updateMedia();
        window.addEventListener('resize', updateMedia);

        return () => window.removeEventListener('resize', updateMedia);
    }, []);

    return { isMobile, isTablet, isDesktop };
};

export default useMediaQuery;