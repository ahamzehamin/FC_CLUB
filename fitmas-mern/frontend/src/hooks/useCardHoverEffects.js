import { useState } from 'react';

/**
 * Hook to handle card hover effects (from jQuery main.js)
 * Replaces: $(document).on('mouseover','.feature-card',function() ...)
 */
const useCardHoverEffects = (initialActive = 1) => {
  const [activeCard, setActiveCard] = useState(initialActive);

  const handleCardHover = (cardId) => {
    setActiveCard(cardId);
  };

  return { activeCard, handleCardHover };
};

export default useCardHoverEffects;
