import { getProduct } from './apiProducts';

export type TGetProductReturnType = Awaited<ReturnType<typeof getProduct>>;
