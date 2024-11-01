import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../../services/apiOrders';

export function useOrderPlaced(id: number | undefined) {
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orderPlaced', id],
    queryFn: () =>
      getOrderById(id || -1, ['id', 'contactEmail', 'contactPhone']),
    enabled: !!id,
  });

  return { order, isLoading, error };
}
