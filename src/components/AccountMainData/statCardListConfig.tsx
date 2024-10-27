import ShoppngListContainer from '../../features/cart/ShoppngListContainer';
import FavouriteListContainer from '../../features/wishList/FavouriteListContainer';
import AddressList from '../AddressList';
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
    element: <FavouriteListContainer />,
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
