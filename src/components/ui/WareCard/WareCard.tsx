import { Link } from 'react-router-dom';
import './WareCard.scss';
import Favorite from '../Favorite';
export interface IWareData {
  wareId: string;
  imgMain: string;
  imgSecond?: string;
  title: string;
  descr: string;
  price: number;
  newPrice?: number;
  discount?: number;
  isFavorite?: boolean;
  to: string;
}
interface IWareCardProps {
  wareDate: IWareData;
  className?: string;
  bgColorImage?: 'light-gray' | 'white';
}
function WareCard({
  wareDate,
  className,
  bgColorImage = 'light-gray',
}: IWareCardProps): JSX.Element {
  const {
    imgMain,
    imgSecond,
    title,
    descr,
    price,
    newPrice,
    discount,
    isFavorite = false,
    to,
  } = wareDate;
  return (
    <article className={['ware-card', className].filter(Boolean).join(' ')}>
      <div className="ware-card__top">
        <Link
          to={to}
          className={`ware-card__link ware-card__link_${bgColorImage}`}
        >
          <span className="ware-card__img-wrap">
            <img
              src={imgMain}
              className="ware-card__img"
              loading="lazy"
              alt="изображение продукта"
            />
            {imgSecond && (
              <img
                src={imgSecond}
                className="ware-card__img"
                loading="lazy"
                alt="изображение продукта"
              />
            )}
          </span>
          {discount && <span className="ware-card__discount">{discount}%</span>}
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
          <h3>{title}</h3>
        </Link>
        <p className="ware-card__descr">{descr}</p>
        <div className="ware-card__price">
          <span
            className={`ware-card__price ${
              newPrice ? 'ware-card__price_old' : ''
            }`}
          >
            {price} ₽
          </span>
          {newPrice && (
            <span className="ware-card__price ware-card__price_new">
              {newPrice} ₽
            </span>
          )}
        </div>
      </footer>
    </article>
  );
}

export default WareCard;
