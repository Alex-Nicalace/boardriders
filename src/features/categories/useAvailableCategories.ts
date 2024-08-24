import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAvailableCategories } from '../../services/apiCategories';
import { useSearchParamsObject } from '../../hooks/useSearchParamsObject';

export function useAvailableCategories() {
  const params = useParams();
  const { categoryGender, category } = params;
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

  return { data, isLoading, error };
}
