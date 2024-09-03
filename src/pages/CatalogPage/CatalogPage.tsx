import './CatalogPage.scss';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import PromoSlider from '../../components/PromoSlider';
import PageContent from '../../components/PageContent';
import ProductListFilteredContainer from '../../features/products/ProductListFilteredContainer';
import AboutBrandContainer from '../../features/brands/AboutBrandContainer';
import ProductCategoriesSliderContainer from '../../features/categories/ProductCategoriesSliderContainer';

type TCatalogProps = { isCatalogBrand?: boolean };
function CatalogPage({ isCatalogBrand = false }: TCatalogProps): JSX.Element {
  const { isOverLarge } = useScreenWidth();

  return (
    <PageContent className="catalog-page" as="main">
      {!isCatalogBrand && <PromoSlider className="catalog-page__top" />}
      {isCatalogBrand && <AboutBrandContainer className="catalog-page__top" />}
      {isOverLarge && (
        <ProductCategoriesSliderContainer className="catalog-page__product-categories-slider" />
      )}
      <ProductListFilteredContainer className="catalog-page__product-category-filter-cards" />
    </PageContent>
  );
}

export default CatalogPage;
