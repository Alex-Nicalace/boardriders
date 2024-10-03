import { useId } from 'react';
import './Cart.scss';
import CartListContainer from '../../features/cart/CartListContainer';
import MakeOrder from '../MakeOrder';
import { ArrowRightClassic } from '../ui/Icons';
import InputStyled from '../ui/InputStyled';
import { TCartProps } from './Cart.types';
import ShoppingCartContainer from '../../features/cart/ShoppingCartContainer';

function Cart({ className }: TCartProps): JSX.Element {
  const id = useId();

  return (
    <div className={['cart', className].filter(Boolean).join(' ')}>
      <div className="cart__goods">
        <h2 className="cart__title">Корзина</h2>
        <CartListContainer className="cart__cart-list" />
        <div className="cart__wrap-bonus-promo">
          <InputStyled
            className="cart__input-bonus"
            id={`bonus-${id}`}
            label={<InputStyled.LabelBonus />}
            placeholder="Введите номер карты"
            hint="Номер на обратной стороне карты"
          />
          <InputStyled
            className="cart__input-promo"
            id={`promo-${id}`}
            label={<InputStyled.LabelDiscount />}
            placeholder="Введите промо код"
            buttonContent={<ArrowRightClassic />}
          />
        </div>
        <h2 className="cart__title">Оформление заказа</h2>
        <MakeOrder />
      </div>
      <div className="cart__steps">
        <ShoppingCartContainer />
      </div>
    </div>
  );
}

export default Cart;
