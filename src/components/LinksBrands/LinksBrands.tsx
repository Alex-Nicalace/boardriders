import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import 'swiper/scss';
import './LinksBrands.scss';

const PATH = '/src/assets/icons/brands/';
const DATA_SLIDES = [
  {
    img: '01.png',
    to: '#',
  },
  {
    img: '02.png',
    to: '#',
  },
  {
    img: '03.png',
    to: '#',
  },
  {
    img: '04.png',
    to: '#',
  },
  {
    img: '05.png',
    to: '#',
  },
  {
    img: '06.png',
    to: '#',
  },
  {
    img: '07.png',
    to: '#',
  },
  {
    img: '08.png',
    to: '#',
  },
  {
    img: '09.png',
    to: '#',
  },
  {
    img: '10.png',
    to: '#',
  },
];

interface ILinksBrandsProps {
  className?: string;
}
function LinksBrands({ className = '' }: ILinksBrandsProps): JSX.Element {
  return (
    <div className={`${className} links-brands`}>
      <div className="links-brands__container">
        <Swiper
          className="links-brands__slider"
          wrapperClass="links-brands__wrapper"
          slidesPerView={6}
          centerInsufficientSlides={true}
          breakpoints={{
            991.98: {
              slidesPerView: 10,
            },
          }}
        >
          {DATA_SLIDES.map(({ img, to }) => (
            <SwiperSlide key={img} className="links-brands__slide">
              <Link className="links-brands__link" to={to}>
                <img
                  className="links-brands__img"
                  src={PATH + img}
                  alt="логотип бренда"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default LinksBrands;
