import { useContext } from 'react';
import { BurgerContext } from '../Context/BurgerContext';

export function useBurgerContext() {
  const context = useContext(BurgerContext);
  if (context === undefined) {
    throw new Error('BurgerContext must be used within a BurgerProvider');
  }
  return context;
}
