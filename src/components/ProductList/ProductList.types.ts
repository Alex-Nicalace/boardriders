import { TWareData } from '../ui/WareCard';

export type TProductListProps = {
  className?: string;
  data: TWareData[];
} & (
  | { isTransitionGroup?: false; animateDuration?: never }
  | { isTransitionGroup: true; animateDuration: number }
);

export interface ICustomCSSProperties extends React.CSSProperties {
  '--animate-duration'?: string;
}
