import { Link } from 'react-router-dom';
import './WareCardCart.scss';
import InputNumber from '../InputNumber';
import { CloseIcon } from '../Icons';
import { useFormaters } from '../../../Context/useFormaters';

type TWareCardCartProps = {
  className?: string;
  mode?: 'desktop' | 'mobile';
  isOrdered?: boolean;
  data: {
    title: string;
    img: string;
    article: string;
    props: { name: string; value: string }[];
    price: number;
    count?: number;
  };
};
function WareCardCart({
  className = '',
  mode = 'desktop',
  data: { title, article, img, props, price, count = 1 },
  isOrdered = false,
}: TWareCardCartProps): JSX.Element {
  const { formaterCurrency } = useFormaters();
  const classes = [
    'ware-card-cart',
    mode === 'mobile' && 'ware-card-cart_mobile',
    isOrdered && 'ware-card-cart_ordered',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classes}>
      <h2 className="ware-card-cart__title">
        <Link className="ware-card-cart__link" to="#">
          {title}
        </Link>
      </h2>
      <div className="ware-card-cart__img">
        <img src={img} loading="lazy" alt="" />
      </div>
      <div className="ware-card-cart__article">
        Артикул производителя: {article}
      </div>
      <ul className="ware-card-cart__props">
        {props.map(({ name, value }) => (
          <li className="ware-card-cart__prop" key={name}>
            {name}: {value}
          </li>
        ))}
      </ul>
      {!isOrdered && (
        <InputNumber
          className="ware-card-cart__count"
          min={1}
          max={99}
          defaultValue={count}
        />
      )}
      {isOrdered && (
        <div className="ware-card-cart__count">
          {count} x {formaterCurrency(price)}
        </div>
      )}
      <div className="ware-card-cart__price">
        {formaterCurrency(isOrdered ? price * count : price)}
      </div>
      {!isOrdered && (
        <button className="ware-card-cart__btn-delete">
          <CloseIcon />
        </button>
      )}
    </article>
  );
}

export default WareCardCart;
