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
// type TAccountMainDataProps = { }
function AccountMainData(/*{ }: TAccountMainDataProps*/): JSX.Element {
  return (
    <div className="account-main-data">
      <div className="account-main-data__container">
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
      </div>
    </div>
  );
}

export default AccountMainData;
