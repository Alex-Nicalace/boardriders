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

const PATH_BIG_IMG = './src/assets/img/gallery-preview/big-img/';
const PATH_SMALL_IMG = './src/assets/img/gallery-preview/small-img/';

const GALLARY_BIG = [
  '01.webp',
  '02.webp',
  '03.webp',
  '04.webp',
  '05.webp',
  '06.webp',
  '07.webp',
  '08.webp',
  '09.webp',
  '10.webp',
].map((name) => PATH_BIG_IMG + name);
const GALLARY_SMALL = [
  '01.jpg',
  '02.jpg',
  '03.jpg',
  '04.jpg',
  '05.jpg',
  '06.jpg',
  '07.jpg',
  '08.jpg',
  '09.jpg',
  '10.jpg',
].map((name) => PATH_SMALL_IMG + name);

type TGalleryPreviewProps = { className?: string };
function GalleryPreview({ className = '' }: TGalleryPreviewProps): JSX.Element {
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
          {GALLARY_SMALL.map((img) => (
            <SwiperSlide key={img} className="gallery-preview__thumbs-slide">
              <img
                className="gallery-preview__thumbs-img gallery-preview__img"
                src={img}
                alt=""
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
        {GALLARY_BIG.map((img) => (
          <SwiperSlide key={img} className="gallery-preview__main-slide">
            <img
              className="gallery-preview__main-img gallery-preview__img"
              src={img}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default GalleryPreview;
