import './CartList.scss';
import { useFormaters } from '../../Context/useFormaters';
import WareCardCart from '../ui/WareCardCart';
import { useScreenWidth } from '../../Context/useScreenWidthContext';

type TCartListProps = {
  className?: string;
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
function CartList({ className, cartData }: TCartListProps): JSX.Element {
  const { formaterCurrency } = useFormaters();
  const { isLessMobile } = useScreenWidth();

  const totalPrice = cartData.reduce((acc, item) => acc + item.price, 0);
  const totalItems = cartData.length;

  const classes = ['cart-list', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <ul className="cart-list__list">
        {cartData.map((item) => (
          <li className="cart-list__item" key={item.article}>
            <WareCardCart
              data={item}
              mode={isLessMobile ? 'mobile' : 'desktop'}
            />
          </li>
        ))}
      </ul>

      <div className="cart-list__total">
        <span className="cart-list__total-text">
          {totalItems} товар(а) на сумму
        </span>
        <span className="cart-list__total-value">
          {formaterCurrency(totalPrice)}
        </span>
      </div>
    </div>
  );
}

export default CartList;
