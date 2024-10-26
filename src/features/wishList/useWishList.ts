import { useQuery } from '@tanstack/react-query';
import { getFavorites } from '../../services/apiFavorites';
import { useUser } from '../authentication/useUser';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getWishList } from './wishListSlise';

export function useWishList(enabled: boolean = true) {
  const { isAuthenticated } = useUser();

  const wishListLocal = useAppSelector(getWishList);

  const {
    data: { productIds, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['wishList', 'productIds', isAuthenticated],
    queryFn: () => {
      if (!isAuthenticated) {
        return Promise.resolve({
          productIds: wishListLocal,
          count: wishListLocal.length,
        });
      }

      return getFavorites();
    },
    enabled,
  });

  return { productIds, isLoading, error, count };
}
