import { useContext } from 'react';
import { FormatersContext, IFormatersContext } from './FormatersContext';

export function useFormaters() {
  const context = useContext(FormatersContext) as IFormatersContext;
  if (context === undefined) {
    throw new Error('FormatersContext must be used within a FormatersProvider');
  }
  return context;
}
