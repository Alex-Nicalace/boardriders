import { getProducts } from '../../services/apiProducts';

export type TWishList = Awaited<ReturnType<typeof getProducts>>;
