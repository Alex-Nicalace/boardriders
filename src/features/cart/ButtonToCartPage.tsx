import IconButton from '../../components/ui/IconButton';
import { CartIcon } from '../../components/ui/Icons';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getTotalQuantity } from './cartSlice';

type TButtonToCartPageProps = {
  className?: string;
};
function ButtonToCartPage({ className }: TButtonToCartPageProps) {
  const totalQuantity = useAppSelector(getTotalQuantity);

  return (
    <IconButton
      className={className}
      IconComponent={CartIcon}
      to="/cart"
      badgeCounter={totalQuantity || undefined}
    >
      Корзина
    </IconButton>
  );
}

export default ButtonToCartPage;
