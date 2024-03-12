import { useContext } from 'react';
import { AccordionContext } from './AccordionContext';

export function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (context === undefined) {
    throw new Error('AccordionContext must be used within a AccordionProvider');
  }
  return context;
}
