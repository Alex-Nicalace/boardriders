import { useParams } from 'react-router-dom';
import ProductCategoriesSlider, {
  TProductCategoriesSliderProps,
} from '../../components/ProductCategoriesSlider';
import { useMainMenu } from './useMainMenu';
import Spinner from '../../components/Spinner';

type TProductCategoriesSliderContainerProps = Omit<
  TProductCategoriesSliderProps,
  'data'
> & {};
function ProductCategoriesSliderContainer(
  props: TProductCategoriesSliderContainerProps
) {
  const params = useParams();
  const { mainMenu, isLoading, categoryGender } = useMainMenu(false); // данные о подменю находятся здесь
  const { category } = params; // взять категорию из URL :categoryGender/catalog/:category

  if (isLoading) return <Spinner />;
  if (!mainMenu || !category) return null; // категории может и не быть по пути из URL :categoryGender/catalog/

  const subMenu = mainMenu.find((item) => item.name === category)?.subMenu;

  // если нет подменю, то вернем null
  if (!subMenu) return null;

  const data = subMenu.map((item) => ({
    title: item.displayName,
    to: `/${categoryGender}/catalog/${item.name}`,
    imageUrl: item.imageUrl || '',
  }));

  return <ProductCategoriesSlider {...props} data={data} />;
}

export default ProductCategoriesSliderContainer;
