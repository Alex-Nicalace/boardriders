import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../../services/apiOrders';

export function useOrder(id: number | undefined) {
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrderById(id || -1),
    enabled: !!id,
  });

  return { order, isLoading, error };
}
