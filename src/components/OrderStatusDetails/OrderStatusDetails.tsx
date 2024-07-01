import { useScreenWidth } from '../../Context/useScreenWidthContext';
import CartList from '../CartList';
import OrderStateHint from '../OrderStateHint';
import ShippingDetails from '../ShippingDetails';
import './OrderStatusDetails.scss';

const SHIPPING_DETAILS_DATA = [
  { key: 'Номер заказа', value: '195455-222546-ANU' },
  {
    key: 'Статус',
    value: <OrderStateHint state={3} iconWidth={14} iconHeight={20} />,
  },
  { key: 'Способ доставки', value: 'Курьером' },
  { key: 'Дата оформления заказа', value: '12 марта , 21:25' },
  { key: 'Телефон', value: '+7 095 655 88 44' },
  {
    key: 'Адрес доставки',
    value: 'Иванов Иван Иванович Покровский проезд, 5, Москва, 054555',
  },
];

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

type TOrderStatusDetailsProps = {
  className?: string;
};
function OrderStatusDetails({
  className,
}: TOrderStatusDetailsProps): JSX.Element {
  const { isLessMobileSmall } = useScreenWidth();

  return (
    <div
      className={['order-status-details', className].filter(Boolean).join(' ')}
    >
      <ShippingDetails
        className="order-status-details__shipping-details"
        data={SHIPPING_DETAILS_DATA}
        mode={isLessMobileSmall ? 'compact' : 'normal'}
      />
      <CartList
        className="order-status-details__orders"
        cartData={CART_DATA}
        isOrdered
      />
    </div>
  );
}

export default OrderStatusDetails;
