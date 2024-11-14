import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/scss';
import './MainSlider.scss';
import { MainSliderButtons } from './MainSliderButtons';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import img1 from '../../assets/img/main-slider/01.jpg';
import img2 from '../../assets/img/main-slider/02.jpg';
import img3 from '../../assets/img/main-slider/03.jpg';
import img4 from '../../assets/img/main-slider/04.webp';
import imgSmall2 from '../../assets/img/main-slider/02-small.jpg';

const DATA_SLIDES = [
  {
    img: img1,
    to: '#',
    title: 'Lib Tech',
  },
  {
    img: img2,
    imgSmall: imgSmall2,
    to: '#',
    title: 'Winter Sale до -70%',
  },
  {
    img: img3,
    to: '#',
    title: 'Winter Sale до -30%',
  },
  {
    img: img4,
    to: '#',
    title: 'Winter Sale до -20%',
  },
];

interface IMainSliderProps {
  className?: string;
}
function MainSlider({ className = '' }: IMainSliderProps): JSX.Element {
  const { isOverLarge, isLessMobile } = useScreenWidth();

  return (
    <section className={`${className} main-slider`}>
      <div className="main-slider__container">
        <Swiper
          key={`${Number(isOverLarge)}${Number(isLessMobile)}`}
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
                    srcSet={slideData.imgSmall || slideData.img}
                  />
                  <img
                    className="main-slider__img"
                    src={slideData.img}
                    alt="изображение слайда"
                  />
                </picture>
                {slideData.title && (
                  <span className="main-slider__title">{slideData.title}</span>
                )}
              </Link>
            </SwiperSlide>
          ))}
          {!isOverLarge && !isLessMobile && <MainSliderButtons />}
        </Swiper>
        {isOverLarge && <MainSliderButtons />}
      </div>
    </section>
  );
}

export default MainSlider;
