import './CartList.scss';
import { useFormaters } from '../../Context/useFormaters';
import WareCardCart, { TWareCardCartData } from '../ui/WareCardCart';
import { useScreenWidth } from '../../Context/useScreenWidthContext';

type TCartListProps = {
  className?: string;
  isOrdered?: boolean;
  data: TWareCardCartData[];
  onChangeQuantity?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
};
function CartList({
  className,
  data,
  isOrdered = false,
  onChangeQuantity,
  onRemove,
}: TCartListProps): JSX.Element {
  const { formaterCurrency } = useFormaters();
  const { isLessMobile } = useScreenWidth();

  const totalPrice = data.reduce((acc, item) => acc + item.price, 0);
  const totalItems = data.length;

  const classes = ['cart-list', isOrdered && 'cart-list_ordered', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {isOrdered && !isLessMobile && (
        <div className="cart-list__header">
          <span>Товар</span>
          <span></span>
          <span>Цена за единицу</span>
          <span>Сумма</span>
        </div>
      )}

      <ul className="cart-list__list">
        {data.map((product) => (
          <li className="cart-list__item" key={product.id}>
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
        ))}
      </ul>

      {!isOrdered && (
        <div className="cart-list__total">
          <span className="cart-list__total-text">
            {totalItems} товар(а) на сумму
          </span>
          <span className="cart-list__total-value">
            {formaterCurrency(totalPrice)}
          </span>
        </div>
      )}
    </div>
  );
}

export default CartList;
