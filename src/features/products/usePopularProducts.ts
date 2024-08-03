import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPopularProducts } from '../../services/apiProducts';

export function usePopularProducts(limit: number) {
  const params = useParams();
  const categoryName = params.categoryGender;

  const {
    data: popularProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['topSaleProducts', categoryName],
    queryFn: () => getPopularProducts({ limit, categoryName }),
  });

  return { popularProducts, isLoading, error };
}
