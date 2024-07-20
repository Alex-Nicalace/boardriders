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
    id: 1,
    imgMainUrl: PATH_POPULAR + '01.png',
    imgSecondUrl: PATH_POPULAR + '01-hover.png',
    name: 'LIB TECH',
    description: 'Мужской Сноуборд',
    price: 17392,
    oldPrice: 34392,
    discount: -50,
  },
  {
    id: 2,
    imgMainUrl: PATH_POPULAR + '02.png',
    imgSecondUrl: PATH_POPULAR + '02-hover.png',
    name: 'LIB TECH',
    description: 'Мужской Сноуборд',
    price: 17392,
    oldPrice: 34392,
    discount: -50,
  },
  {
    id: 3,
    imgMainUrl: PATH_POPULAR + '03.png',
    imgSecondUrl: PATH_POPULAR + '03-hover.png',
    name: 'LIB TECH',
    description: 'Мужской Сноуборд',
    price: 34392,
    oldPrice: null,
    discount: null,
  },
  {
    id: 4,
    imgMainUrl: PATH_POPULAR + '04.png',
    imgSecondUrl: PATH_POPULAR + '04-hover.png',
    name: 'LIB TECH',
    description: 'Мужской Сноуборд',
    price: 34392,
    oldPrice: null,
    discount: null,
  },
  // -----------
  {
    id: 5,
    imgMainUrl: PATH_POPULAR + '01.png',
    imgSecondUrl: PATH_POPULAR + '01-hover.png',
    name: 'LIB TECH',
    description: 'Мужской Сноуборд',
    price: 34392,
    oldPrice: null,
    discount: null,
  },
  {
    id: 6,
    imgMainUrl: PATH_POPULAR + '02.png',
    imgSecondUrl: PATH_POPULAR + '02-hover.png',
    name: 'LIB TECH',
    description: 'Мужской Сноуборд',
    price: 17392,
    oldPrice: 34392,
    discount: -50,
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
          data={POPULAR_PRODUCTS_DATA}
        />
      </section>
      <section className="product-page__box-slider-ware">
        <h2 className="product-page__title-slider product-page__container">
          C этим товаром рекомендуем
        </h2>
        <SliderWareCards
          className="product-page__slider-ware"
          data={POPULAR_PRODUCTS_DATA}
        />
      </section>
      <CustomerReviews className="product-page__customer-reviews" />
    </PageContent>
  );
}

export default ProductPage;
