import DualBanners from '../../components/DualBaners';
import LinksBrands from '../../components/LinksBrands';
import MainSlider from '../../components/MainSlider';
import Promotion from '../../components/Promotion';
import BlogsSlider from '../../components/BlogsSlider';
import JoinAndSubscrube from '../../components/JoinAndSubscrube/JoinAndSubscrube';
import Main from '../../components/Main';
import './MainPage.scss';
import SliderWareCards from '../../components/ui/SliderWareCards';

const PATH_NEW = '/src/assets/img/products-new/';
const NEW_PRODUCTS_DATA = [
  {
    wareId: '1',
    imgMain: PATH_NEW + '01.png',
    imgSecond: PATH_NEW + '01-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '2',
    imgMain: PATH_NEW + '02.png',
    imgSecond: PATH_NEW + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '3',
    imgMain: PATH_NEW + '03.png',
    imgSecond: PATH_NEW + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '4',
    imgMain: PATH_NEW + '04.png',
    imgSecond: PATH_NEW + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  // -----------
  {
    wareId: '5',
    imgMain: PATH_NEW + '01.png',
    imgSecond: PATH_NEW + '01-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '6',
    imgMain: PATH_NEW + '02.png',
    imgSecond: PATH_NEW + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
];

const PATH_POPULAR = '/src/assets/img/popular-collection/';
const POPULAR_PRODUCTS_DATA = [
  {
    wareId: '1',
    imgMain: PATH_POPULAR + '01.png',
    imgSecond: PATH_POPULAR + '01-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '2',
    imgMain: PATH_POPULAR + '02.png',
    imgSecond: PATH_POPULAR + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
  {
    wareId: '3',
    imgMain: PATH_POPULAR + '03.png',
    imgSecond: PATH_POPULAR + '03-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '4',
    imgMain: PATH_POPULAR + '04.png',
    imgSecond: PATH_POPULAR + '04-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  // -----------
  {
    wareId: '5',
    imgMain: PATH_POPULAR + '01.png',
    imgSecond: PATH_POPULAR + '01-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    to: '#',
  },
  {
    wareId: '6',
    imgMain: PATH_POPULAR + '02.png',
    imgSecond: PATH_POPULAR + '02-hover.png',
    title: 'LIB TECH',
    descr: 'Мужской Сноуборд',
    price: 34392,
    newPrice: 17392,
    discount: -50,
    to: '#',
  },
];

// interface IMainPageProps {}
function MainPage(): JSX.Element {
  return (
    <Main className="main-page">
      <MainSlider className="main-page__main-slider" />
      <LinksBrands className="main-page__links-brands" />
      <DualBanners className="main-page__dual-baners" />
      <SliderWareCards
        className="main-page__slider-ware"
        title="Новинки"
        wareData={NEW_PRODUCTS_DATA}
        moreTo="#"
      />
      <Promotion
        className="main-page__promotion"
        to="#"
        sources={[
          {
            media: '(min-width: 768px)',
            srcSet: '/src/assets/img/promotion/01.jpg',
          },
          {
            media: '(max-width: 767px)',
            srcSet: '/src/assets/img/promotion/01-small.jpg',
          },
        ]}
        img={{
          alt: 'promotion',
          src: '/src/assets/img/promotion/01-small.jpg',
        }}
      />
      <SliderWareCards
        className="main-page__slider-ware"
        title="DC Shoes популярное в коллекции"
        wareData={POPULAR_PRODUCTS_DATA}
        moreTo="#"
      />
      <BlogsSlider className="main-page__blogs-slider" />
      <JoinAndSubscrube className="main-page__join-and-subscrube" />
    </Main>
  );
}

export default MainPage;
