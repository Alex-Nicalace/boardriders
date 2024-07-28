import Empty from '../../components/Empty';
import Spinner from '../../components/Spinner';
import SliderWareCards from '../../components/ui/SliderWareCards';
import { usePopularProducts } from './usePopularProducts';

type TNewProductsSliderProps = {
  className?: string;
};
function PopularProductsSlider({
  className,
}: TNewProductsSliderProps): JSX.Element {
  const { popularProducts, isLoading } = usePopularProducts(15);

  if (isLoading) return <Spinner />;

  if (!popularProducts || !popularProducts.length)
    return <Empty resource="Топ продаж" />;

  return <SliderWareCards className={className} data={popularProducts} />;
}

export default PopularProductsSlider;
