import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';

import './Products.scss';
import WareCard from '../WareCard';
import Button from '../Button';
import { ArrowLeftIcon, ArrowRightIcon } from '../Icons';
import useMatchMedia from '../../../hooks/useMatchMedia';

interface IWareData {
  wareId: string;
  imgMain: string;
  imgSecond?: string;
  title: string;
  descr: string;
  price: number;
  newPrice?: number;
  discount?: number;
  to: string;
}

const MEDIAQUERY = ['(max-width: 573px)'];

interface IProductsProps {
  title: string;
  productsData: IWareData[];
  moreTo?: string;
}
function Products({
  title,
  productsData,
  moreTo,
}: IProductsProps): JSX.Element {
  const [isSmall] = useMatchMedia(MEDIAQUERY);

  return (
    <section className="products">
      <div className="products__container">
        <h2 className="products__title">{title}</h2>
        <div className="products__outer-wrap-slider">
          <Swiper
            key={+isSmall}
            observer={true}
            className="products__slider"
            wrapperClass="products__wrapper-slider"
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView="auto"
            breakpoints={{
              573: {
                spaceBetween: 25,
                slidesPerView: 2,
                navigation: {
                  prevEl: '.products__button_prev',
                  nextEl: '.products__button_next',
                },
              },
              768: {
                spaceBetween: 25,
                slidesPerView: 3,
                navigation: {
                  prevEl: '.products__button_prev',
                  nextEl: '.products__button_next',
                },
              },
              1100: {
                spaceBetween: 25,
                slidesPerView: 4,
                navigation: {
                  prevEl: '.products__button_prev',
                  nextEl: '.products__button_next',
                },
              },
            }}
          >
            {productsData.map((data) => (
              <SwiperSlide className="products__slide" key={data.wareId}>
                <WareCard wareDate={data} />
              </SwiperSlide>
            ))}
          </Swiper>
          {!isSmall && (
            <>
              <button className="products__button products__button_prev">
                <ArrowLeftIcon />
              </button>
              <button className="products__button products__button_next">
                <ArrowRightIcon />
              </button>
            </>
          )}
        </div>
        <div className="products__button-more">
          <Button to={moreTo}>Показать больше</Button>
        </div>
      </div>
    </section>
  );
}

export default Products;
