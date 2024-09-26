export type TWareCardCartData = {
  id: number;
  productId: number;
  name: string;
  imageUrl: string;
  manufacturerSKU: string;
  props: { name: string; value: string; nameDisplay?: string }[];
  price: number;
  quantity: number;
};
export type TWareCardCartProps = {
  className?: string;
  mode?: 'desktop' | 'mobile';
  isOrdered?: boolean;
  data: TWareCardCartData;

  onChangeQuantity?: (quantity: number) => void;
  onRemove?: () => void;
};
