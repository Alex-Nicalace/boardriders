import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../services/apiProducts';

export function useProduct() {
  const params = useParams();
  const productId = Number(params.productId);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['topSaleProducts', productId],
    queryFn: () => getProduct(productId),
  });

  return { product, isLoading, error };
}
