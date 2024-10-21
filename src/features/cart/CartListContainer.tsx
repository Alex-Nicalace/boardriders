import CartList from '../../components/CartList';
import { useCart } from './useCart';
import { useCartRemove } from './useCartRemove';
import { useUpsertCart } from './useUpsertCart';

type TCartListContainerProps = { className?: string };
function CartListContainer({ className }: TCartListContainerProps) {
  const { products, priceTotal, quantityTotal } = useCart(false);
  const { removeCart } = useCartRemove();
  const { upsertCart } = useUpsertCart();

  if (!products) return null;

  function handleChangeQuantity(id: number, quantity: number) {
    upsertCart({ productVariantId: id, quantity });
  }

  function handleRemove(id: number) {
    removeCart(id);
  }

  return (
    <CartList
      className={className}
      data={products}
      animateDuration={1000}
      quantityTotal={quantityTotal || 0}
      priceTotal={priceTotal || 0}
      onChangeQuantity={handleChangeQuantity}
      onRemove={handleRemove}
    />
  );
}

export default CartListContainer;
