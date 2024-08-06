import './CatalogPage.scss';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import ProductCategoriesSlider from '../../components/ProductCategoriesSlider';
import PromoSlider from '../../components/PromoSlider';
import PageContent from '../../components/PageContent';
import ProductListFilteredContainer from '../../features/products/ProductListFilteredContainer';

// type TCatalogProps = {};
function CatalogPage(): JSX.Element {
  const { isOverLarge } = useScreenWidth();
  return (
    <PageContent className="catalog-page" as="main">
      {/* на макете есть примеры как с PromoSlider так и просто с Breadcrumbs от чего зависит пока не понятно
      Видимо просто если есть некое промо то есть нет тогда просто крошки. Пока оствлю с промо */}
      <PromoSlider className="catalog-page__promo-slider" />
      {/* <Breadcrumbs
        className="catalog__breadcrumbs"
        data={BREADCRUMBS}
        withContainer
        // color="white"
      /> */}
      {isOverLarge && (
        <ProductCategoriesSlider className="catalog-page__product-categories-slider" />
      )}
      <ProductListFilteredContainer className="catalog-page__product-category-filter-cards" />
    </PageContent>
  );
}

export default CatalogPage;
