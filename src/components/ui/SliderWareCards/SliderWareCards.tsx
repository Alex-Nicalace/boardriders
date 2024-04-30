import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';

import './SliderWareCards.scss';
import WareCard, { IWareData } from '../WareCard';
import { ArrowLeftIcon, ArrowRightIcon } from '../Icons';
import useMatchMedia from '../../../hooks/useMatchMedia';

const MEDIAQUERY = ['(max-width: 573px)'];

type TSliderWareCardsProps = {
  wareData: IWareData[];
  className?: string;
};
function SliderWareCards({
  wareData,
  className = '',
}: TSliderWareCardsProps): JSX.Element {
  const [isSmall] = useMatchMedia(MEDIAQUERY);

  return (
    <div className={`slider-ware-cards ${className}`}>
      <div className="slider-ware-cards__container">
        <div className="slider-ware-cards__outer-wrap-slider">
          <Swiper
            key={+isSmall}
            observer={true}
            className="slider-ware-cards__slider"
            wrapperClass="slider-ware-cards__wrapper-slider"
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView="auto"
            breakpoints={{
              573: {
                spaceBetween: 25,
                slidesPerView: 2,
                navigation: {
                  prevEl: '.slider-ware-cards__button_prev',
                  nextEl: '.slider-ware-cards__button_next',
                },
              },
              768: {
                spaceBetween: 25,
                slidesPerView: 3,
                navigation: {
                  prevEl: '.slider-ware-cards__button_prev',
                  nextEl: '.slider-ware-cards__button_next',
                },
              },
              1100: {
                spaceBetween: 25,
                slidesPerView: 4,
                navigation: {
                  prevEl: '.slider-ware-cards__button_prev',
                  nextEl: '.slider-ware-cards__button_next',
                },
              },
            }}
          >
            {wareData.map((data) => (
              <SwiperSlide
                className="slider-ware-cards__slide"
                key={data.wareId}
              >
                <WareCard wareDate={data} />
              </SwiperSlide>
            ))}
          </Swiper>
          {!isSmall && (
            <>
              <button className="slider-ware-cards__button slider-ware-cards__button_prev">
                <ArrowLeftIcon />
              </button>
              <button className="slider-ware-cards__button slider-ware-cards__button_next">
                <ArrowRightIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SliderWareCards;
