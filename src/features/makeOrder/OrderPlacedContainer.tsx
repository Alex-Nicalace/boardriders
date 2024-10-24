import { useParams } from 'react-router-dom';
import OrderPlaced from '../../components/OrderPlaced';
import { useOrder } from './useOrder';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import Empty from '../../components/Empty';

type TOrderPlacedContainerProps = { className?: string };
function OrderPlacedContainer({ className }: TOrderPlacedContainerProps) {
  const { orderId } = useParams();
  const numericOrderId = !Number.isNaN(orderId) ? Number(orderId) : undefined;
  const { order, isLoading, error } = useOrder(numericOrderId);

  if (!numericOrderId)
    return <ErrorMessage message="Неверный идентификатор заказа!" />;

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message={error.message} />;

  if (!order) return <Empty description="Заказ не найден" />;

  return (
    <OrderPlaced
      className={className}
      numOrder={order.id}
      email={order.contactEmail}
      phone={order.contactPhone}
    />
  );
}

export default OrderPlacedContainer;
