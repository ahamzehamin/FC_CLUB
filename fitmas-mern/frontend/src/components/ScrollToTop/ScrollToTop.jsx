import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './ScrollToTop.css';

/**
 * ScrollToTop component (from jQuery main.js)
 * Replaces: jQuery scroll to top with progress animation
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = document.querySelector('.scroll-top');
    if (!container) return;

    const progressPath = container.querySelector('path');
    if (!progressPath) return;

    const pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = pathLength;

    const updateProgress = () => {
      const scroll = window.pageYOffset || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength) / height;
      setScrollProgress(progress);

      // Show/hide button
      setIsVisible(scroll > 50);

      // Update path
      if (progressPath) {
        progressPath.style.strokeDashoffset = progress;
      }
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="scroll-top show" onClick={scrollToTop}>
      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          style={{
            transition: 'stroke-dashoffset 10ms linear 0s',
            strokeDasharray: '307.919, 307.919',
            strokeDashoffset: scrollProgress,
          }}
        />
      </svg>
      <FaArrowUp />
    </div>
  );
};

export default ScrollToTop;
