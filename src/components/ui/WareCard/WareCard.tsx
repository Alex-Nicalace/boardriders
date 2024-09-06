import { Link } from 'react-router-dom';
import './WareCard.scss';
import { useFormaters } from '../../../Context/useFormaters';
import { IWareCardProps } from './WareCard.types';
import { ImageSizes } from '../../../utils/types';
import ButtonWishList from '../../../features/wishList/ButtonWishList';

function WareCard({
  data,
  className,
  bgColorImage = 'light-gray',
}: IWareCardProps): JSX.Element {
  const {
    name,
    description,
    price,
    oldPrice,
    discount,
    images,
    id: wareId,
  } = data;
  const { formaterCurrency, formaterPercent } = useFormaters();
  const to = `/product/${wareId}`;
  const [imgMainUrl, imgSecondUrl] = (images || [])
    .filter((url) => url !== null)
    .map((url) => url + ImageSizes.Card);

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
            <span className="ware-card__discount">
              {formaterPercent(discount)}
            </span>
          )}
        </Link>
        <ButtonWishList
          className="ware-card__favorite"
          bgColor={bgColorImage === 'white' ? 'light-gray' : 'white'}
          adaptiveSize="container"
          productId={wareId}
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
