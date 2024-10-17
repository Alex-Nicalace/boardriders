import { getCartProducts } from '../../services/apiCart/getCartProducts';

export type TCartList = Awaited<ReturnType<typeof getCartProducts>>;

export type TCartItem = Omit<
  Awaited<ReturnType<typeof getCartProducts>>[number],
  'cartId'
> & {
  cartId?: number;
};
