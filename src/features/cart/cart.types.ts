import { getCartProducts } from '../../services/apiCart';

export type TCartList = Awaited<ReturnType<typeof getCartProducts>>;
