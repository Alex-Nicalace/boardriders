import { Swiper, SwiperSlide } from 'swiper/react';
import './PromoSlider.scss';
import Banner from '../ui/Banner';
import PromoBlock from '../PromoBlock';

import img1 from '../../assets/img/actions-slider/01.jpg';
import img2 from '../../assets/img/actions-slider/02.jpg';
import img3 from '../../assets/img/actions-slider/03.jpg';

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
];

type TPromoSliderProps = { className?: string };
function PromoSlider({ className = '' }: TPromoSliderProps): JSX.Element {
  return (
    <PromoBlock className={className}>
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
