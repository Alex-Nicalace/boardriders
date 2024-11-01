import Empty from '../../components/Empty';
import ErrorMessage from '../../components/ErrorMessage';
import OrderStatusList from '../../components/OrderStatusList';
import Spinner from '../../components/Spinner';
import { useOrdersTopFive } from './useOrdersTopFive';

// type TOrderStatusListContainerProps = { }
function OrderStatusListContainer(/*{ }: TOrderStatusListContainerProps*/): JSX.Element {
  const { ordersTopFive, isLoading, error } = useOrdersTopFive();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!ordersTopFive) return <Empty description="Заказов нет" />;

  return <OrderStatusList data={ordersTopFive} />;
}

export default OrderStatusListContainer;
