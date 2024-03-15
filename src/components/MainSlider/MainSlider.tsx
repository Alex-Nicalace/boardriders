import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/scss';
import './MainSlider.scss';
import useMatchMedia from '../../hooks/useMatchMedia';
import { MainSliderButtons } from './MainSliderButtons';

const PATH = '/src/assets/img/main-slider/';
const DATA_SLIDES = [
  {
    img: '01.jpg',
    to: '#',
    title: 'Lib Tech',
  },
  {
    img: '02.jpg',
    imgSmall: '02-small.jpg',
    to: '#',
    title: 'Winter Sale до -70%',
  },
  {
    img: '03.jpg',
    to: '#',
    title: 'Winter Sale до -30%',
  },
  {
    img: '04.webp',
    to: '#',
    title: 'Winter Sale до -20%',
  },
];

const MEDIAQUERY = [`(min-width: 1500px)`, `(max-width: 767.98px)`];

interface IMainSliderProps {
  className?: string;
}
function MainSlider({ className = '' }: IMainSliderProps): JSX.Element {
  const [isLarge, isMobile] = useMatchMedia(MEDIAQUERY);

  return (
    <section className={`${className} main-slider`}>
      <div className="main-slider__container">
        <Swiper
          key={`${Number(isLarge)}${Number(isMobile)}`}
          className="main-slider__sliders"
          wrapperClass="main-slider__wrapper"
          modules={[Navigation, Pagination]}
          observer={true}
          initialSlide={1}
          spaceBetween={10}
          slidesPerView="auto"
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 1,
              navigation: {
                prevEl: '.main-slider__button_prev',
                nextEl: '.main-slider__button_next',
              },
              pagination: false,
              spaceBetween: 25,
            },
          }}
        >
          {DATA_SLIDES.map((slideData) => (
            <SwiperSlide key={slideData.img} className="main-slider__slide">
              <Link className="main-slider__link" to={slideData.to}>
                <picture>
                  <source
                    media="(max-width: 991px)"
                    srcSet={PATH + (slideData.imgSmall || slideData.img)}
                  />
                  <img
                    className="main-slider__img"
                    src={PATH + slideData.img}
                    alt="изображение слайда"
                  />
                </picture>
                {slideData.title && (
                  <span className="main-slider__title">{slideData.title}</span>
                )}
              </Link>
            </SwiperSlide>
          ))}
          {!isLarge && !isMobile && <MainSliderButtons />}
        </Swiper>
        {isLarge && <MainSliderButtons />}
      </div>
    </section>
  );
}

export default MainSlider;
