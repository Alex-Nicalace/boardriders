import './Product.scss';
import GalleryPreview from '../GalleryPreview';
import Rating from '../../component-library/Rating';
import {
  DeliveryIcon,
  LocationUnderlineIcon,
  ShopIcon,
  StarIcon,
} from '../ui/Icons';
import { Link } from 'react-router-dom';
import Favorite from '../ui/Favorite';
import Price from '../Price';
import ColorChoise from '../ColorChoise';
import SizeChoise from '../SizeChoise';
import Button from '../ui/Button';
import ListIconInfo from '../ListIconInfo';
import { TProductProps } from './Product.types';
import Spinner from '../Spinner';
import Empty from '../Empty';

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

const DELIVERY_OPTIONS = [
  {
    iconElement: <DeliveryIcon />,
    top: 'Курьером по вашему адресу',
    bottom: (
      <>
        Сегодня / <strong>Бесплатно</strong>
      </>
    ),
  },
  {
    iconElement: <ShopIcon />,
    top: (
      <>
        Забрать в одном из <Link to={''}>9 магазинов</Link>
      </>
    ),
    bottom: 'Сегодня / 500 рублей',
  },
  {
    iconElement: <ShopIcon />,
    top: (
      <>
        Заказать доставку в один из <Link to={''}>15 магазинов</Link>
      </>
    ),
    bottom: (
      <>
        20 апреля / <strong>Бесплатно</strong>
      </>
    ),
  },
  {
    iconElement: <LocationUnderlineIcon />,
    top: (
      <>
        Забрать из <Link to={''}>пункта самовывоза с примеркой</Link>
      </>
    ),
    bottom: (
      <>
        20 апреля / <strong>Бесплатно</strong>
      </>
    ),
  },
];

function Product({
  className,
  data,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}: TProductProps): JSX.Element {
  const {
    description,
    detailedDescription,
    price,
    oldPrice,
    discount,
    manufacturerSKU,
    iconBrandUrl,
    rating,
    reviewCount,
    colorList,
    sizeList,
    galleryPreview,
  } = data;

  return (
    <section className={['product', className].filter(Boolean).join(' ')}>
      <div className="product__container">
        <div className="product__box">
          <div className="product__article">
            Артикул производителя: {manufacturerSKU}
          </div>
          <div className="product__info">
            <div className="product__brand-logo">
              <img
                src={iconBrandUrl}
                loading="lazy"
                alt="Логотип производителя"
              />
            </div>
            <Rating
              className="product__rating"
              rating={rating || 0}
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
              {reviewCount} отзыва
            </Link>
            <Favorite className="product__favorite" isFramed />
          </div>
          <h1 className="product__title">{description}</h1>
          <Price
            className="product__price"
            price={price}
            oldPrice={oldPrice}
            discount={discount}
          />
          <div className="product__options">
            {colorList && (
              <ColorChoise
                className="product__color"
                name="color"
                items={colorList}
                value={selectedColor}
                onChange={onColorChange}
              />
            )}
            {sizeList && (
              <SizeChoise
                className="product__size"
                name="size"
                items={sizeList}
                value={selectedSize}
                onChange={onSizeChange}
              />
            )}
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
          <ListIconInfo
            className="product__delivery"
            title={
              <>
                Варианты доставки в: <Link to={''}>г. Москва</Link>
              </>
            }
            items={DELIVERY_OPTIONS}
          />
        </div>
        {galleryPreview.isLoading && (
          <Spinner className="product__gallery product__spinner" />
        )}
        {!galleryPreview.isLoading && galleryPreview.images.length === 0 && (
          <Empty
            className="product__gallery product__empty"
            resource="данных для Галереи"
          />
        )}
        {!galleryPreview.isLoading && galleryPreview.images.length > 0 && (
          <GalleryPreview
            className="product__gallery"
            data={galleryPreview.images}
          />
        )}
        <div className="product__parameters product-params">
          <h2 className="product-params__title">Характеристики</h2>
          <p className="product-params__text">{detailedDescription}</p>
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
