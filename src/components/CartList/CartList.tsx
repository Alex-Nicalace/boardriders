import './CartList.scss';
import { useFormaters } from '../../Context/useFormaters';
import WareCardCart from '../ui/WareCardCart';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import { getDeclension } from '../../utils/getDeclension';
import {
  Transition,
  TransitionGroup,
  TStateTransition,
} from '../../component-library/Transition';
import { ICustomCSSProperties, TCartListProps } from './CartList.types';

const TRANSITION_STYLES: Record<TStateTransition, string> = {
  entering: '',
  entered: '',
  exiting: 'animate backOutLeft',
  exited: '',
};

function CartList({
  className,
  data,
  isOrdered = false,
  animateDuration = 1000,
  onChangeQuantity,
  onRemove,
}: TCartListProps): JSX.Element {
  const { formaterCurrency } = useFormaters();
  const { isLessMobile } = useScreenWidth();

  const total = data.reduce(
    (acc, item) => ({
      items: acc.items + item.quantity,
      price: acc.price + item.price * item.quantity,
    }),
    {
      items: 0,
      price: 0,
    }
  );

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
            <Transition key={product.id} timeout={animateDuration}>
              {(state) => (
                <li
                  className={['cart-list__item', TRANSITION_STYLES[state]]
                    .filter(Boolean)
                    .join(' ')}
                  key={product.id}
                >
                  <WareCardCart
                    data={product}
                    mode={isLessMobile ? 'mobile' : 'desktop'}
                    isOrdered={isOrdered}
                    onChangeQuantity={(quantity) =>
                      onChangeQuantity?.(product.id, quantity)
                    }
                    onRemove={() => onRemove?.(product.id)}
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
            {`${total.items} ${getDeclension(
              total.items,
              'товар',
              'товара',
              'товаров'
            )} на сумму`}
          </span>
          <span className="cart-list__total-value">
            {formaterCurrency(total.price)}
          </span>
        </div>
      )}
    </div>
  );
}

export default CartList;
