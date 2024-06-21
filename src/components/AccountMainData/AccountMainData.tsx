import ShoppngList from '../ShoppngList';
import StatCard from '../StatCard';
import './AccountMainData.scss';

const SHOPPING_LIST = [
  { name: 'Сноуборд GNU Asym Carbon Credit Btx Multicolor' },
  { name: 'Утепленные кроссовки DC SHOES E.Tribeka WNT' },
  { name: 'Шлем DC SHOES E.Tribeka WNT' },
  { name: 'Ботинки сноубордические DC Shoes' },
  { name: 'Утепленные кроссовки DC SHOES E.Tribeka' },
];
// type TAccountMainDataProps = { }
function AccountMainData(/*{ }: TAccountMainDataProps*/): JSX.Element {
  return (
    <div className="account-main-data">
      <div className="account-main-data__container">
        <StatCard
          title="корзина"
          hint="10 товаров"
          labelTarget="перейти в корзину"
        >
          <ShoppngList data={SHOPPING_LIST} />
        </StatCard>
      </div>
    </div>
  );
}

export default AccountMainData;
