import ShoppingCart from '../../components/ShoppingCart';
import { useCart } from './useCart';

const CART_STEPS = [
  {
    stepNum: 1,
    name: 'Доставка',
    value: 'Бесплатно',
    // isDone: true,
  },
  {
    stepNum: 2,
    name: 'Оплата',
    disabled: true,
    // isDone: true,
  },
  {
    stepNum: 3,
    name: 'Контакты',
    disabled: true,
    // isDone: true,
  },
];

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
  return (
    <ShoppingCart
      className={className}
      countItems={quantityTotal}
      dataSteps={CART_STEPS}
      totalPrice={priceTotal}
      points={calculatePoints(priceTotal)}
    />
  );
}

export default ShoppingCartContainer;
