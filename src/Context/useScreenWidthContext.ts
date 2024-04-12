import { useContext } from 'react';
import { ScreenWidthContext } from './ScreenWidthContext';

export function useScreenWidth() {
  const context = useContext(ScreenWidthContext);
  if (context === undefined) {
    throw new Error(
      'ScreenWidthContext must be used within a ScreenWidthProvider'
    );
  }
  return context;
}
