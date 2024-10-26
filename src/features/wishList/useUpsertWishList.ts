import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertFavorites } from '../../services/apiFavorites';
import toast from 'react-hot-toast';
import { useUser } from '../authentication/useUser';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addWishList } from './wishListSlise';

export function useUpsertWishList() {
  const queryClient = useQueryClient();

  const { isAuthenticated, user } = useUser();
  const { id: userId } = user || {};

  const dispatch = useAppDispatch();

  const { isPending: isUpserting, mutate: upsertWishList } = useMutation({
    mutationFn: (productId: number) => {
      if (!isAuthenticated) {
        dispatch(addWishList(productId));
        return Promise.resolve({
          productId,
        });
      }

      if (!userId) {
        throw new Error(
          'Не удалось добавить в избранное, т.к. нет данных пользователя'
        );
      }
      return upsertFavorites({ productId, userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wishList', 'products', isAuthenticated],
      });
      queryClient.invalidateQueries({
        queryKey: ['wishList', 'productIds', isAuthenticated],
      });
    },
    onError: (err) => {
      console.error(err);

      toast.error(
        `Во время добавления в избранное произошла ошибка! ${err.message}`
      );
    },
  });

  return { isUpserting, upsertWishList };
}
