import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAvailableRangePrices } from '../../services/apiProducts';

export function useAvailableRangePrices() {
  const params = useParams();
  const { categoryGender, category } = params;
  const categoriesList = [categoryGender, category].filter(
    (item) => item !== undefined
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ['availableRangePrices', categoriesList],
    queryFn: () => getAvailableRangePrices(categoriesList),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
}
