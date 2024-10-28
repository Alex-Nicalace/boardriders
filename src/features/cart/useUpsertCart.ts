import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { TablesInsert } from '../../services/supabase.types';
import { useUser } from '../authentication/useUser';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addOrEditCart } from './cartSlice';
import { upsertCart as upsertCartApi } from '../../services/apiCart';
import { TCartList } from './cart.types';

export function useUpsertCart() {
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useUser();
  const { id: userId } = user || {};

  const dispatch = useAppDispatch();

  const { isPending: isUpserting, mutate: upsertCart } = useMutation({
    mutationFn: ({
      productVariantId,
      quantity = 1,
    }: Omit<TablesInsert<'cart'>, 'userId' | 'quantity'> & {
      quantity?: number;
    }) => {
      if (!isAuthenticated) {
        dispatch(
          addOrEditCart({
            productVariantId,
            count: quantity,
          })
        );
        return Promise.resolve({
          productVariantId,
          quantity,
        });
      }

      if (!userId) {
        throw new Error(
          'Не удалось добавить в корзину, т.к. нет данных пользователя'
        );
      }

      return upsertCartApi({ productVariantId, quantity, userId });
    },
    onSuccess: ({ productVariantId, quantity }) => {
      // в случае успеха обновляем кеш. invalidateQueries делает кэш не действительным, что обновляет кеш
      queryClient.invalidateQueries({ queryKey: ['totalItemsCart'] });
      queryClient.invalidateQueries({
        queryKey: ['cartIncludesItem', productVariantId],
      });
      // * обновляю кэш только для авторизированных пользователей
      // * для неавторизированных количесво отражает глобальное сосотояние поэтому и так обновляется
      if (isAuthenticated) {
        queryClient.setQueryData(
          ['cart', 'auth'],
          (cartListOld: TCartList | undefined) => {
            if (!cartListOld) return cartListOld;
            return cartListOld.map((cartItem) =>
              cartItem.productVariantId === productVariantId
                ? { ...cartItem, quantity }
                : cartItem
            );
          }
        );
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error('Произошла ошибка при обновлении корзины');
    },
  });

  return { isUpserting, upsertCart };
}
