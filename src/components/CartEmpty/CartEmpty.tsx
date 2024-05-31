import Button from '../ui/Button';
import './CartEmpty.scss';
import imgOops from '../../assets/img/cart-empty/oops.png';

type TCartEmptyProps = {
  className?: string;
};
function CartEmpty({ className }: TCartEmptyProps): JSX.Element {
  return (
    <div className={['cart-empty', className].filter(Boolean).join(' ')}>
      <img className="cart-empty__img" src={imgOops} alt="Пустая корзина" />
      <p className="cart-empty__text">Ваша корзина пока пуста</p>
      <Button className="cart-empty__btn" color="secondary">
        Перейти к покупкам
      </Button>
    </div>
  );
}

export default CartEmpty;
