import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getWishList } from './wishListSlise';
import { getProducts, TFilters } from '../../services/apiProducts';
import { PAGE_SIZE_PRODUCTS } from '../../services/constants';

export function useWishList() {
  const queryClient = useQueryClient();
  const wishList = useAppSelector(getWishList);
  const [searchParams] = useSearchParams();

  // FILTERS
  const filters: TFilters[] = [{ field: 'id', value: wishList, method: 'in' }];
  // PAGE
  const page = Number(searchParams.get('page'));
  const pageNum = isNaN(page) || page < 1 ? 1 : page;
  // SORT
  const sortByString = searchParams.get('sortBy');
  const sortByValue = !!sortByString && sortByString.split('-');
  const sortBy = !sortByValue
    ? undefined
    : { field: sortByValue[0], value: sortByValue[1] };

  const queryKeys = ['wishList', wishList, sortBy];
  const args = {
    page: pageNum,
    filters,
    sortBy,
  };

  const {
    data: { products, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: [...queryKeys, pageNum],
    queryFn: () => getProducts(args),
  });

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE_PRODUCTS);

  // предварительная подгрузка следующей страницы
  if (pageNum < totalPages) {
    queryClient.prefetchQuery({
      queryKey: [...queryKeys, pageNum + 1],
      queryFn: () =>
        getProducts({
          ...args,
          page: pageNum + 1,
        }),
    });
  }
  // предварительная подгрузка предыдущей страницы
  if (pageNum > 1) {
    queryClient.prefetchQuery({
      queryKey: [...queryKeys, pageNum - 1],
      queryFn: () =>
        getProducts({
          ...args,
          page: pageNum - 1,
        }),
    });
  }

  return { products, isLoading, error, count, totalPages, pageNum };
}
