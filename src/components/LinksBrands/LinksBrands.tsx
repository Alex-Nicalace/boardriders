import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import 'swiper/scss';
import './LinksBrands.scss';

interface ILinksBrandsProps {
  className?: string;
  data: {
    iconUrl: string;
    to: string;
  }[];
}
function LinksBrands({ className, data }: ILinksBrandsProps): JSX.Element {
  return (
    <div className={['links-brands', className].filter(Boolean).join(' ')}>
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
          {data.map(({ iconUrl, to }) => (
            <SwiperSlide key={iconUrl} className="links-brands__slide">
              <Link className="links-brands__link" to={to}>
                <img
                  className="links-brands__img"
                  src={iconUrl}
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
