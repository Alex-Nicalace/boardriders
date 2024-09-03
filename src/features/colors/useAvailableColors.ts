import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAvailableColors } from '../../services/apiColors';
import { useSearchParamsObject } from '../../hooks/useSearchParamsObject';
import { useConsistencySearchParams } from '../../hooks/useConsistencySearchParams';
import { useBrand } from '../brands/useBrand';

/**
 * Хук для получения данных о доступных цветах.
 * Используется на странице каталога товаров для согласованности фильтров.
 */
export function useAvailableColors() {
  const params = useParams();
  const { categoryGender, category, brand } = params;
  const categoriesList = [categoryGender, category].filter(
    (item) => item !== undefined
  );

  const searchParamsObject = useSearchParamsObject([
    'brand',
    'size',
    'category',
    'minPrice',
    'maxPrice',
  ]);

  // добвить ИД бренда из параметров. Надо из названия получить ИД
  const { brands } = useBrand(!!brand);
  const { id: brandId } = brands || {};
  if (brandId) {
    searchParamsObject.brandIds.push(brandId);
  }

  const {
    data: rowData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['availableColors', categoriesList, searchParamsObject],
    queryFn: () =>
      getAvailableColors({ categoriesList, ...searchParamsObject }),
    staleTime: Infinity,
  });

  const data = rowData?.map((item) => ({
    value: `${item.id}|${item.hexValue}`,
    title: item.name,
    count: item.countProduct,
  }));

  useConsistencySearchParams({ filterName: 'color', data });

  return { data, isLoading, error };
}
