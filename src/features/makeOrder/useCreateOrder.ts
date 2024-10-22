import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Database } from '../../services/supabase.types';
import { createOrder as createOrderApi } from '../../services/apiOrders';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { resetOrder } from './makeOrderSlice';

export function useCreateOrder() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createOrder } = useMutation({
    mutationFn: (
      data: Database['public']['Functions']['createOrder']['Args']
    ) => createOrderApi(data),
    onSuccess: () => {
      dispatch(resetOrder());
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['totalItemsCart'] });
      toast.success('Заказ успешно создан!');
    },
    onError: (err) => {
      console.error(err);

      toast.error(`Во время создания заказа произошла ошибка! ${err.message}`);
    },
  });

  return { isCreating, createOrder };
}
