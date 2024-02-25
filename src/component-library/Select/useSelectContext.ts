import { useContext } from 'react';
import { SelectContext } from './SelectContext';

export function useSelectContext() {
  const context = useContext(SelectContext);

  if (context === undefined) {
    throw new Error('SelectContext must be used within a Select.Provider');
  }
  return context;
}
