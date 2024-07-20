import { Link } from 'react-router-dom';
import './WareCard.scss';
import Favorite from '../Favorite';
import { useFormaters } from '../../../Context/useFormaters';
import { IWareCardProps } from './WareCard.types';

function WareCard({
  data,
  className,
  bgColorImage = 'light-gray',
}: IWareCardProps): JSX.Element {
  const {
    imgMainUrl,
    imgSecondUrl,
    name,
    description,
    price,
    oldPrice,
    discount,
    isFavorite = false,
  } = data;
  const { formaterCurrency } = useFormaters();
  const to = `/product/${data.id}`;

  return (
    <article className={['ware-card', className].filter(Boolean).join(' ')}>
      <div className="ware-card__top">
        <Link
          to={to}
          className={`ware-card__link ware-card__link_${bgColorImage}`}
        >
          <span className="ware-card__img-wrap">
            <img
              src={imgMainUrl || undefined}
              className="ware-card__img"
              loading="lazy"
              alt="изображение продукта"
            />
            {imgSecondUrl && (
              <img
                src={imgSecondUrl}
                className="ware-card__img"
                loading="lazy"
                alt="изображение продукта"
              />
            )}
          </span>
          {!!discount && (
            <span className="ware-card__discount">{discount}%</span>
          )}
        </Link>
        <Favorite
          className="ware-card__favorite"
          checked={isFavorite}
          bgColor={bgColorImage === 'white' ? 'light-gray' : 'white'}
          adaptiveSize="container"
        />
      </div>
      <footer className="ware-card__footer">
        <Link className="ware-card__title" to={to}>
          <h3>{name}</h3>
        </Link>
        <p className="ware-card__descr">{description}</p>
        <div className="ware-card__price">
          {oldPrice && (
            <span className="ware-card__price ware-card__price_old">
              {formaterCurrency(oldPrice)}
            </span>
          )}
          <span
            className={['ware-card__price', oldPrice && 'ware-card__price_new']
              .filter(Boolean)
              .join(' ')}
          >
            {formaterCurrency(price)}
          </span>
        </div>
      </footer>
    </article>
  );
}

export default WareCard;
