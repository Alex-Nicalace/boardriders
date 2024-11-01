import {
  TWareCardCartData,
  TWareCardCartDataOrdered,
} from '../ui/WareCardCart';

export type TCartListProps = {
  className?: string;
  animateDuration?: number;
  onChangeQuantity?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
} & (
  | {
      isOrdered?: false;
      quantityTotal: number;
      priceTotal: number;
      data: TWareCardCartData[];
    }
  | {
      isOrdered: true;
      quantityTotal?: never;
      priceTotal?: never;
      data: TWareCardCartDataOrdered[];
    }
);

export interface ICustomCSSProperties extends React.CSSProperties {
  '--animate-duration'?: string;
}
