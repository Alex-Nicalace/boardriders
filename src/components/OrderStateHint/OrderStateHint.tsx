import { statusOrder } from '../../constants';
import { TStatusOrderKey } from '../../types';
import { LocationIcon } from '../ui/Icons';
import './OrderStateHint.scss';

interface ICustomCSSProperties extends React.CSSProperties {
  '--order-state-hint-icon-width'?: string;
  '--order-state-hint-icon-height'?: string;
}

type TOrderStateHintProps = {
  className?: string;
  state: TStatusOrderKey;
  iconWidth?: number;
  iconHeight?: number;
};
function OrderStateHint({
  state,
  className,
  iconWidth,
  iconHeight,
}: TOrderStateHintProps): JSX.Element {
  const colorIcon =
    state === 'canceled' ? 'gray' : state === 'returned' ? 'black' : 'red';
  const style: ICustomCSSProperties = {
    ...(iconWidth && { '--order-state-hint-icon-width': `${iconWidth}px` }),
    ...(iconHeight && { '--order-state-hint-icon-height': `${iconHeight}px` }),
  };

  return (
    <span
      className={['order-state-hint', className].filter(Boolean).join(' ')}
      style={style}
    >
      <LocationIcon
        className={`order-state-hint__icon order-state-hint__icon_${colorIcon}`}
      />{' '}
      {statusOrder[state]}
    </span>
  );
}

export default OrderStateHint;
