import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import SliderWareCards from '../../components/ui/SliderWareCards';
import { usePopularProducts } from './usePopularProducts';

type TNewProductsSliderProps = {
  className?: string;
};
function PopularProductsSlider({ className }: TNewProductsSliderProps) {
  const { popularProducts, isLoading, error } = usePopularProducts(15);

  if (isLoading) return <Spinner className={className} />;

  if (error)
    return (
      <ErrorMessage
        className={className}
        message="Не удалось загрузить популярные товары"
      />
    );

  if (!popularProducts || !popularProducts.length) return null;

  return <SliderWareCards className={className} data={popularProducts} />;
}

export default PopularProductsSlider;
