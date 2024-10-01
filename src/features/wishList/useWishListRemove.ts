import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../../hooks/reduxHooks';
import toast from 'react-hot-toast';
import { removeWishList as removeWishListAction } from './wishListSlise';
import { TWishList } from './wishList.types';
import { useSortByPage } from '../../hooks/useSortByPage';

export function useWishListRemove() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { sortBy, pageNum } = useSortByPage();

  const { isPending: isDeleting, mutate: removeWishList } = useMutation({
    mutationFn: (id: number) => {
      dispatch(removeWishListAction(id));
      queryClient.setQueryData(
        ['wishList', false, sortBy, pageNum],
        (wishListtOld: TWishList) => {
          const wishListtOldLength = wishListtOld.products.length;
          const wishList = wishListtOld.products.filter(
            (wishListItem) => wishListItem.id !== id
          );
          const quantityDeleted = wishListtOldLength - wishList.length;
          return {
            products: wishList,
            count: wishListtOldLength - quantityDeleted,
          };
        }
      );
      return Promise.resolve();
    },
    onSuccess: () => {
      toast.success('Товар удален из избранного');
    },
    onError: (err) => {
      console.error(err);
      toast.error('Произошла ошибка при удалении из избранного');
    },
  });

  return { isDeleting, removeWishList };
}
