import { Tuple } from '../../utils/types';
import WareCard, { IWareData } from '../ui/WareCard';
import './FavouriteList.scss';

export type TupleIWareData3 = Tuple<IWareData, 3>;

type TFavouriteListProps = {
  className?: string;
  data: TupleIWareData3;
};
function FavouriteList({ className, data }: TFavouriteListProps): JSX.Element {
  return (
    <ul className={['favourite-list', className].filter(Boolean).join(' ')}>
      {data.map((product) => (
        <li className="favourite-list__item" key={product.wareId}>
          <WareCard wareDate={product} bgColorImage="white" />
        </li>
      ))}
    </ul>
  );
}

export default FavouriteList;
