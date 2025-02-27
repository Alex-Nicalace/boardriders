import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getWishList } from './wishListSlise';
import {
  getProducts,
  TFilters,
  TGetProductsArgs,
} from '../../services/apiProducts';
import { PAGE_SIZE_PRODUCTS } from '../../constants';
import { useUser } from '../authentication/useUser';
import { useSortByPage } from '../../hooks/useSortByPage';

export function useWishListProducts(params?: { useFavouriteList3?: boolean }) {
  const { useFavouriteList3 } = params ?? {};
  const queryClient = useQueryClient();
  const wishListLocal = useAppSelector(getWishList);
  const { isAuthenticated } = useUser();
  const { sortBy, pageNum } = useSortByPage();

  // FILTERS
  const filters: TFilters[] = [
    { field: 'id', value: wishListLocal, method: 'in' },
  ];

  const queryKeys = [
    'wishList',
    'products',
    isAuthenticated,
    useFavouriteList3 ? 'favouriteList3' : sortBy,
  ];

  const args: TGetProductsArgs = isAuthenticated
    ? {
        page: pageNum,
        sortBy,
        isFavorite: true,
        ...(useFavouriteList3 && { limit: 3 }),
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
