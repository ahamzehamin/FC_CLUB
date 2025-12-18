import { useEffect } from 'react';

/**
 * Hook to handle One Page Navigation smooth scrolling (from jQuery main.js)
 * Replaces: onePageNav('.onepage-nav') and sticky menu
 *
 * NOTE: In MERN app, this would be used in Header component, but since we use
 * HashRouter, React Router handles the navigation automatically.
 */
const useOnePageNav = (elementSelector = '.onepage-nav') => {
  useEffect(() => {
    const onePageNav = document.querySelectorAll(elementSelector);

    if (onePageNav.length > 0) {
      onePageNav.forEach(navContainer => {
        const links = navContainer.querySelectorAll('a');

        links.forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');

            if (target && target.startsWith('#')) {
              const targetElement = document.querySelector(target);
              if (targetElement) {
                window.scrollTo({
                  top: targetElement.offsetTop - 10,
                  behavior: 'smooth'
                });
              }
            }
          });
        });
      });
    }
  }, [elementSelector]);

  // Handle sticky menu class for one-page navigation
  useEffect(() => {
    const handleScroll = () => {
      if (document.querySelector('.onepage-nav')) {
        const navHeader = document.querySelector('.nav-header .sticky-active');
        if (window.scrollY > 0) {
          navHeader?.classList.add('sticky');
        } else {
          navHeader?.classList.remove('sticky');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

export default useOnePageNav;
