import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAvailableBrands } from '../../services/apiBrands';
import { useSearchParamsObject } from '../../hooks/useSearchParamsObject';
import { useConsistencySearchParams } from '../../hooks/useConsistencySearchParams';

/**
 * Хук для получения данных о доступных брендах.
 * Используется на странице каталога товаров для согласованности фильтров.
 */
export function useAvailableBrands() {
  const params = useParams();
  const { categoryGender, category, brand } = params;
  const categoriesList = [categoryGender, category, brand].filter(
    (item) => item !== undefined
  );
  const isEnableQuery = !brand;

  const searchParamsObject = useSearchParamsObject([
    'color',
    'size',
    'category',
    'minPrice',
    'maxPrice',
  ]);

  const {
    data: rowData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['availableBrands', categoriesList, searchParamsObject],
    queryFn: () =>
      getAvailableBrands({ categoriesList, ...searchParamsObject }),
    staleTime: Infinity,
    enabled: isEnableQuery,
  });

  const data = isEnableQuery
    ? rowData?.map((item) => ({
        value: item.id.toString(),
        title: item.name,
        count: item.countProduct,
      }))
    : undefined;

  useConsistencySearchParams({ filterName: 'brand', data });

  return { data, isLoading, error };
}
