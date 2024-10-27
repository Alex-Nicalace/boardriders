import {
  Transition,
  TransitionGroup,
} from '../../component-library/Transition';
import { TRANSITION_STYLES_ZOOMOUT } from '../../constants';
import { Tuple } from '../../utils/types';
import WareCard, { TWareData } from '../ui/WareCard';
import './FavouriteList.scss';

export type TupleIWareData3 = Tuple<TWareData, 3>;

type TFavouriteListProps = {
  className?: string;
  data: TupleIWareData3;
};
function FavouriteList({ className, data }: TFavouriteListProps): JSX.Element {
  return (
    <ul className={['favourite-list', className].filter(Boolean).join(' ')}>
      <TransitionGroup>
        {data.map((product) => (
          <Transition key={product.id} timeout={1000}>
            {(state) => (
              <li
                className={[
                  'favourite-list__item',
                  TRANSITION_STYLES_ZOOMOUT[state],
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={product.id}
              >
                <WareCard data={product} bgColorImage="white" />
              </li>
            )}
          </Transition>
        ))}
      </TransitionGroup>
    </ul>
  );
}

export default FavouriteList;
