import { useQuery } from '@tanstack/react-query';
import { getPopularProducts } from '../../services/apiProducts';

export function usePopularProducts() {
  const {
    data: popularProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['topSaleProducts'],
    queryFn: getPopularProducts,
  });

  return { popularProducts, isLoading, error };
}
