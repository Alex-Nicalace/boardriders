import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';

import './Products.scss';
import WareCard from '../WareCard';
import Button from '../ui/Button';
import { ArrowLeftIcon, ArrowRightIcon } from '../ui/Icons';
import useMatchMedia from '../../hooks/useMatchMedia';

const PATH = '/src/assets/img/products-new/';
const PRODUCTS_DATA = [
  {
    wareId: '1',
    imgMain: PATH + '01.png',
    imgSecond: PATH + '01-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '2',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '3',
    imgMain: PATH + '03.png',
    imgSecond: PATH + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '4',
    imgMain: PATH + '04.png',
    imgSecond: PATH + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  // -----------
  {
    wareId: '5',
    imgMain: PATH + '01.png',
    imgSecond: PATH + '01-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '6',
    imgMain: PATH + '02.png',
    imgSecond: PATH + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
];
// interface IProductsProps {}
function Products(): JSX.Element {
  const [isSmall] = useMatchMedia(['(max-width: 573px)']);

  return (
    <section className="products">
      <div className="products__container">
        <h2 className="products__title">Новинки</h2>
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
            {PRODUCTS_DATA.map((data) => (
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
          <Button>Показать больше</Button>
        </div>
      </div>
    </section>
  );
}

export default Products;
