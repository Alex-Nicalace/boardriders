import {
  Transition,
  TransitionGroup,
} from '../../component-library/Transition';
import { TRANSITION_STYLES_ZOOMOUT } from '../../constants';
import WareCard from '../ui/WareCard';
import './ProductList.scss';
import { ICustomCSSProperties, TProductListProps } from './ProductList.types';

function ProductList({
  className,
  data,
  isTransitionGroup,
  animateDuration = 1000,
}: TProductListProps): JSX.Element {
  const style: ICustomCSSProperties = {
    ...(animateDuration && { '--animate-duration': `${animateDuration}ms` }),
  };

  return (
    <ul
      className={['product-list', className].filter(Boolean).join(' ')}
      style={style}
    >
      {!isTransitionGroup &&
        data.map((item) => (
          <li key={item.id} className="product-list__item">
            <WareCard className="product-list__card" data={item} />
          </li>
        ))}
      {isTransitionGroup && (
        <TransitionGroup>
          {data.map((item) => (
            <Transition key={item.id} timeout={animateDuration}>
              {(state) => (
                <li
                  key={item.id}
                  className={[
                    'product-list__item',
                    TRANSITION_STYLES_ZOOMOUT[state],
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <WareCard className="product-list__card" data={item} />
                </li>
              )}
            </Transition>
          ))}
        </TransitionGroup>
      )}
    </ul>
  );
}

export default ProductList;
