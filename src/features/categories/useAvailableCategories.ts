import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAvailableCategories } from '../../services/apiCategories';
import { useSearchParamsObject } from '../../hooks/useSearchParamsObject';
import { useConsistencySearchParams } from '../../hooks/useConsistencySearchParams';
import { useBrand } from '../brands/useBrand';

/**
 * Хук для получения данных о доступных категориях.
 * Используется на странице каталога товаров для согласованности фильтров.
 */
export function useAvailableCategories() {
  const params = useParams();
  const { categoryGender, category, brand } = params;
  const categoriesList = [categoryGender, category].filter(
    (item) => item !== undefined
  );

  const searchParamsObject = useSearchParamsObject([
    'color',
    'size',
    'brand',
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
    queryKey: ['availableCategories', categoriesList, searchParamsObject],
    queryFn: () =>
      getAvailableCategories({ categoriesList, ...searchParamsObject }),
    staleTime: Infinity,
  });

  const data = rowData?.map((item) => ({
    value: item.name,
    title: item.displayName,
    count: item.countProduct,
  }));

  useConsistencySearchParams({ filterName: 'category', data });

  return { data, isLoading, error };
}
