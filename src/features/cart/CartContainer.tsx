import Cart from '../../components/Cart';
import CartEmpty from '../../components/CartEmpty';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { useCart } from './useCart';

type TCartContainerProps = { className?: string };
function CartContainer({ className }: TCartContainerProps): JSX.Element {
  const { products, isLoading, error } = useCart();

  if (isLoading) return <Spinner className={className} />;

  if (error)
    return <ErrorMessage className={className} message={error.message} />;

  if (!products?.length) return <CartEmpty className={className} />;

  return <Cart />;
}

export default CartContainer;
