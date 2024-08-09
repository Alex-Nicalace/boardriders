import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../services/apiProducts';
import { PAGE_SIZE_PRODUCTS } from '../../services/constants';

export function useProducts() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { categoryGender, category, brand } = params;
  const categories = [categoryGender, category].filter(
    (item) => item !== undefined
  );
  const page = Number(searchParams.get('page'));
  const pageNum = isNaN(page) || page < 1 ? 1 : page;

  const {
    data: { products, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', ...categories, pageNum, brand],
    queryFn: () =>
      getProducts({
        categories,
        page: pageNum,
        brand,
      }),
  });

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE_PRODUCTS);

  // предварительная подгрузка следующей страницы
  if (pageNum < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ['products', ...categories, pageNum + 1, brand],
      queryFn: () =>
        getProducts({
          categories,
          page: pageNum + 1,
        }),
    });
  }
  // предварительная подгрузка предыдущей страницы
  if (pageNum > 1) {
    queryClient.prefetchQuery({
      queryKey: ['products', ...categories, pageNum - 1, brand],
      queryFn: () =>
        getProducts({
          categories,
          page: pageNum - 1,
        }),
    });
  }

  return { products, isLoading, error, count, totalPages, pageNum };
}
