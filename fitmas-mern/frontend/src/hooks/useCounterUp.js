import { useEffect, useRef, useState } from 'react';

/**
 * Hook to handle CounterUp animated numbers (from jQuery main.js)
 * Replaces: $(".counter-number").counterUp();
 */
const useCounterUp = (endValue, duration = 2000, delay = 100) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            animateValue(0, endValue, duration, delay);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [endValue, duration, delay, isVisible]);

  const animateValue = (start, end, duration, delay) => {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime - delay;

      if (elapsed < delay) {
        requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((elapsed - delay) / duration, 1);

      // Easing function (ease out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(start + (end - start) * easedProgress);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const resetCounter = () => {
    setIsVisible(false);
    setCount(0);
  };

  return { count, ref, resetCounter };
};

export default useCounterUp;
