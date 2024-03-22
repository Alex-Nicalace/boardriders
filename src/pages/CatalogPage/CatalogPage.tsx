import Main from '../../components/Main';
import ProductCategoriesSlider from '../../components/ProductCategoriesSlider';
import ProductCategoryFilterCards from '../../components/ProductCategoryFilterCards';
import PromoSlider from '../../components/PromoSlider';
import useMatchMedia from '../../hooks/useMatchMedia';
import './CatalogPage.scss';

const MEDIA_QUERY = ['(min-width: 1500px)'];

// type TCatalogProps = {};
function Catalog(): JSX.Element {
  const [isScreenWidthGreaterThan1500] = useMatchMedia(MEDIA_QUERY);
  return (
    <Main className="catalog">
      <PromoSlider className="catalog__promo-slider" />
      {isScreenWidthGreaterThan1500 && (
        <ProductCategoriesSlider className="catalog__product-categories-slider" />
      )}
      <ProductCategoryFilterCards className="catalog__product-category-filter-cards" />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Main>
  );
}

export default Catalog;
