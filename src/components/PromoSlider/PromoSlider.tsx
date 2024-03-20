import { Swiper, SwiperSlide } from 'swiper/react';
import Banner from '../ui/Banner';
import './PromoSlider.scss';

import img1 from '../../assets/img/actions-slider/01.jpg';
import img2 from '../../assets/img/actions-slider/02.jpg';
import img3 from '../../assets/img/actions-slider/03.jpg';
import PromoBlock from '../PromoBlock';

const BANNERS_DATA = [
  {
    img: img1,
    to: '#',
    title: 'Название акции №1',
  },
  {
    img: img2,
    to: '#',
    title: 'Название акции №2',
  },
  {
    img: img3,
    to: '#',
    title: 'Название акции №3',
  },
  {
    img: img1,
    to: '#',
    title: 'Название акции №4',
  },
  {
    img: img2,
    to: '#',
    title: 'Название акции №5',
  },
  {
    img: img3,
    to: '#',
    title: 'Название акции №6',
  },
];

// type TPromoSliderProps = {};
function PromoSlider(): JSX.Element {
  return (
    <PromoBlock>
      <Swiper
        className="promo-slider"
        wrapperClass="promo-slider__wrapper"
        slidesPerView="auto"
        spaceBetween={10}
        breakpoints={{
          767.98: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          991.98: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
        }}
      >
        {BANNERS_DATA.map(({ img, to, title }) => (
          <SwiperSlide key={img} className="promo-slider__slide">
            <Banner img={img} title={title} to={to} kind="second" />
          </SwiperSlide>
        ))}
      </Swiper>
    </PromoBlock>
  );
}

export default PromoSlider;
