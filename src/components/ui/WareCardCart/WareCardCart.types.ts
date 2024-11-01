type TWareCardCartBaseData = {
  cartId?: number;
  productVariantId: number;
  productId: number;
  name: string;
  imageUrl: string;
  manufacturerSKU: string;
  props: { name: string; value: string; nameDisplay?: string }[];
  quantity: number;
};
export type TWareCardCartData = TWareCardCartBaseData & {
  price: number;
  unitPrice?: never;
  totalPrice?: never;
};

export type TWareCardCartDataOrdered = TWareCardCartBaseData & {
  price?: never;
  unitPrice: number;
  totalPrice: number;
};
export type TWareCardCartProps = {
  className?: string;
  mode?: 'desktop' | 'mobile';
  onChangeQuantity?: (quantity: number) => void;
  onRemove?: () => void;
} & (
  | {
      isOrdered?: false;
      data: TWareCardCartData;
    }
  | {
      isOrdered: true;
      data: TWareCardCartDataOrdered;
    }
);
