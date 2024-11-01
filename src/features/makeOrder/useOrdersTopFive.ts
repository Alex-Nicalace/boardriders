import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../services/apiOrders';

export function useOrdersTopFive() {
  const {
    data: { data: ordersTopFive } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ordersTopFive'],
    queryFn: () => getOrders({ page: 1, pageSize: 5 }),
  });

  return { ordersTopFive, isLoading, error };
}
