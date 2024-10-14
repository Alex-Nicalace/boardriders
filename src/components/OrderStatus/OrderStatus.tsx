import { EOrderState } from '../../types';
import { formaterCurrency } from '../../utils/formaters';
import OrderStateHint from '../OrderStateHint';
import './OrderStatus.scss';

export type TOrderStatusData = {
  code: string;
  status: EOrderState;
  price: number;
  isPaid: boolean;
};

type TOrderStatusProps = {
  className?: string;
  mode?: 'compact' | 'large' | 'normal';
} & TOrderStatusData;
function OrderStatus({
  className,
  code,
  status,
  price,
  isPaid,
  mode = 'normal',
}: TOrderStatusProps): JSX.Element {
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
      <span className="order-status__code">{code}</span>
      <OrderStateHint
        className="order-status__status"
        state={status}
        iconWidth={mode === 'large' ? 16 : undefined}
        iconHeight={mode === 'large' ? 23 : undefined}
      />
      <span className="order-status__price">{formaterCurrency(price)}</span>
      <span className="order-status__is-paid">
        {isPaid ? 'Оплачен' : 'Не оплачен'}
      </span>
    </div>
  );
}

export default OrderStatus;
