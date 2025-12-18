import { useEffect, useState } from 'react';

/**
 * Hook to handle sticky navigation (from jQuery main.js)
 * Replaces: $(window).scroll(function() { ... })
 */
const useStickyNavigation = (threshold = 500, className = 'sticky') => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsSticky(scrollTop > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isSticky;
};

export default useStickyNavigation;
