import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { getReviews } from '../../services/apiReviews';

export function useReviews() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const productId = Number(params.productId);
  const page = Number(searchParams.get('pageReviews') || 1);

  const {
    data: { reviews, count, totalPage } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['reviews', productId, page],
    queryFn: () => getReviews({ productId, page }),
  });

  return { reviews, isLoading, error, count, totalPage };
}
