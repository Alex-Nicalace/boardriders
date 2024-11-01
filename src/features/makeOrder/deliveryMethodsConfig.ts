import { TDeliveryMethod } from '../../types';

export const DELIVERY_METHODS: Record<TDeliveryMethod, string> = {
  'get-in-shop': 'Самовывоз из магазина',
  'delivery-in-shop': 'Доставка в магазин',
  courier: 'Курьером',
  'pick-up-point': 'Самовывоз в пункте выдачи',
};
