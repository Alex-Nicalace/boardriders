export type TDataItem = {
  name: string;
  price: number;
  quantity: number;
  productVariantId: number;
};

export type TShoppngListProps<T> = {
  className?: string;
  data: T[];
  render?: (item: T) => React.ReactNode;
  limitListCount?: number;
};
