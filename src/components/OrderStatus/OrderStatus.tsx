import { useFormaters } from '../../Context/useFormaters';
import { LocationIcon } from '../ui/Icons';
import './OrderStatus.scss';

enum ORDER_STATUS {
  'Отменен',
  'Возврат',
  'Заказ передан в службу доставки',
}

export type TOrderStatusData = {
  code: string;
  status: ORDER_STATUS;
  price: number;
  isPaid: boolean;
};

type TOrderStatusProps = {
  className?: string;
  mode?: 'desktop' | 'mobile';
} & TOrderStatusData;
function OrderStatus({
  className,
  code,
  status,
  price,
  isPaid,
  mode = 'desktop',
}: TOrderStatusProps): JSX.Element {
  const { formaterCurrency } = useFormaters();
  const colorIcon = status === 0 ? 'gray' : status === 1 ? 'black' : 'red';

  return (
    <div
      className={[
        'order-status',
        mode === 'mobile' && 'order-status_mobile',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="order-status__code">{code}</span>
      <span className="order-status__status">
        <LocationIcon
          className={`order-status__icon order-status__icon_${colorIcon}`}
        />{' '}
        {ORDER_STATUS[status]}
      </span>
      <span className="order-status__price">{formaterCurrency(price)}</span>
      <span className="order-status__is-paid">
        {isPaid ? 'Оплачен' : 'Не оплачен'}
      </span>
    </div>
  );
}

export default OrderStatus;
