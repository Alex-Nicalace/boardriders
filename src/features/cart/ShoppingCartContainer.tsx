import toast from 'react-hot-toast';
import ShoppingCart from '../../components/ShoppingCart';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useUser } from '../authentication/useUser';
import {
  getMakeOrderSteps,
  getOrderDataOnStep,
} from '../makeOrder/makeOrderSlice';
import { useCreateOrder } from '../makeOrder/useCreateOrder';
import { useCart } from './useCart';

// Логика начисления баллов
const calculatePoints = (totalPrice: number): number => {
  const points = Math.floor(totalPrice / 100); // 1 балл за каждые 100 рублей
  return points;
};

type TShoppingCartContainerProps = { className?: string };
function ShoppingCartContainer({
  className,
}: TShoppingCartContainerProps): JSX.Element {
  const { priceTotal, quantityTotal } = useCart(false);
  const orderSteps = useAppSelector(getMakeOrderSteps);
  const deliveryData = useAppSelector(getOrderDataOnStep(0));
  const paymentData = useAppSelector(getOrderDataOnStep(1));
  const contactsData = useAppSelector(getOrderDataOnStep(2));
  const { user } = useUser();
  const { isCreating, createOrder } = useCreateOrder();
  const isCanPay = orderSteps.every(({ isDone }) => isDone);
  const { id: userId } = user || {};

  function handleCreateOrder() {
    if (!userId) return;

    const deliveryMethod = deliveryData.deliveryMethod;
    if (!deliveryMethod || !paymentData.paymentMethod) {
      toast.error('Не удалось создать заказ, т.к. нет необходимых данных!');
      return;
    }

    createOrder({
      user_id: userId,
      deliveryMethod,
      deliveryData: JSON.stringify(deliveryData[deliveryMethod]),
      payMethod: paymentData.paymentMethod,
      contactName: contactsData.name,
      contactPhone: contactsData.phone,
      contactEmail: contactsData.email,
      comment: contactsData.comment,
    });
  }

  return (
    <ShoppingCart
      className={className}
      countItems={quantityTotal || 0}
      dataSteps={orderSteps}
      totalPrice={priceTotal || 0}
      points={calculatePoints(priceTotal || 0)}
      disabled={!isCanPay || isCreating}
      onCreateOrder={handleCreateOrder}
    />
  );
}

export default ShoppingCartContainer;
