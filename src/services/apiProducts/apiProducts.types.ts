import { getProduct } from './getProduct';

export type TGetProductReturnType = Awaited<ReturnType<typeof getProduct>>;
