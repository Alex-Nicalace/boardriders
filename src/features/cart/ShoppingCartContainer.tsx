import ShoppingCart from '../../components/ShoppingCart';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getMakeOrderSteps } from '../makeOrder/makeOrderSlice';
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

  return (
    <ShoppingCart
      className={className}
      countItems={quantityTotal}
      dataSteps={orderSteps}
      totalPrice={priceTotal}
      points={calculatePoints(priceTotal)}
    />
  );
}

export default ShoppingCartContainer;
