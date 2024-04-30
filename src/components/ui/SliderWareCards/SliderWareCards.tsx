import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';

import './SliderWareCards.scss';
import WareCard, { IWareData } from '../WareCard';
import Button from '../Button';
import { ArrowLeftIcon, ArrowRightIcon } from '../Icons';
import useMatchMedia from '../../../hooks/useMatchMedia';
import Title from '../Title';

const MEDIAQUERY = ['(max-width: 573px)'];

type TSliderWareCardsProps = {
  title: string;
  wareData: IWareData[];
  moreTo?: string;
  className?: string;
};
function SliderWareCards({
  title,
  wareData,
  moreTo,
  className = '',
}: TSliderWareCardsProps): JSX.Element {
  const [isSmall] = useMatchMedia(MEDIAQUERY);

  return (
    <section className={`${className} slider-ware-cards`}>
      <div className="slider-ware-cards__container">
        <Title className="slider-ware-cards__title" kind="h1-32-h2-21" as="h2">
          {title}
        </Title>
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
        {moreTo && (
          <div className="slider-ware-cards__button-more">
            <Button to={moreTo}>Показать больше</Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default SliderWareCards;
