import './DeliveryOption.scss';
import { ExclamationInCircleIcon } from '../ui/Icons';
import RadioBox from '../ui/RadioBox';
import SelectLabel from '../ui/SelectLabel';
import Notification from '../Notification';
import DeliveryСourier from '../DeliveryСourier';

const CITYS = ['Москва', 'Санкт-Петербург', 'Пенза'];
const DELIVERY = [
  {
    title: 'Забрать в магазине сегодня',
    price: 'Бесплатно',
    hint: 'Зарезервируем товар, который сейчас на полках. Заказ храним 1 день',
  },
  {
    title: 'Доставить в магазин',
    hint: 'Привезем товар в удобный вам магазин через несколько дней. Заказ храним 5 дней',
    disabled: true,
  },
  {
    title: 'Курьером сегодня и позже',
    price: 'от 0 ₽',
    hint: 'Доставим по указанному адресу',
  },
  {
    title: 'Пункт выдачи',
    hint: 'Забрать товар в одном из пунктов выдачи',
  },
];
// type TDeliveryOptionProps = { }
function DeliveryOption(/*{ }: TDeliveryOptionProps*/): JSX.Element {
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
        {DELIVERY.map(({ title, price, hint, disabled }) => (
          <li key={title} className="delivery-option__item">
            <RadioBox
              className="delivery-option__radio"
              name="delivery"
              view="grid"
              disabled={disabled}
            >
              <RadioBox.Title>{title}</RadioBox.Title>
              {price && <RadioBox.Price>{price}</RadioBox.Price>}
              <RadioBox.Hint>{hint}</RadioBox.Hint>
            </RadioBox>
          </li>
        ))}
      </ul>
      {/* <Notification text="Способ доставки «Забрать из магазина» недоступен - сумма заказа меньше 300 ₽" /> */}
      <DeliveryСourier />
    </div>
  );
}

export default DeliveryOption;
