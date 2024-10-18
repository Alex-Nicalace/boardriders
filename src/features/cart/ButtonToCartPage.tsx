import IconButton from '../../components/ui/IconButton';
import { CartIcon } from '../../components/ui/Icons';
import { useTotalItemsCart } from './useTotalItemsCart';

type TButtonToCartPageProps = {
  className?: string;
};
function ButtonToCartPage({ className }: TButtonToCartPageProps) {
  const { totalItemsCart } = useTotalItemsCart();

  return (
    <IconButton
      className={className}
      IconComponent={CartIcon}
      to="/cart"
      badgeCounter={totalItemsCart || undefined}
    >
      Корзина
    </IconButton>
  );
}

export default ButtonToCartPage;
