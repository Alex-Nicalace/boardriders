import CartList from '../../components/CartList';
import Empty from '../../components/Empty';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { removeCartWithToast, setCart } from './cartSlice';
import { useCart } from './useCart';

type TCartListContainerProps = { className?: string };
function CartListContainer({
  className,
}: TCartListContainerProps): JSX.Element {
  const { products, isLoading, error } = useCart();
  const dispatch = useAppDispatch();

  if (isLoading) return <Spinner className={className} />;

  if (error) {
    return <ErrorMessage className={className} message={error.message} />;
  }

  if (!products || !products.length)
    return (
      <Empty className={className} description="Ваша корзина пока пуста" />
    );

  function handleChangeQuantity(id: number, quantity: number) {
    dispatch(setCart([{ productVariantId: id, count: quantity }]));
  }

  function handleRemove(id: number) {
    dispatch(removeCartWithToast(id));
  }

  return (
    <CartList
      className={className}
      data={products}
      onChangeQuantity={handleChangeQuantity}
      onRemove={handleRemove}
    />
  );
}

export default CartListContainer;
