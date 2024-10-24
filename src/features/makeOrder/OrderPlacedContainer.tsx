import { useLocation, useParams } from 'react-router-dom';
import OrderPlaced from '../../components/OrderPlaced';
import { useOrder } from './useOrder';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import Empty from '../../components/Empty';
import { useUser } from '../authentication/useUser';

type TOrderPlacedContainerProps = { className?: string };
function OrderPlacedContainer({ className }: TOrderPlacedContainerProps) {
  const { isAuthenticated } = useUser();
  const { state } = useLocation();
  const { orderId } = useParams();
  const numericOrderId = !Number.isNaN(orderId) ? Number(orderId) : undefined;
  const { order, isLoading, error } = useOrder(numericOrderId);

  if (!isAuthenticated)
    return (
      <OrderPlaced
        className={className}
        numOrder="00"
        email={state?.contactEmail}
        phone={state?.contactPhone}
        info="Данные введенные при оформлении заказа просто обнуляюся. Сделал возможность нажать кнопку оформить для не зарегистрированного пользователя для совместимости."
      />
    );

  if (!numericOrderId)
    return <ErrorMessage message="Неверный идентификатор заказа!" />;

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message={error.message} />;

  if (!order) return <Empty description="Заказ не найден" />;

  return (
    <OrderPlaced
      className={className}
      numOrder={order.id.toString()}
      email={order.contactEmail}
      phone={order.contactPhone}
      info="Никакой оповещния не будет, т.к. это учебный проект!"
    />
  );
}

export default OrderPlacedContainer;
