import { getProduct } from './getProduct';

export type TGetProductReturnType = Awaited<ReturnType<typeof getProduct>>;

export type TProducts =
  | {
      id: number;
      description: string | null;
      price: number;
      oldPrice: number | null;
      productImagesPrimary: {
        imageUrl: string | null;
      }[];
      brands: {
        name: string;
      } | null;
    }[]
  | null;
