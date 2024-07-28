import { useQuery } from '@tanstack/react-query';
import { getPopularProducts } from '../../services/apiProducts';

export function usePopularProducts(limit: number) {
  const {
    data: popularProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['topSaleProducts'],
    queryFn: () => getPopularProducts(limit),
  });

  return { popularProducts, isLoading, error };
}
