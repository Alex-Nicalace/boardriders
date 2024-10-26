import ShoppngListContainer from '../../features/cart/ShoppngListContainer';
import AddressList from '../AddressList';
import FavouriteList, { TupleIWareData3 } from '../FavouriteList';
import OrderStatusList from '../OrderStatusList';
import PersonalInfo from '../PersonalInfo';

const ORDER_STATUS = [
  { code: '195455-222546-ANU', status: 2, price: 118570, isPaid: true },
  { code: '295455-222546-ANU', status: 2, price: 45258, isPaid: true },
  { code: '395455-222546-ANU', status: 0, price: 1544, isPaid: false },
  { code: '495455-222546-ANU', status: 1, price: 1545, isPaid: false },
  { code: '595455-222546-ANU', status: 2, price: 45285, isPaid: true },
];

const ADDRESS_LIST = [
  'Россия, Московская обл., Москва, ул. Лизы Чайкиной, 1, кв 11 69006',
  'Россия, Московская обл., Москва, ул. Академика Королева, 12, кв 52 56004',
  'Россия, Московская обл., Москва, пр. Ленина, 5, кв 36 235561',
];

const PERSONAL_INFO = {
  fullName: 'Иванов Иван Иванович',
  sex: 1,
  password: '12345678',
  dateBirth: new Date('1988-10-15'),
  phone: '+7 (950) 145 22 55',
  email: 'ivanov@gmail.com',
};

const PATH = '/src/assets/img/products-new/';
const PRODUCTS_DATA: TupleIWareData3 = [
  {
    id: 1,
    images: [PATH + '01.png', PATH + '01-hover.png'],
    name: 'LIB TECH',
    description: 'Мужской Сноуборд',
    price: 34392,
    oldPrice: null,
    discount: null,
  },
  {
    id: 2,
    images: [PATH + '02.png', PATH + '02-hover.png'],
    name: 'LIB TECH',
    description: 'Мужской Сноуборд',
    price: 34392,
    oldPrice: 17392,
    discount: 0.5,
  },
  {
    id: 3,
    images: [PATH + '03.png', PATH + '03-hover.png'],
    name: 'LIB TECH',
    description: 'Мужской Сноуборд',
    price: 34392,
    oldPrice: null,
    discount: null,
  },
];

export const STAT_CARD_LIST = [
  {
    title: 'корзина',
    hint: <ShoppngListContainer.Quantity />,
    labelTarget: 'перейти в корзину',
    toTarget: '/cart',
    element: <ShoppngListContainer />,
  },
  {
    title: 'заказы',
    labelTarget: 'все заказы',
    element: <OrderStatusList data={ORDER_STATUS} />,
  },
  {
    title: 'Избранное',
    labelTarget: 'перейти в избранное',
    toTarget: '/wishlist',
    element: <FavouriteList data={PRODUCTS_DATA} />,
  },
  {
    title: 'Личная информация',
    labelTarget: 'Редактировать',
    element: (
      <PersonalInfo
        className="account-main-data__personal-info"
        {...PERSONAL_INFO}
      />
    ),
  },
  {
    title: 'Адреса',
    labelTarget: 'Редактировать',
    element: <AddressList data={ADDRESS_LIST} />,
  },
];
