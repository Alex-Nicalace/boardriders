import { Link } from 'react-router-dom';
import './WareCardCart.scss';
import { TWareCardCartProps } from './WareCardCart.types';
import InputNumber from '../InputNumber';
import { CloseIcon } from '../Icons';
import { ImageSizes } from '../../../utils/types';
import { formaterCurrency } from '../../../utils/formaters';

function WareCardCart({
  className,
  mode = 'desktop',
  onChangeQuantity = () => {},
  onRemove = () => {},
  ...args
}: TWareCardCartProps): JSX.Element {
  const { imageUrl, productId, props, name, manufacturerSKU, quantity } =
    args.data;
  const classes = [
    'ware-card-cart',
    mode === 'mobile' && 'ware-card-cart_mobile',
    args.isOrdered && 'ware-card-cart_ordered',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const imageURL = imageUrl + ImageSizes.CardCart;

  const productUrl = new URL(`/product/${productId}`, window.location.origin);
  props.forEach(({ name, value }) => {
    productUrl.searchParams.append(name, value);
  });

  return (
    <article className={classes}>
      <h2 className="ware-card-cart__title">
        <Link
          className="ware-card-cart__link"
          to={`${productUrl.pathname}${productUrl.search}`}
        >
          {name}
        </Link>
      </h2>
      <div className="ware-card-cart__img">
        <img src={imageURL} loading="lazy" alt="" />
      </div>
      <div className="ware-card-cart__article">
        Артикул производителя: {manufacturerSKU}
      </div>
      <ul className="ware-card-cart__props">
        {props.map(({ nameDisplay, value }) => (
          <li className="ware-card-cart__prop" key={nameDisplay}>
            {nameDisplay}: {value}
          </li>
        ))}
      </ul>
      {!args.isOrdered && (
        <InputNumber
          className="ware-card-cart__count"
          min={1}
          max={99}
          value={quantity}
          onChange={onChangeQuantity}
        />
      )}
      {args.isOrdered && (
        <div className="ware-card-cart__count">
          {quantity} x {formaterCurrency(args.data.unitPrice)}
        </div>
      )}
      <div className="ware-card-cart__price">
        {formaterCurrency(
          args.isOrdered ? args.data.totalPrice : args.data.price
        )}
      </div>
      {!args.isOrdered && (
        <button className="ware-card-cart__btn-delete" onClick={onRemove}>
          <CloseIcon />
        </button>
      )}
    </article>
  );
}

export default WareCardCart;
