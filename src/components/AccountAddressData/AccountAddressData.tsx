import Title from '../ui/Title';
import './AccountAddressData.scss';

const ADDRESS_DATA = [
  'Россия, Московская область, 08131, г. Москва, ул. Академика Королева, д. 12',
  'Россия, Московская область, 08131, г. Москва, ул. Клары Цеткин, д. 8',
];

type TAccountAddressDataProps = {
  className?: string;
};
function AccountAddressData({
  className,
}: TAccountAddressDataProps): JSX.Element {
  return (
    <div
      className={['account-address-data', className].filter(Boolean).join(' ')}
    >
      <ul className="account-address-data__list">
        {ADDRESS_DATA.map((address, index) => (
          <li className="account-address-data__item" key={address}>
            <Title
              className="account-address-data__title"
              as="h2"
              kind="h2-21-14"
            >
              {`Адрес ${index + 1}`}
            </Title>
            <p className="account-address-data__text">{address}</p>
            <div className="account-address-data__btns">
              <button className="account-address-data__btn-edit">
                Изменить
              </button>
              <button className="account-address-data__btn-edit">
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="account-address-data__btn">
        <button className="account-address-data__btn-add">
          <span className="account-address-data__add-icon"></span>
          Добавить адрес
        </button>
      </div>
    </div>
  );
}

export default AccountAddressData;
