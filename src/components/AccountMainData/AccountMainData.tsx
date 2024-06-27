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

const PATH = '/src/assets/img/products-new/';
const PRODUCTS_DATA: TupleIWareData3 = [
  {
    wareId: '1',
    imgMain: PATH + '01.png',
    imgSecond: PATH + '01-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '2',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '3',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
];

// type TAccountMainDataProps = { }
function AccountMainData(/*{ }: TAccountMainDataProps*/): JSX.Element {
  return (
    <div className="account-main-data">
      <StatCard
        className="account-main-data__stat-card"
        title="корзина"
        hint="10 товаров"
        labelTarget="перейти в корзину"
      >
        <ShoppngList data={SHOPPING_LIST} limitListCount={5} />
      </StatCard>
      <StatCard
        className="account-main-data__stat-card"
        title="заказы"
        labelTarget="все заказы"
      >
        <OrderStatusList data={ORDER_STATUS} />
      </StatCard>
      <StatCard
        className="account-main-data__stat-card"
        title="Избранное"
        labelTarget="перейти в избранное"
      >
        <FavouriteList data={PRODUCTS_DATA} />
      </StatCard>
      <StatCard
        className="account-main-data__stat-card"
        title="Личная информация"
        labelTarget="Редактировать"
      >
        <PersonalInfo
          fullName="Иванов Иван Иванович"
          sex={1}
          password="12345678"
          dateBirth={new Date('1988-10-15')}
          phone="+7 (950) 145 22 55"
          email="ivanov@gmail.com"
        />
      </StatCard>
      <StatCard
        className="account-main-data__stat-card"
        title="Адреса"
        labelTarget="Редактировать"
      >
        <AddressList data={ADDRESS_LIST} />
      </StatCard>
    </div>
  );
}

export default AccountMainData;
