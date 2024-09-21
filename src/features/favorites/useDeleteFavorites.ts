import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFavorites as deleteFavoritesApi } from '../../services/apiFavorites';
import toast from 'react-hot-toast';

export function useDeleteFavorites() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteFavorites } = useMutation({
    mutationFn: deleteFavoritesApi,
    onSuccess: () => {
      // в случае успеха обновляем кеш. invalidateQueries делает кэш не действительным, что обновляет кеш
      queryClient.invalidateQueries({ queryKey: ['wishList', true] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
    onError: (err) => {
      console.error(err);

      toast.error(
        `Во время удаления из избранного произошла ошибка! ${err.message}`
      );
    },
  });

  return { isDeleting, deleteFavorites };
}
