export type TProductProps = {
  className?: string;
  data: {
    description?: string | null;
    detailedDescription?: string | null;
    price: number;
    oldPrice?: number | null;
    discount?: number | null;
    manufacturerSKU?: string | null;
    iconBrandUrl: string;
    rating?: number | null;
    reviewCount: number;
    colorList?:
      | {
          color: string;
          value: string;
          isEmpty: boolean;
        }[]
      | null;
    sizeList?:
      | {
          size: string;
          value: string;
          isEmpty: boolean;
        }[]
      | null;
  };
  selectedColor?: string | null;
  selectedSize?: string | null;

  onColorChange?: (value: string) => void;
  onSizeChange?: (value: string) => void;
};
