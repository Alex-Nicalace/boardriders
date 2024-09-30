import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { removeCart as removeCartAction } from './cartSlice';
import { TCartList } from './cart.types';
import toast from 'react-hot-toast';

export function useCartRemove() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: removeCart } = useMutation({
    mutationFn: (id: number) => {
      dispatch(removeCartAction(id));
      queryClient.setQueryData(['cart'], (cartListOld: TCartList) =>
        cartListOld.filter((cartItem) => cartItem.id !== id)
      );
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
