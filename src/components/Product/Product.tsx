import './Product.scss';
import GalleryPreview from '../GalleryPreview';
import Rating from '../../component-library/Rating';
import { StarIcon } from '../ui/Icons';
import { Link } from 'react-router-dom';
import Favorite from '../ui/Favorite';
import Price from '../Price';
import ColorChoise from '../ColorChoise';
import SizeChoise from '../SizeChoise';
import Button from '../ui/Button';

const PATH_PARAMS_IMG = './src/assets/img/product-params/';
const PARAMS_IMG = ['01.png', '02.png'].map((name) => PATH_PARAMS_IMG + name);

const PRODUCT_PARAMS = [
  {
    title: 'Вес',
    description: '540 грамм',
  },
  {
    title: 'Стиль катания',
    description: 'Touring',
  },
  {
    title: 'Stiffness',
    description: '8',
  },
  {
    title: 'Base',
    description: '540 грамм',
  },
  {
    title: 'Вес1',
    description: '540 грамм',
  },
  {
    title: 'Стиль катания1',
    description: 'Touring',
  },
  {
    title: 'Stiffness1',
    description: '8',
  },
  {
    title: 'Base1',
    description: '540 грамм',
  },
  {
    title: 'Стиль катания2',
    description: 'Touring',
  },
  {
    title: 'Stiffness2',
    description: '8',
  },
];

const BRAND_IMG = './src/assets/icons/brands/03.png';

const COLORS = {
  name: 'color',
  items: [
    {
      color: '#000000',
      value: 'black',
    },
    {
      color: 'green',
      value: 'green',
    },
    {
      color: '#FF0000',
      value: 'red',
    },
    {
      color: 'blue',
      value: 'blue',
    },
  ],
};

const SIZES = {
  name: 'size',
  items: [
    {
      size: 32,
    },
    {
      size: 32.5,
      isEnded: true,
    },
    {
      size: 33,
    },
    {
      size: 33.5,
    },
    {
      size: 34,
      isEnded: true,
    },
    {
      size: 34.5,
    },
    {
      size: 35,
    },
  ],
};

type TProductProps = { className?: string };
function Product({ className }: TProductProps): JSX.Element {
  return (
    <section className={`product ${className}`}>
      <div className="product__container">
        <div className="product__box">
          <div className="product__article">Артикул производителя: 19SN003</div>
          <div className="product__info">
            <div className="product__brand-logo">
              <img src={BRAND_IMG} loading="lazy" alt="Логотип производителя" />
            </div>
            <Rating
              className="product__rating"
              rating={4}
              iconActiveElement={<StarIcon fill="#EB5757" stroke="#EB5757" />}
              iconUnactiveElement={
                <StarIcon fill="transparent" stroke="#000" />
              }
              size="20px"
              gap="10px"
              isShowValue={false}
              disabled
            />
            <Link className="product__reviews" to="#">
              24 отзыва
            </Link>
            <Favorite className="product__favorite" isFramed />
          </div>
          <h1 className="product__title">
            Сноуборд GNU Asym Carbon Credit Btx Multicolor
          </h1>
          <Price
            className="product__price"
            price={59395}
            oldPrice={134392}
            discount={-50}
          />
          <div className="product__options">
            <ColorChoise className="product__color" {...COLORS} />
            <SizeChoise className="product__size" {...SIZES} />
            <div className="product__buttons">
              <Button
                className="product__btn-add-card"
                color="secondary"
                fullWidth
              >
                Добавить в корзину
              </Button>
              <Button
                className="product__btn-pickup"
                color="secondary"
                variant="outlined"
                fullWidth
              >
                Забрать в магазине
              </Button>
            </div>
          </div>
          <div className="product__delivery">delivery</div>
        </div>
        <GalleryPreview className="product__gallery" />
        <div className="product__parameters product-params">
          <h2 className="product-params__title">Характеристики</h2>
          <p className="product-params__text">
            The Old Skool has never been lacking in attitude. It brought the
            dawn of the classic Vans side stripe that has developed into a
            status symbol of tradition and skate stature. Aside from all that
            personality, they have lasted as long as they have because of their
            ability to perform on a skateboard, and to last, and last. Though
            they now share the ranks with many new Vans styles with their own
            innovations, the Old Skools aren't going anywhere.
          </p>
          <ul className="product-params__list-img">
            {PARAMS_IMG.map((img) => (
              <li className="product-params__item-img" key={img}>
                <img src={img} alt="" />
              </li>
            ))}
          </ul>
          <div className="product-params__wrap-list">
            <dl className="product-params__list">
              {PRODUCT_PARAMS.map((param) => (
                <div className="product-params__item" key={param.title}>
                  <dt className="product-params__term">{param.title}</dt>
                  <dd className="product-params__description">
                    {param.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
