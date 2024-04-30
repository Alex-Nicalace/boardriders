import './ProductPage.scss';
import Main from '../../components/Main';
import Product from '../../components/Product';
import Breadcrumbs, { TBreadcrumbsData } from '../../components/ui/Breadcrumbs';
import Steps from '../../components/ui/Steps';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import SliderWareCards from '../../components/ui/SliderWareCards';

const BREADCRUMBS: TBreadcrumbsData = [
  {
    to: '/',
    title: 'Главная',
  },
  {
    to: '/catalog/man',
    title: 'Мужчинам',
  },
  {
    to: '/catalog/man/snowboard',
    title: 'Сноуборд',
  },
  {
    to: '/catalog/man/snowboards',
    title: 'Сноуборды',
  },
  {
    title: 'Сноуборд GNU Asym Carbon Credit Btx Multicolor',
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

// type TProductPageProps = { }
function ProductPage(/*{ }: TProductPageProps*/): JSX.Element {
  const { isLessTablet } = useScreenWidth();

  return (
    <div className="product-page">
      {!isLessTablet && (
        <Breadcrumbs
          className="product-page__breadcrumbs"
          data={BREADCRUMBS}
          withContainer
        />
      )}
      {!isLessTablet && (
        <div className="product-page__steps product-page__container">
          <Steps />
        </div>
      )}
      <Main className="product-page__main">
        <Product className="product-page__product" />
      </Main>
      <section className="product-page__box-slider-ware">
        <h2 className="product-page__title-slider product-page__container">
          C этим товаром смотрят
        </h2>
        <SliderWareCards
          className="product-page__slider-ware"
          wareData={POPULAR_PRODUCTS_DATA}
        />
      </section>
      <section className="product-page__box-slider-ware">
        <h2 className="product-page__title-slider product-page__container">
          C этим товаром рекомендуем
        </h2>
        <SliderWareCards
          className="product-page__slider-ware"
          wareData={POPULAR_PRODUCTS_DATA}
        />
      </section>
    </div>
  );
}

export default ProductPage;
