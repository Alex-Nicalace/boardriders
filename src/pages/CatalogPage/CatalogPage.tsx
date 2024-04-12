import './CatalogPage.scss';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import Main from '../../components/Main';
import ProductCategoriesSlider from '../../components/ProductCategoriesSlider';
import ProductListFiltered from '../../components/ProductListFiltered';
import PromoSlider from '../../components/PromoSlider';

// type TCatalogProps = {};
function CatalogPage(): JSX.Element {
  const { isOverLarge } = useScreenWidth();
  return (
    <Main className="catalog-page">
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
      <ProductListFiltered className="catalog-page__product-category-filter-cards" />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Main>
  );
}

export default CatalogPage;
