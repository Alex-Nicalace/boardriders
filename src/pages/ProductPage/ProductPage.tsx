import Main from '../../components/Main';
import Product from '../../components/Product';
import Breadcrumbs, { TBreadcrumbsData } from '../../components/ui/Breadcrumbs';
import Steps from '../../components/ui/Steps';

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
  return (
    <div className="product-page">
      <Breadcrumbs
        className="product-page__breadcrumbs"
        data={BREADCRUMBS}
        withContainer
      />
      <div className="product-page__container">
        <Steps className="product-page__steps" />
      </div>
      <Main className="product-page__main">
        <Product className="product-page__product" />
      </Main>
    </div>
  );
}

export default ProductPage;
