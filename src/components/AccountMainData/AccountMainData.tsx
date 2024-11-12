import AccounPersanalDataProvider from '../../features/authentication/AccounPersanalDataProvider';
import ShoppngListContainer from '../../features/cart/ShoppngListContainer';
import OrderStatusListContainer from '../../features/makeOrder/OrderStatusListContainer';
import AccountAddressDataProvider from '../../features/userAddresses/AccountAddressDataProvider';
import FavouriteListContainer from '../../features/wishList/FavouriteListContainer';
import { formaterDateShort } from '../../utils/formaters';
import { formaterAddress } from '../AccountAddressData';
import AddressList from '../AddressList';
import PersonalInfo, { KEYS_FOR_PERSONAL_INFO } from '../PersonalInfo';
import StatCard from '../StatCard';
import './AccountMainData.scss';

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
        <AccounPersanalDataProvider
          render={({ data: personalData }) => {
            const data = KEYS_FOR_PERSONAL_INFO.map((item) =>
              personalData[item] instanceof Date
                ? formaterDateShort(personalData[item])
                : personalData[item]
            ).filter((item): item is string => Boolean(item));
            data.push(`Пароль: ${'*'.repeat(15)}`);
            return (
              <PersonalInfo
                className="account-main-data__personal-info"
                data={data}
              />
            );
          }}
        />
      ),
      onClickTarget: () => setActiveTab(2),
    },
    {
      title: 'Адреса',
      labelTarget: 'Редактировать',
      element: (
        <AccountAddressDataProvider
          render={(data) => {
            const formatedData = data.map((item) => formaterAddress(item));
            return <AddressList data={formatedData} />;
          }}
        />
      ),
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
