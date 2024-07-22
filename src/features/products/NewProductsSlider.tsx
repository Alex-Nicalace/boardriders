import Empty from '../../components/Empty';
import Spinner from '../../components/Spinner';
import SliderWareCards from '../../components/ui/SliderWareCards';
import { useNewProducts } from './useNewProducts';

type TNewProductsSliderProps = {
  className?: string;
};
function NewProductsSlider({
  className,
}: TNewProductsSliderProps): JSX.Element {
  const { newProducts, isLoading } = useNewProducts(15);

  if (isLoading) return <Spinner />;

  if (!newProducts || !newProducts.length) return <Empty resource="новинки" />;

  return <SliderWareCards className={className} data={newProducts} />;
}

export default NewProductsSlider;
