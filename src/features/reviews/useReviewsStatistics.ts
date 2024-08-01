import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getReviewsStatistics } from '../../services/apiReviews';

export function useReviewsStatistics() {
  const params = useParams();
  const productId = Number(params.productId);

  const {
    data: reviewsStatistics,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['reviewsStatistics', productId],
    queryFn: () => getReviewsStatistics(productId),
  });

  return { reviewsStatistics, isLoading, error };
}
