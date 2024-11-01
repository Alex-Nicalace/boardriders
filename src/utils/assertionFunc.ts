import { statusOrder } from '../constants';
import { TDeliveryMethod, TStatusOrderKey } from '../types';

export function isTStatusOrderKey(value: any): value is TStatusOrderKey {
  return typeof value === 'string' && Object.keys(statusOrder).includes(value);
}

export function isTDeliveryMethod(value: any): value is TDeliveryMethod {
  return (
    typeof value === 'string' &&
    ['get-in-shop', 'delivery-in-shop', 'courier', 'pick-up-point'].includes(
      value
    )
  );
}
