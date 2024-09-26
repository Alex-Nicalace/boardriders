import { useId } from 'react';
import './CheckOutPage.scss';
import ShoppingCart from '../../components/ShoppingCart';
import PageContent from '../../components/PageContent';
import InputStyled from '../../components/ui/InputStyled';
import { ArrowRightClassic } from '../../components/ui/Icons';
import MakeOrder from '../../components/MakeOrder';
import CartEmpty from '../../components/CartEmpty';
import OrderPlaced from '../../components/OrderPlaced';
import CartListContainer from '../../features/cart/CartListContainer';

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

// type TCheckOutPageProps = { }
function CheckOutPage(/*{ }: TCheckOutPageProps*/): JSX.Element {
  const id = useId();
  let tempState = 1;

  return (
    <PageContent className="check-out-page" as="main" paddingTop="50-15">
      <div className="check-out-page__container">
        {tempState === 0 && <CartEmpty className="check-out-page__empty" />}
        {tempState === 1 && (
          <>
            <div className="check-out-page__cart">
              <h2 className="check-out-page__title">Корзина</h2>
              <CartListContainer className="check-out-page__cart-list" />
              <div className="check-out-page__wrap-bonus-promo">
                <InputStyled
                  className="check-out-page__input-bonus"
                  id={`bonus-${id}`}
                  label={<InputStyled.LabelBonus />}
                  placeholder="Введите номер карты"
                  hint="Номер на обратной стороне карты"
                />
                <InputStyled
                  className="check-out-page__input-promo"
                  id={`promo-${id}`}
                  label={<InputStyled.LabelDiscount />}
                  placeholder="Введите промо код"
                  buttonContent={<ArrowRightClassic />}
                />
              </div>
              <h2 className="check-out-page__title">Оформление заказа</h2>
              <MakeOrder />
            </div>
            <div className="check-out-page__shopping-cart">
              <ShoppingCart
                countItems={2}
                dataSteps={CART_STEPS}
                totalPrice={118790}
                points={118790}
              />
            </div>
          </>
        )}
        {tempState === 2 && (
          <OrderPlaced
            className="check-out-page__order"
            numOrder={23416}
            email="infoinfo@gmail.com"
            phone="+7 654 222 55 42"
            comment="Товар можно забрать в течение 1 дня с момента получения СМС."
          />
        )}
      </div>
    </PageContent>
  );
}

export default CheckOutPage;
