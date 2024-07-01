import './CartList.scss';
import { useFormaters } from '../../Context/useFormaters';
import WareCardCart from '../ui/WareCardCart';
import { useScreenWidth } from '../../Context/useScreenWidthContext';

type TCartListProps = {
  className?: string;
  isOrdered?: boolean;
  cartData: {
    title: string;
    img: string;
    article: string;
    props: {
      name: string;
      value: string;
    }[];
    price: number;
  }[];
};
function CartList({
  className,
  cartData,
  isOrdered = false,
}: TCartListProps): JSX.Element {
  const { formaterCurrency } = useFormaters();
  const { isLessMobile } = useScreenWidth();

  const totalPrice = cartData.reduce((acc, item) => acc + item.price, 0);
  const totalItems = cartData.length;

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
        {cartData.map((item) => (
          <li className="cart-list__item" key={item.article}>
            <WareCardCart
              data={item}
              mode={isLessMobile ? 'mobile' : 'desktop'}
              isOrdered={isOrdered}
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
