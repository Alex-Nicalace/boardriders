import './ProductPage.scss';
import Breadcrumbs, { TBreadcrumbsData } from '../../components/ui/Breadcrumbs';
import Steps from '../../components/ui/Steps';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import PageContent from '../../components/PageContent';
import PopularProductsSlider from '../../features/products/PopularProductsSlider';
import ProductContainer from '../../features/products/ProductContainer';
import NewProductsSlider from '../../features/products/NewProductsSlider';
import CustomerReviewsContainer from '../../features/reviews/CustomerReviewsContainer';

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
        <ProductContainer className="product-page__product" />
      </main>
      <section className="product-page__box-slider-ware">
        <h2 className="product-page__title-slider product-page__container">
          Новинки
        </h2>
        {/* //! для соответствия макету добавил популярные продукты, а не "C этим товаром смотрят" т.к. в БД нет функционала*/}
        <NewProductsSlider className="product-page__slider-ware" />
      </section>
      <section className="product-page__box-slider-ware">
        <h2 className="product-page__title-slider product-page__container">
          Топ продаж
        </h2>
        {/* //! для соответствия макету добавил популярные продукты, а не "C этим товаром рекомендуем" т.к. в БД нет функционала*/}
        <PopularProductsSlider className="product-page__slider-ware" />
      </section>
      <CustomerReviewsContainer className="product-page__customer-reviews" />
    </PageContent>
  );
}

export default ProductPage;
