import { useEffect } from 'react';

/**
 * Hook to handle Shape Mockup positioning (from jQuery main.js)
 * Replaces: $(".shape-mockup").shapeMockup();
 */
const useShapeMockup = () => {
  useEffect(() => {
    const shapeElements = document.querySelectorAll('.shape-mockup');

    if (shapeElements.length > 0) {
      shapeElements.forEach((shape) => {
        const shapeTop = shape.dataset.top;
        const shapeRight = shape.dataset.right;
        const shapeBottom = shape.dataset.bottom;
        const shapeLeft = shape.dataset.left;

        // Apply positioning styles
        const styles = {};
        if (shapeTop !== undefined) styles.top = shapeTop;
        if (shapeRight !== undefined) styles.right = shapeRight;
        if (shapeBottom !== undefined) styles.bottom = shapeBottom;
        if (shapeLeft !== undefined) styles.left = shapeLeft;

        // Apply styles
        Object.assign(shape.style, styles);

        // Remove data attributes and add wrapper class
        shape.removeAttribute('data-top');
        shape.removeAttribute('data-right');
        shape.removeAttribute('data-bottom');
        shape.removeAttribute('data-left');

        shape.parentElement?.classList.add('shape-mockup-wrap');
      });
    }
  }, []);
};

export default useShapeMockup;
