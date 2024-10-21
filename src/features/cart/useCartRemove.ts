import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { removeCart as removeCartAction } from './cartSlice';
import { TCartList } from './cart.types';
import { useUser } from '../authentication/useUser';

export function useCartRemove() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useUser();

  const { isPending: isDeleting, mutate: removeCart } = useMutation({
    mutationFn: (id: number) => {
      if (!isAuthenticated) {
        dispatch(removeCartAction(id));
        queryClient.setQueryData(
          ['cart', 'notAuth'],
          (cartListOld: TCartList) =>
            cartListOld.filter((cartItem) => cartItem.productVariantId !== id)
        );
      }
      return Promise.resolve();
    },
    onSuccess: () => {
      toast.success('Товар удален из корзины');
    },
    onError: (err) => {
      console.error(err);
      toast.error('Произошла ошибка при удалении из корзины');
    },
  });

  return { isDeleting, removeCart };
}
