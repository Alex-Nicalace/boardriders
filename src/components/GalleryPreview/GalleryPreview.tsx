import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import {
  Keyboard,
  Thumbs,
  Scrollbar,
  Mousewheel,
  Pagination,
} from 'swiper/modules';
import { useScreenWidth } from '../../Context/useScreenWidthContext';

import './GalleryPreview.scss';

import 'swiper/scss/scrollbar';
import 'swiper/scss/thumbs';
import 'swiper/scss/pagination';
import { ImageSizes } from '../../utils/types';

type TGalleryPreviewProps = { className?: string; data: string[] };
function GalleryPreview({
  className,
  data,
}: TGalleryPreviewProps): JSX.Element {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const { isLessTablet } = useScreenWidth();

  return (
    <div className={`gallery-preview ${className}`}>
      {/* Thumbs slider */}
      {!isLessTablet && (
        <Swiper
          className="gallery-preview__thumbs-slider"
          wrapperClass="gallery-preview__thumbs-slider-wrapper"
          modules={[Thumbs, Keyboard, Scrollbar, Mousewheel]}
          watchSlidesProgress // добавляет класс swiper-slide-thumb-active
          onSwiper={setThumbsSwiper}
          slidesPerView="auto"
          keyboard
          direction="vertical"
          scrollbar
          mousewheel={true} // прокрутка колесом мыши, модуль Mousewheel
        >
          {data.map((url) => (
            <SwiperSlide key={url} className="gallery-preview__thumbs-slide">
              <img
                className="gallery-preview__thumbs-img gallery-preview__img"
                src={`${url}${ImageSizes.Thumbnail}`}
                alt="Фото эскиза товара"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Main slider */}
      <Swiper
        className="gallery-preview__main-slider"
        wrapperClass="gallery-preview__main-slider-wrapper"
        modules={[Thumbs, Keyboard, Pagination]}
        keyboard
        // thumbs={{ swiper: thumbsSwiper }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          767.98: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          991.98: {
            slidesPerView: 'auto',
            pagination: false,
            spaceBetween: 0,
          },
        }}
      >
        {data.map((url) => (
          <SwiperSlide key={url} className="gallery-preview__main-slide">
            <img
              className="gallery-preview__main-img gallery-preview__img"
              src={`${url}${ImageSizes.ActiveGallary}`}
              alt="Фото галереи"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default GalleryPreview;
