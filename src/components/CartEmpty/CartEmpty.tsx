import Button from '../ui/Button';
import './CartEmpty.scss';
import Empty from '../Empty';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getGender } from '../../features/gender/genderSlice';

type TCartEmptyProps = {
  className?: string;
};
function CartEmpty({ className }: TCartEmptyProps): JSX.Element {
  const gender = useAppSelector(getGender);
  return (
    <div className={['cart-empty', className].filter(Boolean).join(' ')}>
      <Empty description="Ваша корзина пока пуста" />
      <Button
        className="cart-empty__btn"
        color="secondary"
        to={`/${gender}/catalog`}
      >
        Перейти к покупкам
      </Button>
    </div>
  );
}

export default CartEmpty;
