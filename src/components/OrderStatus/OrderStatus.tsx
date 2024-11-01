import { isTStatusOrderKey } from '../../utils/assertionFunc';
import { formaterCurrency } from '../../utils/formaters';
import OrderStateHint from '../OrderStateHint';
import './OrderStatus.scss';
import { TOrderStatusProps } from './OrderStatus.types';

function OrderStatus({
  className,
  data,
  mode = 'normal',
}: TOrderStatusProps): JSX.Element {
  const { id, status, totalPrice, payMethod } = data;
  if (!isTStatusOrderKey(status)) throw new Error('Invalid state');

  return (
    <div
      className={[
        'order-status',
        mode === 'compact' && 'order-status_compact',
        mode === 'large' && 'order-status_large',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="order-status__code">{id}</span>
      <OrderStateHint
        className="order-status__status"
        state={status}
        iconWidth={mode === 'large' ? 16 : undefined}
        iconHeight={mode === 'large' ? 23 : undefined}
      />
      <span className="order-status__price">
        {formaterCurrency(totalPrice)}
      </span>
      <span className="order-status__is-paid">
        {payMethod === 'cash' ? 'Оплачен' : 'Не оплачен'}
      </span>
    </div>
  );
}

export default OrderStatus;
