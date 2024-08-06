import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services/apiProducts';

export function useProduct({
  isGetFromCache = false,
}:
  | {
      isGetFromCache?: boolean;
    }
  | undefined = {}) {
  const params = useParams();
  const productId = Number(params.productId);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
    enabled: !isGetFromCache,
  });

  return { product, isLoading, error };
}
