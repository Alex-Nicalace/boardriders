import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import BlogCard from '../ui/BlogCard';

import './BlogsSlider.scss';
import ButtonSlider from '../ui/ButtonSlider';

const DATA_SLIDER = [
  {
    title: 'Очень преочень длинное название блога',
    contentElement: (
      <>
        <p>
          Меня не спрашивали, а надо было спросить, что означает имя Заратустры
          именно в моих устах — в устах первого имморалиста: ведь то, в чём
          состоит неслыханная уникальность этого перса в истории, являет собою
          противоположность как раз этому.
        </p>
        <p>
          Меня не спрашивали, а надо было спросить, что означает имя Заратустры
          именно в моих устах — в устах первого имморалиста: ведь то, в чём
          состоит неслыханная уникальность этого перса в истории, являет собою
          противоположность как раз этому...
        </p>
      </>
    ),
    image: {
      sources: [
        {
          media: '(min-width: 768px)',
          srcSet: '/src/assets/img/blogs-slider/01.jpg',
        },
        {
          media: '(max-width: 767px)',
          srcSet: '/src/assets/img/blogs-slider/01.jpg',
        },
      ],
      img: {
        alt: 'image of blog',
        src: '/src/assets/img/blogs-slider/01.jpg',
        className: 'blog-card__img',
      },
    },
    readMorePath: '#',
    allBlogsPath: '#',
  },
  {
    title: 'Гайд по сноу-технологиям',
    contentElement: (
      <>
        <p>
          Что означает 15K на куртке, чем отличаются технологии WarmFlight и
          Dryflight и другие нюансы при выборе экипировки.
        </p>
      </>
    ),
    image: {
      sources: [
        {
          media: '(min-width: 768px)',
          srcSet: '/src/assets/img/blogs-slider/02.jpg',
        },
        {
          media: '(max-width: 767px)',
          srcSet: '/src/assets/img/blogs-slider/02.jpg',
        },
      ],
      img: {
        alt: 'image of blog',
        src: '/src/assets/img/blogs-slider/02.jpg',
        className: 'blog-card__img',
      },
    },
    readMorePath: '#',
    allBlogsPath: '#',
  },
  {
    title: 'Как ухаживать за мембранной одеждой GORE-TEX',
    contentElement: (
      <>
        <p>Подробный гайд об уходе за сноуборд-экипом</p>
      </>
    ),
    image: {
      sources: [
        {
          media: '(min-width: 768px)',
          srcSet: '/src/assets/img/blogs-slider/03.jpg',
        },
        {
          media: '(max-width: 767px)',
          srcSet: '/src/assets/img/blogs-slider/03.jpg',
        },
      ],
      img: {
        alt: 'image of blog',
        src: '/src/assets/img/blogs-slider/03.jpg',
        className: 'blog-card__img',
      },
    },
    readMorePath: '#',
    allBlogsPath: '#',
  },
];
type TBlogsSliderProps = { className?: string };
function BlogsSlider({ className = '' }: TBlogsSliderProps): JSX.Element {
  return (
    <Swiper
      className={`${className} blogs-slider`}
      wrapperClass="blogs-slider__wrapper-slider"
      modules={[Navigation]}
      // spaceBetween={50}
      slidesPerView="auto"
      // autoHeight
      // navigation
      // или указать селекторы элеметов навигации
      navigation={{
        prevEl: '.blogs-slider__button_prev',
        nextEl: '.blogs-slider__button_next',
      }}
    >
      {DATA_SLIDER.map((item) => (
        <SwiperSlide key={item.title} className="blogs-slider__slide">
          <BlogCard {...item} />
        </SwiperSlide>
      ))}
      <ButtonSlider
        direction="left"
        className="blogs-slider__button blogs-slider__button_prev"
      />
      <ButtonSlider
        direction="right"
        className="blogs-slider__button blogs-slider__button_next"
      />
    </Swiper>
  );
}

export default BlogsSlider;
