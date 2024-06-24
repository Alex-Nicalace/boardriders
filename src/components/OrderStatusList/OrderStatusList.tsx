import OrderStatus, { TOrderStatusData } from '../OrderStatus';
import './OrderStatusList.scss';

type TOrderListProps = {
  className?: string;
  data: TOrderStatusData[];
};
function OrderStatusList({ className, data }: TOrderListProps): JSX.Element {
  return (
    <ul className={['order-status-list', className].filter(Boolean).join(' ')}>
      {data.map((item) => (
        <li key={item.code}>
          <OrderStatus
            {...item} // mode="mobile"
          />
        </li>
      ))}
    </ul>
  );
}

export default OrderStatusList;
