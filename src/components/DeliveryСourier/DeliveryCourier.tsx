import { useState } from 'react';
import './DeliveryCourier.scss';
import { useFormaters } from '../../Context/useFormaters';
import { generateDateArray } from '../../utils/generateDateArray';
import Button from '../ui/Button';
import InputStyled from '../ui/InputStyled';
import RadioBox from '../ui/RadioBox';
import SelectLabel from '../ui/SelectLabel';

// ! по макету выбор адреса это выпадающий список, но на данном этапе сделаю текстовый ввод

const DELIVERY_DATES = [
  {
    id: 1,
    title: 'Завтра недоступно по вашему адресу',
    price: 99,
    disabled: true,
  },
  {
    id: 2,
    title: 'Вт, 17 марта и позже',
    price: 19,
  },
];

const CURRENT_DATE = new Date();
const NEXT_WEEK = new Date(new Date().setDate(CURRENT_DATE.getDate() + 6));
const DATE_ARRAY = generateDateArray(CURRENT_DATE, NEXT_WEEK);

const TIMES = [
  {
    id: 1,
    title: 'с 08:00 до 12:00',
  },
  {
    id: 2,
    title: 'с 13:00 до 19:00',
  },
];

// type TDeliveryCourierProps = { }
function DeliveryCourier(/*{ }: TDeliveryCourierProps*/): JSX.Element {
  const { formaterCurrency, formaterDateWithWeekday } = useFormaters();
  const [isCheckDate, setIsCheckDate] = useState(false);
  const [address, setAddress] = useState('');
  const [building, setBuilding] = useState('');
  const fullAddress = 'ул. ' + address + ', ' + building;
  const price = 19;

  return (
    <div className="delivery-courier">
      <div className="delivery-courier__title-box delivery-courier__wrap-title">
        <h2 className="delivery-courier__title">Адрес доставки:</h2>
        {isCheckDate && (
          <button
            className="delivery-courier__btn-edit"
            onClick={() => setIsCheckDate(false)}
          >
            Изменить
          </button>
        )}
      </div>
      {!isCheckDate && (
        <div className="delivery-courier__box-address">
          <InputStyled
            className="delivery-courier__street"
            label="Улица"
            isGrayLabel
            placeholder="Адрес доставки"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <InputStyled
            className="delivery-courier__house"
            label="Дом, строение"
            isGrayLabel
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
          />
          <Button
            className="delivery-courier__button"
            onClick={() => setIsCheckDate(true)}
            fullWidth
          >
            Проверить даты доставки
          </Button>
        </div>
      )}
      {isCheckDate && (
        <div className="delivery-courier__box-check-date">
          <p className="delivery-courier__full-address">{fullAddress}</p>
          <div className="delivery-courier__box-apartment">
            <InputStyled
              className="delivery-courier__apartment"
              label="Квартира"
              isGrayLabel
            />
            <InputStyled
              className="delivery-courier__entrance"
              label="Подъезд"
              isGrayLabel
            />
            <InputStyled
              className="delivery-courier__floor"
              label="Этаж"
              isGrayLabel
            />
          </div>
          <h2 className="delivery-courier__title delivery-courier__wrap-title">
            Время доставки:
          </h2>
          <div className="delivery-courier__box-radio">
            {DELIVERY_DATES.map((date) => (
              <RadioBox
                className="delivery-courier__item-radio"
                key={date.id}
                name="date"
                disabled={date.disabled}
              >
                {date.title} —{' '}
                <RadioBox.Price>{formaterCurrency(date.price)}</RadioBox.Price>
              </RadioBox>
            ))}
          </div>
          <SelectLabel
            className="delivery-courier__select-date"
            label="Дата доставки"
            fullWidth
            isGrayLabel
          >
            {DATE_ARRAY.map((date) => (
              <SelectLabel.Option
                key={date.getTime()}
                value={date.toISOString()}
              >
                {formaterDateWithWeekday(date)} — {formaterCurrency(price)}
              </SelectLabel.Option>
            ))}
          </SelectLabel>
          <SelectLabel
            className="delivery-courier__select-time"
            label="Время доставки"
            fullWidth
            isGrayLabel
          >
            {TIMES.map((time) => (
              <SelectLabel.Option key={time.id} value={time.id.toString()}>
                {time.title}
              </SelectLabel.Option>
            ))}
          </SelectLabel>
          <Button className="delivery-courier__button" fullWidth>
            Продолжить
          </Button>
        </div>
      )}
    </div>
  );
}

export default DeliveryCourier;
