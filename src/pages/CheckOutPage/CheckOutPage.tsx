import './CheckOutPage.scss';
import CartList from '../../components/CartList';
import ShoppingCart from '../../components/ShoppingCart';
import PageContent from '../../components/PageContent';

const CART_DATA = [
  {
    title: 'Сноуборд GNU Asym Carbon Credit Btx Multicolor',
    img: '/src/assets/img/ware-card-cart/01.png',
    article: '19SN003',
    props: [
      {
        name: 'Цвет',
        value: 'Цветной',
      },
      {
        name: 'Размер',
        value: 'XL',
      },
    ],
    price: 1290,
  },
  {
    title: 'Сноуборд GNU Asym Carbon Credit Btx Multicolor',
    img: '/src/assets/img/ware-card-cart/01.png',
    article: '19SN003_2',
    props: [
      {
        name: 'Цвет',
        value: 'Цветной',
      },
      {
        name: 'Размер',
        value: 'XL',
      },
    ],
    price: 1290,
  },
];

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
  return (
    <PageContent className="check-out-page" as="main">
      <div className="check-out-page__container">
        <div className="check-out-page__cart">
          <h2 className="check-out-page__title">Корзина</h2>
          <CartList cartData={CART_DATA} />
        </div>
        <div className="check-out-page__shopping-cart">
          <ShoppingCart
            countItems={2}
            dataSteps={CART_STEPS}
            totalPrice={118790}
            points={118790}
          />
        </div>
      </div>
    </PageContent>
  );
}

export default CheckOutPage;
