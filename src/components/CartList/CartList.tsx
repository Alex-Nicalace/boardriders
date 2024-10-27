import './CartList.scss';
import WareCardCart from '../ui/WareCardCart';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import { getDeclension } from '../../utils/getDeclension';
import {
  Transition,
  TransitionGroup,
} from '../../component-library/Transition';
import { ICustomCSSProperties, TCartListProps } from './CartList.types';
import { formaterCurrency } from '../../utils/formaters';
import { TRANSITION_STYLES_BACKOUTLEFT } from '../../constants';

function CartList({
  className,
  data,
  isOrdered = false,
  animateDuration = 1000,
  quantityTotal,
  priceTotal,
  onChangeQuantity,
  onRemove,
}: TCartListProps): JSX.Element {
  const { isLessMobile } = useScreenWidth();

  const classes = ['cart-list', isOrdered && 'cart-list_ordered', className]
    .filter(Boolean)
    .join(' ');

  const style: ICustomCSSProperties = {
    ...(animateDuration && { '--animate-duration': `${animateDuration}ms` }),
  };

  return (
    <div className={classes} style={style}>
      {isOrdered && !isLessMobile && (
        <div className="cart-list__header">
          <span>Товар</span>
          <span></span>
          <span>Цена за единицу</span>
          <span>Сумма</span>
        </div>
      )}

      <ul className="cart-list__list">
        <TransitionGroup>
          {data.map((product) => (
            <Transition
              key={product.productVariantId}
              timeout={animateDuration}
            >
              {(state) => (
                <li
                  className={[
                    'cart-list__item',
                    TRANSITION_STYLES_BACKOUTLEFT[state],
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <WareCardCart
                    data={product}
                    mode={isLessMobile ? 'mobile' : 'desktop'}
                    isOrdered={isOrdered}
                    onChangeQuantity={(quantity) =>
                      onChangeQuantity?.(product.productVariantId, quantity)
                    }
                    onRemove={() => onRemove?.(product.productVariantId)}
                  />
                </li>
              )}
            </Transition>
          ))}
        </TransitionGroup>
      </ul>

      {!isOrdered && (
        <div className="cart-list__total">
          <span className="cart-list__total-text">
            {`${getDeclension(
              quantityTotal,
              'товар',
              'товара',
              'товаров'
            )} на сумму`}
          </span>
          <span className="cart-list__total-value">
            {formaterCurrency(priceTotal)}
          </span>
        </div>
      )}
    </div>
  );
}

export default CartList;
