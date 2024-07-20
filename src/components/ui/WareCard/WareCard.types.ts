import { Tables } from '../../../services/supabase.types';

export type TWareData = Pick<
  Tables<'products'>,
  | 'id'
  | 'imgMainUrl'
  | 'imgSecondUrl'
  | 'name'
  | 'description'
  | 'price'
  | 'oldPrice'
  | 'discount'
> & {
  isFavorite?: boolean;
};

export interface IWareCardProps {
  data: TWareData;
  className?: string;
  bgColorImage?: 'light-gray' | 'white';
}
