export type TProductProps = {
  className?: string;
  data: {
    id: number;
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
    galleryPreview: {
      isLoading: boolean;
      images: string[];
    };
    productAttributes: {
      attributeId: number;
      name: string;
      value: string;
    }[];
    productDescriptionImages: { imageUrl: string }[];
  };
  selectedColor?: string | null;
  selectedSize?: string | null;
  disabled?: boolean;
  isInCart?: boolean;

  onColorChange?: (value: string) => void;
  onSizeChange?: (value: string) => void;
  onAddToCart?: () => void;
};
