import { useMemo } from 'react';
import useMatchMedia from '../../hooks/useMatchMedia';

type TypesDevice = 'smallMobile' | 'mobile' | 'tablet' | 'pc';

type Devices = Record<TypesDevice, number>;

type MediaQueryProps = {
  children?: React.ReactNode;
  maxWidth?: number | TypesDevice;
  minWidth?: number | TypesDevice;
};

const devices: Devices = {
  smallMobile: 479.98,
  mobile: 767.98,
  tablet: 991.98,
  pc: 1390,
};

// const queries = [
//   '(max-width: 479.98px)',
//   '(min-width: 480px) and (max-width: 767.98px)',
//   '(min-width: 768px) and (max-width: 991.98px)',
//   '(min-width: 992px) and (max-width: 1390px)',
//   '(min-width: 1391px)',
// ];

function MediaQuery({
  maxWidth,
  minWidth,
  children,
}: MediaQueryProps): JSX.Element {
  const mediaQuery = useMemo(() => {
    const minWidthNumber =
      typeof minWidth === 'string' ? devices[minWidth] : minWidth;

    const maxWidthNumber =
      typeof maxWidth === 'string' ? devices[maxWidth] : maxWidth;

    return minWidthNumber && maxWidthNumber
      ? `(min-width: ${minWidthNumber}px) and (max-width: ${maxWidthNumber}px)`
      : `(min-width: ${minWidthNumber}px)` ||
          `(max-width: ${maxWidthNumber}px)`;
  }, [minWidth, maxWidth]);

  const [isMatch] = useMatchMedia([mediaQuery]);

  return <>{isMatch && children}</>;
}

export default MediaQuery;
