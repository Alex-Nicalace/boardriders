import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { removeCart as removeCartAction } from './cartSlice';
import { TCartList } from './cart.types';
import { useUser } from '../authentication/useUser';
import { Tables } from '../../services/supabase.types';
import { deleteCart } from '../../services/apiCart';

export function useCartRemove() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useUser();

  const { isPending: isDeleting, mutate: removeCart } = useMutation({
    mutationFn: (id: number): Promise<Partial<Tables<'cart'>>> => {
      if (!isAuthenticated) {
        dispatch(removeCartAction(id));
        return Promise.resolve({ productVariantId: id });
      }
      return deleteCart(id);
    },
    onSuccess: ({ productVariantId }) => {
      const queryKey = ['cart', isAuthenticated ? 'auth' : 'notAuth'];
      queryClient.setQueryData(queryKey, (cartListOld: TCartList) =>
        cartListOld.filter(
          (cartItem) => cartItem.productVariantId !== productVariantId
        )
      );
      toast.success('Товар удален из корзины');
      queryClient.invalidateQueries({ queryKey: ['totalItemsCart'] });
    },
    onError: (err) => {
      console.error(err);
      toast.error('Произошла ошибка при удалении из корзины');
    },
  });

  return { isDeleting, removeCart };
}
