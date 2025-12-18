import { useEffect } from 'react';

/**
 * Hook to handle data-bg-src background image attributes (from jQuery main.js)
 * Replaces: $('[data-bg-src]').each(function() { ... });
 */
const useBackgroundImage = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-bg-src]');

    elements.forEach(element => {
      const src = element.getAttribute('data-bg-src');
      if (src) {
        element.style.backgroundImage = `url(${src})`;
        element.classList.add('background-image');
        element.removeAttribute('data-bg-src');
      }
    });
  }, []);
};

export default useBackgroundImage;
