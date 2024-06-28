import { useMemo, useRef } from 'react';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import OrderStatus, { TOrderStatusData } from '../OrderStatus';
import './OrderStatusList.scss';

type TOrderListProps = {
  className?: string;
  data: TOrderStatusData[];
};
function OrderStatusList({ className, data }: TOrderListProps): JSX.Element {
  const ulRef = useRef<HTMLUListElement>(null);
  const refsMemo = useMemo(() => [ulRef], [ulRef]);
  const [ulSize] = useResizeObserver(refsMemo);
  const { width } = ulSize || {};

  return (
    <ul
      ref={ulRef}
      className={['order-status-list', className].filter(Boolean).join(' ')}
    >
      {data.map((item) => (
        <li key={item.code}>
          <OrderStatus
            {...item}
            mode={width && width < 500 ? 'compact' : undefined}
          />
        </li>
      ))}
    </ul>
  );
}

export default OrderStatusList;
