import { useEffect } from 'react';

/**
 * Hook to handle Progress Bar Animation (from jQuery main.js)
 * Replaces: $('.progress-bar').waypoint(function() {...}, { offset: '75%' });
 */
const useProgressBar = () => {
  useEffect(() => {
    const progressBars = document.querySelectorAll('.progress-bar');

    if (progressBars.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const progressBar = entry.target;
            progressBar.style.animation = "animate-positive 1.8s";
            progressBar.style.opacity = "1";
          }
        });
      }, { threshold: 0.75 });

      progressBars.forEach(bar => {
        observer.observe(bar);
      });

      return () => observer.disconnect();
    }
  }, []);
};

export default useProgressBar;
