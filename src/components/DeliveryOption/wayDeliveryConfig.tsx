import NotAvailable from './NotAvailable';
import { TWayDelivery } from './DeliveryOption.types';
import DeliveryCourier from '../DeliveryCourier';

export const WAY_DELIVERY: TWayDelivery[] = [
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
    donedTitle: 'Доставить курьером',
    price: 'от 0 ₽',
    hint: 'Доставим по указанному адресу',
    content: <DeliveryCourier />,
    value: 'courier',
  },
  {
    title: 'Пункт выдачи',
    donedTitle: 'Доставить на пункт выдачи',
    hint: 'Забрать товар в одном из пунктов выдачи',
    content: <NotAvailable message="Пункт выдачи" />,
    value: 'pick-up-point',
  },
];
