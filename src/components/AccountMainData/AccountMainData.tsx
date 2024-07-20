import AddressList from '../AddressList';
import FavouriteList, { TupleIWareData3 } from '../FavouriteList';
import OrderStatusList from '../OrderStatusList';
import PersonalInfo from '../PersonalInfo';
import ShoppngList from '../ShoppngList';
import StatCard from '../StatCard';
import './AccountMainData.scss';

const SHOPPING_LIST = [
  { name: 'Сноуборд GNU Asym Carbon Credit Btx Multicolor', price: 30 },
  { name: 'Утепленные кроссовки DC SHOES E.Tribeka WNT', price: 40 },
  { name: 'Шлем DC SHOES E.Tribeka WNT', price: 50 },
  { name: 'Ботинки сноубордические DC Shoes', price: 60 },
  { name: 'Утепленные кроссовки DC SHOES E.Tribeka', price: 70 },

  { name: 'Сноуборд GNU Asym Carbon Credit Btx Multicolor_', price: 30 },
  { name: 'Утепленные кроссовки DC SHOES E.Tribeka WNT_', price: 40 },
  { name: 'Шлем DC SHOES E.Tribeka WNT_', price: 50 },
  { name: 'Ботинки сноубордические DC Shoes_', price: 60 },
  { name: 'Утепленные кроссовки DC SHOES E.Tribeka_', price: 70 },
];

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
    imgMainUrl: PATH + '01.png',
    imgSecondUrl: PATH + '01-hover.png',
    name: 'LIB TECH',
    description: 'Мужской Сноуборд',
    price: 34392,
    oldPrice: null,
    discount: null,
  },
  {
    id: 2,
    imgMainUrl: PATH + '02.png',
    imgSecondUrl: PATH + '02-hover.png',
    name: 'LIB TECH',
    description: 'Мужской Сноуборд',
    price: 34392,
    oldPrice: 17392,
    discount: -50,
  },
  {
    id: 3,
    imgMainUrl: PATH + '03.png',
    imgSecondUrl: PATH + '03-hover.png',
    name: 'LIB TECH',
    description: 'Мужской Сноуборд',
    price: 34392,
    oldPrice: null,
    discount: null,
  },
];

const STAT_CARD_LIST = [
  {
    title: 'корзина',
    hint: '10 товаров',
    labelTarget: 'перейти в корзину',
    element: <ShoppngList data={SHOPPING_LIST} limitListCount={5} />,
  },
  {
    title: 'заказы',
    labelTarget: 'все заказы',
    element: <OrderStatusList data={ORDER_STATUS} />,
  },
  {
    title: 'Избранное',
    labelTarget: 'перейти в избранное',
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

// type TAccountMainDataProps = { }
function AccountMainData(/*{ }: TAccountMainDataProps*/): JSX.Element {
  return (
    <div className="account-main-data">
      {STAT_CARD_LIST.map(({ title, hint, labelTarget, element }) => (
        <StatCard
          key={title}
          className="account-main-data__stat-card"
          title={title}
          hint={hint}
          labelTarget={labelTarget}
        >
          {element}
        </StatCard>
      ))}
    </div>
  );
}

export default AccountMainData;
