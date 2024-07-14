import Popup from '../../component-library/Popup';
import FormAddress from '../FormAddress';
import ModalWrap from '../ModalWrap';
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
              <Popup>
                <Popup.Open
                  windowName="address-edit"
                  render={({ open }) => (
                    <button
                      className="account-address-data__btn-edit"
                      onClick={open}
                    >
                      Изменить
                    </button>
                  )}
                />
                {/* // TODO: добавить модальное окно */}
                <button className="account-address-data__btn-edit">
                  Удалить
                </button>
                {/* // TODO: надо подумать что передавать в редактируемое окно */}
                <Popup.Window
                  windowName="address-edit"
                  render={(close) => (
                    <ModalWrap close={close} withDecorFrame>
                      <FormAddress addressToEdit={address} />
                    </ModalWrap>
                  )}
                  transitionEffect={['fade']}
                  mode="modal"
                  onClickOutside={(close) => close()}
                />
              </Popup>
            </div>
          </li>
        ))}
      </ul>
      <div className="account-address-data__btn">
        <Popup.Open
          windowName="address-add"
          render={({ open }) => (
            <button className="account-address-data__btn-add" onClick={open}>
              <span className="account-address-data__add-icon"></span>
              Добавить адрес
            </button>
          )}
        />
      </div>
      <dialog>render</dialog>
      <Popup.Window
        windowName="address-add"
        render={(close) => (
          <ModalWrap close={close} withDecorFrame>
            <FormAddress />
          </ModalWrap>
        )}
        transitionEffect={['fade']}
        mode="modal"
        onClickOutside={(close) => close()}
      />
    </div>
  );
}

export default AccountAddressData;
