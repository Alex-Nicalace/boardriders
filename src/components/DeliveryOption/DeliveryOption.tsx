import { useState } from 'react';
import './DeliveryOption.scss';
import { ExclamationInCircleIcon } from '../ui/Icons';
import RadioBox from '../ui/RadioBox';
import SelectLabel from '../ui/SelectLabel';
import DeliveryCourier from '../DeliveryCourier';
import Notification from '../Notification';

const NotAvailable = ({ message }: { message: string }) => (
  <Notification
    className="delivery-option__notification"
    text={`Способ доставки «${message}» недоступен 🙄`}
  />
);
const WAY_DELIVERY = [
  {
    title: 'Забрать в магазине сегодня',
    price: 'Бесплатно',
    hint: 'Зарезервируем товар, который сейчас на полках. Заказ храним 1 день',
    content: <NotAvailable message="Забрать в магазине сегодня" />,
  },
  {
    title: 'Доставить в магазин',
    hint: 'Привезем товар в удобный вам магазин через несколько дней. Заказ храним 5 дней',
    disabled: true,
    content: <NotAvailable message="Доставить в магазин" />,
  },
  {
    title: 'Курьером сегодня и позже',
    price: 'от 0 ₽',
    hint: 'Доставим по указанному адресу',
    content: <DeliveryCourier />,
  },
  {
    title: 'Пункт выдачи',
    hint: 'Забрать товар в одном из пунктов выдачи',
    content: <NotAvailable message="Пункт выдачи" />,
  },
];
type TDeliveryOptionProps = {
  deliveryRegionList: { id: number; name: string }[];
};
function DeliveryOption({
  deliveryRegionList,
}: TDeliveryOptionProps): JSX.Element {
  const [selected, setSelected] = useState(-1);
  return (
    <div className="delivery-option">
      <div className="delivery-option__box-region">
        <SelectLabel className="delivery-option__region" label="Ваш город">
          {deliveryRegionList.map(({ id, name }) => (
            <SelectLabel.Option key={id} value={`${id}`}>
              {name}
            </SelectLabel.Option>
          ))}
        </SelectLabel>

        <div className="delivery-option__exclamation">
          <span>
            <ExclamationInCircleIcon />
          </span>
          <p>
            Убедитесь, что правильно указали населенный пункт - от этого зависят
            доступные виды доставки и стоимость
          </p>
        </div>
      </div>

      <div className="delivery-option__title">Способ доставки:</div>

      <ul className="delivery-option__list">
        {WAY_DELIVERY.map(({ title, price, hint, disabled }, index) => (
          <li key={title} className="delivery-option__item">
            <RadioBox
              className="delivery-option__radio"
              name="delivery"
              view="grid"
              disabled={disabled}
              onChange={() => setSelected(index)}
            >
              <RadioBox.Title>{title}</RadioBox.Title>
              {price && <RadioBox.Price>{price}</RadioBox.Price>}
              <RadioBox.Hint>{hint}</RadioBox.Hint>
            </RadioBox>
          </li>
        ))}
      </ul>

      {selected !== -1 && WAY_DELIVERY[selected].content}
    </div>
  );
}

export default DeliveryOption;
