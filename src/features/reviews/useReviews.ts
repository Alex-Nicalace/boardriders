import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { getReviews } from '../../services/apiReviews';
import { PAGE_SIZE_COMMENTS } from '../../services/constants';

export function useReviews() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const productId = Number(params.productId);
  const page = Number(searchParams.get('pageReviews'));
  const pageNum = isNaN(page) || page < 1 ? 1 : page;

  const {
    data: { reviews, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['reviews', productId, pageNum],
    queryFn: () => getReviews({ productId, page: pageNum }),
  });

  const totalPage = Math.ceil((count ?? 0) / PAGE_SIZE_COMMENTS);

  // предварительная подгрузка следующей страницы
  if (pageNum < totalPage) {
    queryClient.prefetchQuery({
      queryKey: ['reviews', productId, pageNum + 1],
      queryFn: () => getReviews({ productId, page: pageNum + 1 }),
    });
  }
  // предварительная подгрузка предыдущей страницы
  if (pageNum > 1) {
    queryClient.prefetchQuery({
      queryKey: ['reviews', productId, pageNum - 1],
      queryFn: () => getReviews({ productId, page: pageNum - 1 }),
    });
  }

  return { reviews, isLoading, error, count, totalPage, pageNum };
}
