import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import SliderWareCards from '../../components/ui/SliderWareCards';
import { useNewProducts } from './useNewProducts';

type TNewProductsSliderProps = {
  className?: string;
};
function NewProductsSlider({ className }: TNewProductsSliderProps) {
  const { newProducts, isLoading, error } = useNewProducts(15);

  if (isLoading) return <Spinner className={className} />;

  if (error)
    return (
      <ErrorMessage
        className={className}
        message="Не удалось загрузить новые товары"
      />
    );

  if (!newProducts || !newProducts.length) return null;

  return <SliderWareCards className={className} data={newProducts} />;
}

export default NewProductsSlider;
