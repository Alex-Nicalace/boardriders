import ShoppngListContainer from '../../features/cart/ShoppngListContainer';
import OrderStatusListContainer from '../../features/makeOrder/OrderStatusListContainer';
import FavouriteListContainer from '../../features/wishList/FavouriteListContainer';
import AddressList from '../AddressList';
import PersonalInfo from '../PersonalInfo';
import StatCard from '../StatCard';
import './AccountMainData.scss';

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

type TAccountMainDataProps = { setActiveTab: (tab: number) => void };
function AccountMainData({ setActiveTab }: TAccountMainDataProps): JSX.Element {
  const statCardList = [
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
      element: <OrderStatusListContainer />,
      onClickTarget: () => setActiveTab(1),
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
      onClickTarget: () => setActiveTab(2),
    },
    {
      title: 'Адреса',
      labelTarget: 'Редактировать',
      element: <AddressList data={ADDRESS_LIST} />,
      onClickTarget: () => setActiveTab(3),
    },
  ];

  return (
    <div className="account-main-data">
      {statCardList.map(
        ({ title, hint, labelTarget, element, toTarget, onClickTarget }) => (
          <StatCard
            key={title}
            className="account-main-data__stat-card"
            title={title}
            hint={hint}
            labelTarget={labelTarget}
            toTarget={toTarget}
            onClickTarget={onClickTarget}
          >
            {element}
          </StatCard>
        )
      )}
    </div>
  );
}

export default AccountMainData;
