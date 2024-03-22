import ProductCategoriesSlider from '../components/ProductCategoriesSlider';
import ProductCategoryFilterCards from '../components/ProductCategoryFilterCards';
import PromoSlider from '../components/PromoSlider';
import useMatchMedia from '../hooks/useMatchMedia';

const MEDIA_QUERY = ['(min-width: 1500px)'];

// type TCatalogProps = {};
function Catalog(): JSX.Element {
  const [isScreenWidthGreaterThan1500] = useMatchMedia(MEDIA_QUERY);
  return (
    <>
      <PromoSlider />
      {isScreenWidthGreaterThan1500 && <ProductCategoriesSlider />}
      <ProductCategoryFilterCards />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default Catalog;
