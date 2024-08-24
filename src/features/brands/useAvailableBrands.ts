import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAvailableBrands } from '../../services/apiBrands';
import { useSearchParamsObject } from '../../hooks/useSearchParamsObject';

export function useAvailableBrands() {
  const params = useParams();
  const { categoryGender, category } = params;
  const categoriesList = [categoryGender, category].filter(
    (item) => item !== undefined
  );

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
  });

  const data = rowData?.map((item) => ({
    value: item.id.toString(),
    title: item.name,
    count: item.countProduct,
  }));

  return { data, isLoading, error };
}
