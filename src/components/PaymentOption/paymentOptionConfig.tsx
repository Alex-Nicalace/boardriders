import PaymentCards from './PaymentCards';

export const PAYCARDS: ['visa', 'mastercard', 'maestro', 'mir'] = [
  'visa',
  'mastercard',
  'maestro',
  'mir',
];

export const PAYMENT_METHOD = [
  {
    title: 'При получении',
    donedTitle: 'Оплата при получении',
    hint: 'Наличными или картой при получении',
    value: 'cash',
  },
  {
    title: 'Картой на сайте',
    donedTitle: 'Оплата картой на сайте',
    hint: <PaymentCards />,
    value: 'card',
  },
];
