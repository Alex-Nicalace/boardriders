import './CatalogPage.scss';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import Main from '../../components/Main';
import ProductCategoriesSlider from '../../components/ProductCategoriesSlider';
import ProductListFiltered from '../../components/ProductListFiltered';
import PromoSlider from '../../components/PromoSlider';

// type TCatalogProps = {};
function Catalog(): JSX.Element {
  const { isOverLarge } = useScreenWidth();
  return (
    <Main className="catalog">
      <PromoSlider className="catalog__promo-slider" />
      {isOverLarge && (
        <ProductCategoriesSlider className="catalog__product-categories-slider" />
      )}
      <ProductListFiltered className="catalog__product-category-filter-cards" />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Main>
  );
}

export default Catalog;
