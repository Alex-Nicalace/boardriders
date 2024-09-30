import CartList from '../../components/CartList';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { editCart } from './cartSlice';
import { useCart } from './useCart';
import { useCartRemove } from './useCartRemove';

type TCartListContainerProps = { className?: string };
function CartListContainer({ className }: TCartListContainerProps) {
  const { products } = useCart(false);
  const dispatch = useAppDispatch();
  const { removeCart } = useCartRemove();

  if (!products) return null;

  function handleChangeQuantity(id: number, quantity: number) {
    dispatch(editCart({ productVariantId: id, count: quantity }));
  }

  function handleRemove(id: number) {
    removeCart(id);
  }

  return (
    <CartList
      className={className}
      data={products}
      animateDuration={1000}
      onChangeQuantity={handleChangeQuantity}
      onRemove={handleRemove}
    />
  );
}

export default CartListContainer;
