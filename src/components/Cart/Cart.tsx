import { useId } from 'react';
import './Cart.scss';
import CartListContainer from '../../features/cart/CartListContainer';
import MakeOrder from '../MakeOrder';
import { ArrowRightClassic } from '../ui/Icons';
import InputStyled from '../ui/InputStyled';
import ShoppingCart from '../ShoppingCart';
import { TCartProps } from './Cart.types';

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
        <ShoppingCart
          countItems={2}
          dataSteps={CART_STEPS}
          totalPrice={118790}
          points={118790}
        />
      </div>
    </div>
  );
}

export default Cart;
