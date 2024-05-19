import { ExclamationInCircleIcon } from '../ui/Icons';
import RadioBox from '../ui/RadioBox';
import SelectLabel from '../ui/SelectLabel';
import './DeliveryOption.scss';

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
        {DELIVERY.map((item) => (
          <li key={item.title} className="delivery-option__item">
            <RadioBox
              className="delivery-option__radio"
              name="delivery"
              title={item.title}
              price={item.price}
              hint={item.hint}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeliveryOption;
