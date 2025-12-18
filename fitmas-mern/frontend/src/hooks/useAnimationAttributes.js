import { useEffect } from 'react';

/**
 * Hook to handle data-ani-duration and data-ani-delay attributes (from jQuery main.js)
 * Replaces: $('[data-ani-duration]').each(...) and $('[data-ani-delay]').each(...)
 */
const useAnimationAttributes = () => {
  useEffect(() => {
    // Handle animation duration
    const durationElements = document.querySelectorAll('[data-ani-duration]');
    durationElements.forEach(element => {
      const duration = element.getAttribute('data-ani-duration');
      if (duration) {
        element.style.animationDuration = duration;
        element.removeAttribute('data-ani-duration');
      }
    });

    // Handle animation delay
    const delayElements = document.querySelectorAll('[data-ani-delay]');
    delayElements.forEach(element => {
      const delay = element.getAttribute('data-ani-delay');
      if (delay) {
        element.style.animationDelay = delay;
        element.removeAttribute('data-ani-delay');
      }
    });
  }, []);
};

export default useAnimationAttributes;
