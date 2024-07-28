export type TWareData = {
  id: number;
  images: (string | null)[];
  name: string;
  description?: string | null;
  price: number;
  oldPrice?: number | null;
  discount?: number | null;
  isFavorite?: boolean | null;
};

export interface IWareCardProps {
  data: TWareData;
  className?: string;
  bgColorImage?: 'light-gray' | 'white';
}
