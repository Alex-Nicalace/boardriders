import { useQuery } from '@tanstack/react-query';
import { getNewProducts } from '../../services/apiProducts';

export function useNewProducts(limit: number) {
  const {
    data: newProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['newProducts'],
    queryFn: () => getNewProducts(limit),
  });

  return { newProducts, isLoading, error };
}
