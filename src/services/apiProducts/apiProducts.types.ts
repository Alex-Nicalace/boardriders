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

export type TFilters = {
  field: string;
} & (
  | { method: 'eq' | 'gte' | 'lte'; value: string }
  | { method: 'in'; value: string[] | number[] }
);
