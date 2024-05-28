import { useState } from 'react';
import './DeliveryOption.scss';
import { ExclamationInCircleIcon } from '../ui/Icons';
import RadioBox from '../ui/RadioBox';
import SelectLabel from '../ui/SelectLabel';
import DeliveryCourier from '../DeliveryCourier';
import Notification from '../Notification';

const CITYS = ['Москва', 'Санкт-Петербург', 'Пенза'];
const DELIVERY = [
  {
    id: 1,
    title: 'Забрать в магазине сегодня',
    price: 'Бесплатно',
    hint: 'Зарезервируем товар, который сейчас на полках. Заказ храним 1 день',
  },
  {
    id: 2,
    title: 'Доставить в магазин',
    hint: 'Привезем товар в удобный вам магазин через несколько дней. Заказ храним 5 дней',
    disabled: true,
  },
  {
    id: 3,
    title: 'Курьером сегодня и позже',
    price: 'от 0 ₽',
    hint: 'Доставим по указанному адресу',
  },
  {
    id: 4,
    title: 'Пункт выдачи',
    hint: 'Забрать товар в одном из пунктов выдачи',
  },
];
// type TDeliveryOptionProps = { }
function DeliveryOption(/*{ }: TDeliveryOptionProps*/): JSX.Element {
  const [deliveryId, setDeliveryId] = useState<number | null>(null);
  return (
    <div className="delivery-option">
      <div className="delivery-option__box-region">
        <SelectLabel className="delivery-option__region" label="Ваш город">
          {CITYS.map((city) => (
            <SelectLabel.Option key={city} value={city}>
              {city}
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
        {DELIVERY.map(({ title, price, hint, disabled, id }) => (
          <li key={title} className="delivery-option__item">
            <RadioBox
              className="delivery-option__radio"
              name="delivery"
              view="grid"
              disabled={disabled}
              onChange={() => setDeliveryId(id)}
            >
              <RadioBox.Title>{title}</RadioBox.Title>
              {price && <RadioBox.Price>{price}</RadioBox.Price>}
              <RadioBox.Hint>{hint}</RadioBox.Hint>
            </RadioBox>
          </li>
        ))}
      </ul>
      {deliveryId === 3 ? (
        <DeliveryCourier />
      ) : (
        deliveryId && (
          <Notification
            className="delivery-option__notification"
            text={`Способ доставки «${
              DELIVERY.find((item) => item.id === deliveryId)?.title
            }» недоступен - не реализован 🙄`}
          />
        )
      )}
    </div>
  );
}

export default DeliveryOption;
