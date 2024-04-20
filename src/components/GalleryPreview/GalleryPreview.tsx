import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Keyboard, Thumbs, Scrollbar } from 'swiper/modules';
import './GalleryPreview.scss';
import 'swiper/scss/scrollbar';
import 'swiper/scss/thumbs';

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

  return (
    <div className={`gallery-preview ${className}`}>
      {/* Thumbs slider */}
      <Swiper
        className="gallery-preview__thumbs-slider"
        wrapperClass="gallery-preview__thumbs-slider-wrapper"
        modules={[Thumbs, Keyboard, Scrollbar]}
        watchSlidesProgress // добавляет класс swiper-slide-thumb-active
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        keyboard
        direction="vertical"
        scrollbar
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

      {/* Main slider */}
      <Swiper
        className="gallery-preview__main-slider"
        modules={[Thumbs, Keyboard]}
        keyboard
        // thumbs={{ swiper: thumbsSwiper }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
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
