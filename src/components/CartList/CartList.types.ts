import { TWareCardCartData } from '../ui/WareCardCart';

export type TCartListProps = {
  className?: string;
  isOrdered?: boolean;
  data: TWareCardCartData[];
  animateDuration?: number;
  onChangeQuantity?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
};

export interface ICustomCSSProperties extends React.CSSProperties {
  '--animate-duration'?: string;
}
