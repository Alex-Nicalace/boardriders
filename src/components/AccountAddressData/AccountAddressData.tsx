import Popup from '../../component-library/Popup';
import FormAddress, { TFormAddressInputs } from '../FormAddress';
import ModalWrap from '../ModalWrap';
import Title from '../ui/Title';
import './AccountAddressData.scss';
import {
  TAccountAddressDataProps,
  TAddress,
  TKeysAddress,
} from './AccountAddressData.types';

function formaterAddress(address: TAddress) {
  const addressKeys: TKeysAddress[] = [
    'country',
    'region',
    'index',
    'city',
    'street',
    'house',
    'apartment',
  ];
  return addressKeys
    .map((key) => address[key])
    .filter(Boolean)
    .join(', ');
}

function AccountAddressData({
  className,
  data,
  isPending,
  createAddress,
  updateAddress,
}: TAccountAddressDataProps): JSX.Element {
  const handleCreateAddress =
    (close: () => void) => (address: TFormAddressInputs) => {
      createAddress(address, {
        onSuccess: () => close(),
      });
    };

  const handleUpdateAddress =
    (close: () => void, id: number) => (row: TFormAddressInputs) => {
      updateAddress(
        { id, row },
        {
          onSuccess: () => close(),
        }
      );
    };

  return (
    <div
      className={['account-address-data', className].filter(Boolean).join(' ')}
    >
      <ul className="account-address-data__list">
        {data.map((address, index) => (
          <li className="account-address-data__item" key={address.id}>
            <Title
              className="account-address-data__title"
              as="h2"
              kind="h2-21-14"
            >
              {`Адрес ${index + 1}`}
            </Title>
            <p className="account-address-data__text">
              {formaterAddress(address)}
            </p>
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
                <Popup.Window
                  windowName="address-edit"
                  render={(close) => (
                    <ModalWrap close={close} withDecorFrame>
                      <FormAddress
                        addressToEdit={address}
                        disabled={isPending}
                        onSubmit={handleUpdateAddress(close, address.id)}
                      />
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
            <FormAddress
              disabled={isPending}
              onSubmit={handleCreateAddress(close)}
            />
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
