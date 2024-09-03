import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAvailableRangePrices } from '../../services/apiProducts';
import { useSearchParamsObject } from '../../hooks/useSearchParamsObject';
import { useBrand } from '../brands/useBrand';

/**
 * Хук для получения данных о доступной диапазоне цен.
 * Используется на странице каталога товаров для согласованности фильтров.
 */
export function useAvailableRangePrices() {
  const params = useParams();
  const { categoryGender, category, brand } = params;
  const categoriesList = [categoryGender, category].filter(
    (item) => item !== undefined
  );

  const searchParamsObject = useSearchParamsObject([
    'color',
    'size',
    'category',
    'brand',
  ]);

  // добвить ИД бренда из параметров. Надо из названия получить ИД
  const { brands } = useBrand(!!brand);
  const { id: brandId } = brands || {};
  if (brandId) {
    searchParamsObject.brandIds.push(brandId);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['availableRangePrices', categoriesList, searchParamsObject],
    queryFn: () =>
      getAvailableRangePrices({ categoriesList, ...searchParamsObject }),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
}
