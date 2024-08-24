import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAvailableRangePrices } from '../../services/apiProducts';
import { useSearchParamsObject } from '../../hooks/useSearchParamsObject';

export function useAvailableRangePrices() {
  const params = useParams();
  const { categoryGender, category } = params;
  const categoriesList = [categoryGender, category].filter(
    (item) => item !== undefined
  );

  const searchParamsObject = useSearchParamsObject([
    'color',
    'size',
    'category',
    'brand',
  ]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['availableRangePrices', categoriesList, searchParamsObject],
    queryFn: () =>
      getAvailableRangePrices({ categoriesList, ...searchParamsObject }),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
}
