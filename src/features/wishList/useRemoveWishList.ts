import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../../hooks/reduxHooks';
import toast from 'react-hot-toast';
import { removeWishList as removeWishListAction } from './wishListSlise';
import { TWishList } from './wishList.types';
import { useSortByPage } from '../../hooks/useSortByPage';
import { useUser } from '../authentication/useUser';
import { deleteFavorites } from '../../services/apiFavorites';
import { Tables } from '../../services/supabase.types';

export function useRemoveWishList() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { sortBy, pageNum } = useSortByPage();
  const { isAuthenticated } = useUser();

  const { isPending: isDeleting, mutate: removeWishList } = useMutation({
    mutationFn: (productId: number): Promise<Partial<Tables<'favorites'>>> => {
      if (!isAuthenticated) {
        dispatch(removeWishListAction(productId));
        return Promise.resolve({ productId });
      }

      return deleteFavorites(productId);
    },
    onSuccess: ({ productId }) => {
      queryClient.setQueryData(
        ['wishList', 'products', isAuthenticated, sortBy, pageNum],
        (wishListtOld: TWishList) => {
          const wishListtOldLength = wishListtOld.products.length;
          const wishList = wishListtOld.products.filter(
            (wishListItem) => wishListItem.id !== productId
          );
          const quantityDeleted = wishListtOldLength - wishList.length;
          return {
            products: wishList,
            count: wishListtOldLength - quantityDeleted,
          };
        }
      );
      queryClient.invalidateQueries({
        queryKey: ['wishList', 'productIds', isAuthenticated],
      });
      queryClient.invalidateQueries({
        queryKey: ['wishList', 'products', isAuthenticated, 'favouriteList3'],
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error('Произошла ошибка при удалении из избранного');
    },
  });

  return { isDeleting, removeWishList };
}
