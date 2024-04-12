import { createContext } from 'react';
import useMatchMedia from '../hooks/useMatchMedia';

export const ScreenWidthContext = createContext({
  isLessPC: false,
  isLessTablet: false,
  isLessMobile: false,
  isLessMobileSmall: false,
  isOverLarge: false,
});

const MEDIAQUERIES = [
  '(max-width: 1390px )',
  '(max-width: 991.98px )',
  '(max-width: 767.98px )',
  '(max-width: 479.98px )',
  '(min-width: 1500px)',
];

function ScreenWidthProvider({ children }: { children: React.ReactNode }) {
  const [isLessPC, isLessTablet, isLessMobile, isLessMobileSmall, isOverLarge] =
    useMatchMedia(MEDIAQUERIES);
  return (
    <ScreenWidthContext.Provider
      value={{
        isLessPC,
        isLessTablet,
        isLessMobile,
        isLessMobileSmall,
        isOverLarge,
      }}
    >
      {children}
    </ScreenWidthContext.Provider>
  );
}

export default ScreenWidthProvider;
