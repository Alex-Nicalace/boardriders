import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import './DeliveryCourier.scss';
import { useFormaters } from '../../Context/useFormaters';
import { generateDateArray } from '../../utils/generateDateArray';
import Button from '../ui/Button';
import InputStyled from '../ui/InputStyled';
import RadioBox from '../ui/RadioBox';
import SelectLabel, { SelectLabelControl } from '../ui/SelectLabel';
import { MSG_REQUIRED } from '../FormAuth/constants';
import { TDeliveryForm } from '../DeliveryOption';
import { formaterDateWithWeekday } from '../../utils/formaters';

// ! по макету выбор адреса это выпадающий список, но на данном этапе сделаю текстовый ввод

const CURRENT_DATE = new Date();
const NEXT_WEEK = new Date(new Date().setDate(CURRENT_DATE.getDate() + 6));
const DATE_ARRAY = generateDateArray(CURRENT_DATE, NEXT_WEEK);
const DELIVERY_DATES = [
  {
    id: 1,
    title: 'Завтра недоступно по вашему адресу',
    price: 99,
    disabled: true,
  },
  {
    id: 2,
    title: `${formaterDateWithWeekday(CURRENT_DATE)} и позже`,
    price: 19,
  },
];

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
  const {
    register,
    formState: { errors, isValid },
    getValues,
    resetField,
  } = useFormContext<TDeliveryForm>();
  const [street, building] = getValues(['courier.street', 'courier.building']);
  const address = `${street}, ${building}`;
  const [isCheckDate, setIsCheckDate] = useState(isValid);
  const price = 19;

  function handleClickButtonCheck() {
    setIsCheckDate((prevValue) => (!prevValue ? isValid : false));
  }

  function handleResetCourier() {
    setIsCheckDate(false);
    resetField('courier');
  }

  return (
    <div className="delivery-courier">
      <div className="delivery-courier__title-box delivery-courier__wrap-title">
        <h2 className="delivery-courier__title">Адрес доставки:</h2>
        {isCheckDate && (
          <button
            className="delivery-courier__btn-edit"
            onClick={handleResetCourier}
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
            {...register('courier.street', {
              required: MSG_REQUIRED,
            })}
            error={errors.courier?.street?.message}
          />
          <InputStyled
            className="delivery-courier__house"
            label="Дом, строение"
            isGrayLabel
            {...register('courier.building', { required: true })}
            isError={!!errors.courier?.building}
          />
          <Button
            className="delivery-courier__button"
            fullWidth
            onClick={handleClickButtonCheck}
          >
            Проверить даты доставки
          </Button>
        </div>
      )}
      {isCheckDate && (
        <div className="delivery-courier__box-check-date">
          <p className="delivery-courier__full-address">{address}</p>
          <div className="delivery-courier__box-apartment">
            <InputStyled
              className="delivery-courier__apartment"
              label="Квартира"
              isGrayLabel
              {...register('courier.apartment')}
            />
            <InputStyled
              className="delivery-courier__entrance"
              label="Подъезд"
              isGrayLabel
              {...register('courier.entrance')}
            />
            <InputStyled
              className="delivery-courier__floor"
              label="Этаж"
              isGrayLabel
              {...register('courier.floor', {
                pattern: { value: /^[0-9]+$/, message: 'Цифры!' },
              })}
              error={errors.courier?.floor?.message}
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
                defaultChecked={!date.disabled}
              >
                {`${date.title} — `}
                <RadioBox.Price>{formaterCurrency(date.price)}</RadioBox.Price>
              </RadioBox>
            ))}
          </div>

          <SelectLabelControl
            className="delivery-courier__select-date"
            label="Дата доставки"
            fullWidth
            isGrayLabel
            name="courier.date"
            rules={{
              required: MSG_REQUIRED,
              validate: (value) =>
                !isNaN(new Date(value).getTime()) || 'Недопустимый формат',
            }}
          >
            {DATE_ARRAY.map((date) => (
              <SelectLabel.Option
                key={date.getTime()}
                value={date.toISOString()}
              >
                {formaterDateWithWeekday(date)} — {formaterCurrency(price)}
              </SelectLabel.Option>
            ))}
          </SelectLabelControl>

          <SelectLabelControl
            className="delivery-courier__select-time"
            label="Время доставки"
            fullWidth
            isGrayLabel
            name="courier.time"
            rules={{ required: MSG_REQUIRED }}
          >
            {TIMES.map((time) => (
              <SelectLabel.Option key={time.id} value={time.id.toString()}>
                {time.title}
              </SelectLabel.Option>
            ))}
          </SelectLabelControl>

          <Button className="delivery-courier__button" fullWidth>
            Продолжить
          </Button>
        </div>
      )}
    </div>
  );
}

export default DeliveryCourier;
