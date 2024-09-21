import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getWishList } from './wishListSlise';
import {
  getProducts,
  TFilters,
  TGetProductsArgs,
} from '../../services/apiProducts';
import { PAGE_SIZE_PRODUCTS } from '../../services/constants';
import { useUser } from '../authentication/useUser';

export function useWishList() {
  const queryClient = useQueryClient();
  const wishListLocal = useAppSelector(getWishList);
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useUser();

  // FILTERS
  const filters: TFilters[] = [
    { field: 'id', value: wishListLocal, method: 'in' },
  ];
  // PAGE
  const page = Number(searchParams.get('page'));
  const pageNum = isNaN(page) || page < 1 ? 1 : page;
  // SORT
  const sortByString = searchParams.get('sortBy');
  const sortByValue = !!sortByString && sortByString.split('-');
  const sortBy = !sortByValue
    ? undefined
    : { field: sortByValue[0], value: sortByValue[1] };

  const queryKeys = ['wishList', isAuthenticated || wishListLocal, sortBy];

  const args: TGetProductsArgs = isAuthenticated
    ? {
        page: pageNum,
        sortBy,
        isFavorite: true,
      }
    : {
        page: pageNum,
        sortBy,
        filters,
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
