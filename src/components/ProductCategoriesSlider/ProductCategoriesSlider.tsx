import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import './ProductCategoriesSlider.scss';
import ProductCategoryLink from '../ProductCategoryLink';
import { ArrowLeftThinIcon, ArrowRightThinIcon } from '../ui/Icons';
import { TProductCategoriesSliderProps } from './ProductCategoriesSlider.types';

function ProductCategoriesSlider({
  className,
  data,
}: TProductCategoriesSliderProps): JSX.Element {
  return (
    <div
      className={['product-categories-slider', className]
        .filter(Boolean)
        .join(' ')}
    >
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
          {data.map(({ imageUrl, title, to }) => (
            <SwiperSlide className="product-categories-slider__slide" key={to}>
              <ProductCategoryLink img={imageUrl} title={title} to={to} />
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
