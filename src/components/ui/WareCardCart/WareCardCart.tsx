import { Link } from 'react-router-dom';
import './WareCardCart.scss';
import InputNumber from '../InputNumber';
import { CloseIcon } from '../Icons';

type TWareCardCartProps = {
  className?: string;
  mode?: 'desktop' | 'mobile';
  data: {
    title: string;
    img: string;
    article: string;
    props: { name: string; value: string }[];
    price: number;
  };
};
function WareCardCart({
  className = '',
  mode = 'desktop',
  data: { title, article, img, props, price },
}: TWareCardCartProps): JSX.Element {
  const classes = [
    'ware-card-cart',
    className,
    mode === 'mobile' && 'ware-card-cart_mobile',
  ]
    .filter(Boolean)
    .join(' ');

  const formater = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0, // не показывать друбную часть, если ее нет
  });

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
      <InputNumber className="ware-card-cart__input" min={1} max={99} />
      <div className="ware-card-cart__price">{formater.format(price)}</div>
      <button className="ware-card-cart__btn-delete">
        <CloseIcon />
      </button>
    </article>
  );
}

export default WareCardCart;
