import { FormProvider, useForm } from 'react-hook-form';
import './DeliveryOption.scss';
import { ExclamationInCircleIcon } from '../ui/Icons';
import RadioBox from '../ui/RadioBox';
import SelectLabel, { SelectLabelControl } from '../ui/SelectLabel';
import DeliveryCourier from '../DeliveryCourier';
import Notification from '../Notification';
import { MSG_REQUIRED } from '../FormAuth/constants';
import {
  TDeliveryOptionProps,
  TDeliveryForm,
  TWayDelivery,
} from './DeliveryOption.types';

const NotAvailable = ({ message }: { message: string }) => (
  <Notification
    className="delivery-option__notification"
    text={`Способ доставки «${message}» недоступен 🙄`}
  />
);
const WAY_DELIVERY: TWayDelivery[] = [
  {
    title: 'Забрать в магазине сегодня',
    price: 'Бесплатно',
    hint: 'Зарезервируем товар, который сейчас на полках. Заказ храним 1 день',
    content: <NotAvailable message="Забрать в магазине сегодня" />,
    value: 'get-in-shop',
  },
  {
    title: 'Доставить в магазин',
    hint: 'Привезем товар в удобный вам магазин через несколько дней. Заказ храним 5 дней',
    disabled: true,
    content: <NotAvailable message="Доставить в магазин" />,
    value: 'delivery-in-shop',
  },
  {
    title: 'Курьером сегодня и позже',
    price: 'от 0 ₽',
    hint: 'Доставим по указанному адресу',
    content: <DeliveryCourier />,
    value: 'courier',
  },
  {
    title: 'Пункт выдачи',
    hint: 'Забрать товар в одном из пунктов выдачи',
    content: <NotAvailable message="Пункт выдачи" />,
    value: 'pick-up-point',
  },
];

function DeliveryOption({
  deliveryRegionList,
  onSubmit = () => {},
}: TDeliveryOptionProps): JSX.Element {
  const formMethods = useForm<TDeliveryForm>();
  const { handleSubmit, register, watch } = formMethods;
  const selectedDeliveryMethod = watch('deliveryMethod');

  return (
    <FormProvider {...formMethods}>
      <form className="delivery-option" onSubmit={handleSubmit(onSubmit)}>
        <div className="delivery-option__box-region">
          <SelectLabelControl
            className="delivery-option__region"
            label="Ваш город"
            name="regionDeliveryId"
            rules={{
              required: MSG_REQUIRED,
              validate: (value) => !isNaN(value) || 'Недопустимый формат',
            }}
            asNumber
          >
            {deliveryRegionList.map(({ id, name }) => (
              <SelectLabel.Option key={id} value={`${id}`}>
                {name}
              </SelectLabel.Option>
            ))}
          </SelectLabelControl>

          <div className="delivery-option__exclamation">
            <span>
              <ExclamationInCircleIcon />
            </span>
            <p>
              Убедитесь, что правильно указали населенный пункт - от этого
              зависят доступные виды доставки и стоимость
            </p>
          </div>
        </div>

        <div className="delivery-option__title">Способ доставки:</div>

        <ul className="delivery-option__list">
          {WAY_DELIVERY.map(({ title, price, hint, disabled, value }) => (
            <li key={title} className="delivery-option__item">
              <RadioBox
                className="delivery-option__radio"
                view="grid"
                disabled={disabled}
                value={value}
                {...register('deliveryMethod')}
              >
                <RadioBox.Title>{title}</RadioBox.Title>
                {price && <RadioBox.Price>{price}</RadioBox.Price>}
                <RadioBox.Hint>{hint}</RadioBox.Hint>
              </RadioBox>
            </li>
          ))}
        </ul>

        {selectedDeliveryMethod &&
          WAY_DELIVERY.find((item) => item.value === selectedDeliveryMethod)
            ?.content}
      </form>
    </FormProvider>
  );
}

export default DeliveryOption;
