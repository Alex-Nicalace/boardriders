import './CatalogPage.scss';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import ProductCategoriesSlider from '../../components/ProductCategoriesSlider';
import PromoSlider from '../../components/PromoSlider';
import PageContent from '../../components/PageContent';
import ProductListFilteredContainer from '../../features/products/ProductListFilteredContainer';
import AboutBrandContainer from '../../features/brands/AboutBrandContainer';

type TCatalogProps = { isCatalogBrand?: boolean };
function CatalogPage({ isCatalogBrand = false }: TCatalogProps): JSX.Element {
  const { isOverLarge } = useScreenWidth();

  return (
    <PageContent className="catalog-page" as="main">
      {!isCatalogBrand && <PromoSlider className="catalog-page__top" />}
      {isCatalogBrand && <AboutBrandContainer className="catalog-page__top" />}
      {isOverLarge && (
        <ProductCategoriesSlider className="catalog-page__product-categories-slider" />
      )}
      <ProductListFilteredContainer className="catalog-page__product-category-filter-cards" />
    </PageContent>
  );
}

export default CatalogPage;
