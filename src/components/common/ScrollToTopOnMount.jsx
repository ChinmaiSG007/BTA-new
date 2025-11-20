import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopOnMount = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top instantly when route changes
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTopOnMount;
