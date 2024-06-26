import './ProductPage.scss';
import Product from '../../components/Product';
import Breadcrumbs, { TBreadcrumbsData } from '../../components/ui/Breadcrumbs';
import Steps from '../../components/ui/Steps';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import SliderWareCards from '../../components/ui/SliderWareCards';
import CustomerReviews from '../../components/CustomerReviews';
import PageContent from '../../components/PageContent';

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
    <PageContent className="product-page">
      {!isLessTablet && (
        <Breadcrumbs
          className="product-page__breadcrumbs"
          data={BREADCRUMBS}
          modificator="independent"
        />
      )}
      {!isLessTablet && (
        <div className="product-page__steps product-page__container">
          <Steps />
        </div>
      )}
      <main className="product-page__main">
        <Product className="product-page__product" />
      </main>
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
      <CustomerReviews className="product-page__customer-reviews" />
    </PageContent>
  );
}

export default ProductPage;
