import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFavorites as createFavoritesApi } from '../../services/apiFavorites';
import toast from 'react-hot-toast';

export function useCreateFavorites() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createFavorites } = useMutation({
    mutationFn: createFavoritesApi,
    onSuccess: () => {
      // в случае успеха обновляем кеш. invalidateQueries делает кэш не действительным, что обновляет кеш
      queryClient.invalidateQueries({ queryKey: ['wishList', true] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
    onError: (err) => {
      console.error(err);

      toast.error(
        `Во время добавления в избранное произошла ошибка! ${err.message}`
      );
    },
  });

  return { isCreating, createFavorites };
}
