import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import ProductCategoryLink from '../ProductCategoryLink';
import { ArrowLeftThinIcon, ArrowRightThinIcon } from '../ui/Icons';

import snowboardImg from '../../assets/img/product-categories-slider/snowboard.png';
import fastenersImg from '../../assets/img/product-categories-slider/fasteners.png';
import shoesImg from '../../assets/img/product-categories-slider/shoes.png';
import setsImg from '../../assets/img/product-categories-slider/sets.png';
import jacketsImg from '../../assets/img/product-categories-slider/jackets.png';
import pantsImg from '../../assets/img/product-categories-slider/pants.png';
import helmetsImg from '../../assets/img/product-categories-slider/helmets.png';
import glassesImg from '../../assets/img/product-categories-slider/glasses.png';
import glovesImg from '../../assets/img/product-categories-slider/gloves.png';

import './ProductCategoriesSlider.scss';

const SLIDE_DATA = [
  {
    img: snowboardImg,
    title: 'Сноуборды',
    to: '#',
  },
  {
    img: fastenersImg,
    title: 'Крепеж',
    to: '#',
  },
  {
    img: shoesImg,
    title: 'Обувь',
    to: '#',
  },
  {
    img: setsImg,
    title: 'Наборы',
    to: '#',
  },
  {
    img: jacketsImg,
    title: 'Куртки',
    to: '#',
  },
  {
    img: pantsImg,
    title: 'Штаны',
    to: '#',
  },
  {
    img: helmetsImg,
    title: 'Шлемы',
    to: '#',
  },
  {
    img: glassesImg,
    title: 'Очки',
    to: '#',
  },
  {
    img: glovesImg,
    title: 'Перчатки',
    to: '#',
  },
];

type TProductCategoriesSliderProps = { className?: string };
function ProductCategoriesSlider({
  className: cllassName = '',
}: TProductCategoriesSliderProps): JSX.Element {
  return (
    <div className={`product-categories-slider ${cllassName}`}>
      <div className="product-categories-slider__container">
        <Swiper
          className="product-categories-slider__slider"
          wrapperClass="product-categories-slider__wrapper"
          modules={[Navigation]}
          spaceBetween={31}
          slidesPerView={9}
          navigation={{
            prevEl: '.product-categories-slider__slider-btn_left',
            nextEl: '.product-categories-slider__slider-btn_right',
          }}
        >
          {SLIDE_DATA.map(({ img, title, to }) => (
            <SwiperSlide className="product-categories-slider__slide" key={img}>
              <ProductCategoryLink img={img} title={title} to={to} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="product-categories-slider__slider-btn product-categories-slider__slider-btn_left">
          <ArrowLeftThinIcon />
        </button>
        <button className="product-categories-slider__slider-btn product-categories-slider__slider-btn_right">
          <ArrowRightThinIcon />
        </button>
      </div>
    </div>
  );
}

export default ProductCategoriesSlider;
